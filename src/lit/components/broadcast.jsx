import React, { useState } from "react";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";
import {
  createSiweMessageWithRecaps,
  generateAuthSig,
  LitAbility,
  LitActionResource,
  LitPKPResource,
} from "@lit-protocol/auth-helpers";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { disconnectWeb3 } from "@lit-protocol/auth-browser";
import * as ethers from "ethers";
import { litNodeClient } from '../utils/lit';
import { fetchCode } from '../hooks/fetch';

const Broadcast = () => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [litActionSignatures, setLitActionSignatures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBroadcast = async () => {
    try {
      setIsLoading(true);
      console.log("Clicked");
      await litNodeClient.connect();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const ethersSigner = provider.getSigner();
      console.log(ethersSigner);

      const chain = 'ethereum';
      const pkp = JSON.parse(localStorage.getItem('pkp'));
      console.log("pkp address is ", pkp.publicKey);


      const sessionSigs = await litNodeClient.getSessionSigs({
        chain: 'ethereum',
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        resourceAbilityRequests: [
          {
            resource: new LitActionResource("*"),
            ability: LitAbility.LitActionExecution,
          },
          {
            resource: new LitPKPResource("*"),
            ability: LitAbility.PKPSigning,
          },
        ],
        authNeededCallback: async ({ resourceAbilityRequests, expiration, uri }) => {
          const toSign = await createSiweMessageWithRecaps({
            uri: uri,
            expiration: expiration,
            resources: resourceAbilityRequests,
            walletAddress: await ethersSigner.getAddress(),
            nonce: await litNodeClient.getLatestBlockhash(),
            litNodeClient,
          });

          return await generateAuthSig({
            signer: ethersSigner,
            toSign,
          });
        },
      });
      console.log("Got Session Signatures! ", sessionSigs);

      // Create message to sign
      const message = new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode("Hello world")
        )
      );
      console.log("here")
      const pkpPubKey = pkp.publicKey;
      console.log(pkpPubKey);

      // Execute Lit Action
      const litActionSignaturesResult = await litNodeClient.executeJs({
        sessionSigs,
        code: fetchCode, // You need to define this `litActionCode`
        jsParams: {
          toSign: message,
          publicKey: pkpPubKey,
          sigName: "sig",
        },
      });
      console.log("litActionSignatures: ", litActionSignaturesResult);
      setLitActionSignatures(litActionSignaturesResult);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      disconnectWeb3();
    }
  };

  return (
    <div>
      <button onClick={handleBroadcast} disabled={isLoading}>
        {isLoading ? "Processing..." : "Broadcast"}
      </button>
      {connectedAccount && (
        <p>Connected Account: {connectedAccount}</p>
      )}
      {litActionSignatures && (
        <div>
          <h4>Lit Action Signatures:</h4>
          <pre>{JSON.stringify(litActionSignatures, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Broadcast;