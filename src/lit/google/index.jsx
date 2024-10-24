import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { litNodeClient, SELECTED_LIT_NETWORK } from "../utils/lit";
import { LitAuthClient } from "@lit-protocol/lit-auth-client";
import {
  LitAbility,
  LitAccessControlConditionResource,
  createSiweMessage,
  generateAuthSig,
  LitActionResource,
} from "@lit-protocol/auth-helpers";
import { ProviderType } from "@lit-protocol/constants";
import * as ethers from "ethers";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { Utils } from "alchemy-sdk";
import { useEffect } from "react";

const RELAY_API_URL = "6ts099ns-xy2h-kk7b-s2ve-ih5tf1wddk80_septo";

const Google = () => {
  const [provider, setProvider] = useState(null);
  const [ethersSigner, setEthersSigner] = useState(null);

  useEffect(() => {
    function init() {
      console.log("inside init....");
      const a = litNodeClient.connect();
      console.log({ a });
      console.log({ ethers });
      if (provider) return;
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      console.log({ provider });
      provider.send("eth_requestAccounts", []);
      setEthersSigner(provider.getSigner());
    }

    init();
  }, []);

  const [status, setStatus] = useState("Connect your google account..!");
  const [googleCredentialResponse, setGoogleCredentialResponse] =
    useState(null);
  const [credentialResponse, setCredentialResponse] = useState(null);
  const [pkpEthAddress, setPkpEthAddress] = useState(null);
  const [pkpPublicKey, setPkpPublicKey] = useState(null);
  const [pkpMinted, setPkpMinted] = useState(false);

  const mintPkpWithRelayer = async () => {
    setStatus("Minting PKP with relayer...");

    const mintRes = await fetch(`${RELAY_API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: credentialResponse.credential,
      }),
    });

    if (mintRes.status < 200 || mintRes.status >= 400) {
      setStatus("Uh oh, something's not quite right.");
      return null;
    } else {
      const resBody = await mintRes.json();
      setStatus("Successfully initiated minting PKP with relayer.");
      return resBody.requestId;
    }
  };

  const pollRequestUntilTerminalState = async (requestId) => {
    if (!requestId) {
      return;
    }

    const maxPollCount = 20;
    for (let i = 0; i < maxPollCount; i++) {
      setStatus(`Waiting for auth completion (poll #${i + 1})`);
      const getAuthStatusRes = await fetch(
        `${RELAY_API_URL}/auth/status/${requestId}`,
      );

      if (getAuthStatusRes.status < 200 || getAuthStatusRes.status >= 400) {
        setStatus("Uh oh, something's not quite right.");
        return;
      }

      const resBody = await getAuthStatusRes.json();

      if (resBody.error) {
        // exit loop since error
        return;
      } else if (resBody.status === "Succeeded") {
        // exit loop since success
        setPkpEthAddress(resBody.pkpEthAddress);
        setPkpPublicKey(resBody.pkpPublicKey);
        return;
      }

      // otherwise, sleep then continue polling
      await new Promise((r) => setTimeout(r, 15000));
    }

    // at this point, polling ended and still no success, set failure status
    setStatus(`Hmm this is taking longer than expected...`);
  };

  const sessionCallback = async ({ uri }) => {
    const sessionSig = await litNodeClient.signSessionKey({
      sessionKey: uri,
      authMethods: [
        {
          authMethodType: 6,
          accessToken: googleCredentialResponse.credential,
        },
      ],
      pkpPublicKey,
      expiration,
      resources,
      chain,
    });
  };

  const step2 = async () => {
    const sessionSigs = await litNodeClient.getSessionSigs({
      chain: "ethereum",
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.LitActionExecution,
        },
      ],
      authNeededCallback: async ({
        resourceAbilityRequests,
        expiration,
        uri,
      }) => {
        const sessionSig = await litNodeClient.signSessionKey({
          sessionKey: uri,
          authMethods: [
            {
              authMethodType: 6,
              accessToken: googleCredentialResponse.credential,
            },
          ],
          pkpPublicKey,
          expiration,
          resourceAbilityRequests,
          chain: "ethereum",
        });
        return sessionSig;
      },
    });

    console.log("sessionSigs before saving encryption key: ", sessionSigs);

    var unifiedAccessControlConditions = [
      {
        conditionType: "evmBasic",
        contractAddress: "",
        standardContractType: "",
        chain: "mumbai",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: pkpEthAddress,
        },
      },
    ];

    // key parameter - encrypt symmetric key then hash it
    const encryptedSymmetricKey = LitJsSdk.encryptWithBlsPubkey({
      pubkey: litNodeClient.networkPubKey,
      data: pkpPublicKey,
    });

    const hashedEncryptedSymmetricKeyStr = await LitJsSdk.hashEncryptionKey({
      encryptedSymmetricKey,
    });

    const hashedAccessControlConditions =
      await LitJsSdk.hashUnifiedAccessControlConditions(
        unifiedAccessControlConditions,
      );

    // securityHash parameter - encrypt symmetric key, concat with creator address
    const pkpEthAddressBytes = Utils.arrayify(pkpEthAddress);
    const securityHashPreimage = new Uint8Array([
      ...encryptedSymmetricKey,
      ...pkpEthAddressBytes,
    ]);

    const securityHashStr = await LitJsSdk.hashEncryptionKey({
      encryptedSymmetricKey: securityHashPreimage,
    });

    const storeRes = await fetch(`${RELAY_API_URL}/store-condition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: hashedEncryptedSymmetricKeyStr,
        value: hashedAccessControlConditions,
        securityHash: securityHashStr,
        chainId: "1",
        permanent: false,
        capabilityProtocolPrefix: "litEncryptionCondition",
        // just choose any one session signature that is generated.
        sessionSig: sessionSigs["https://serrano.litgateway.com:7370"],
      }),
    });

    if (storeRes.status < 200 || storeRes.status >= 400) {
      console.warn("Something wrong with the API call", await storeRes.json());
      setStatus("Uh oh, something's not quite right");
    } else {
      setStatus("Successfully stored encryption condition with relayer!");
    }
  };

  const handleLoggedInToGoogle = async (credentialResponse) => {
    setStatus("Logged in to Google");
    setGoogleCredentialResponse(credentialResponse);
    const requestId = await mintPkpWithRelayer(credentialResponse);
    await pollRequestUntilTerminalState(requestId);
  };

  const handleGoogleLogin = async () => {
    // Set up LitAuthClient
    litNodeClient.connect();
    const litclient = new LitAuthClient({
      litRelayConfig: {
        // Request a Lit Relay Server API key here: https://forms.gle/RNZYtGYTY9BcD9MEA
        relayApiKey: RELAY_API_URL,
      },
      litNodeClient,
    });
    console.log({ litclient });

    // Initialize Google provider
    litclient.initProvider(ProviderType.Google, {
      // The URL of your web app where users will be redirected after authentication
      redirectUri: "/",
    });

    // Begin login flow with Google
    async function authWithGoogle() {
      const provider = litclient.getProvider(ProviderType.Google);
      await provider.signIn();
    }

    await authWithGoogle();
  };

  return (
    <>
      <button onClick={handleGoogleLogin}>Login to google</button>
    </>
  );
};

export default Google;

/*
<GoogleLogin
  disabled={false}
  onSuccess={handleLoggedInToGoogle}
  onError={() => {
    console.log("Login Failed");
  }}
  useOneTap
/>
*/
