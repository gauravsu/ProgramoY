//@ts-nocheck
import { LitNodeClient, encryptString } from "@lit-protocol/lit-node-client";
import { AuthCallbackParams } from "@lit-protocol/types";
import { LIT_RPC } from "@lit-protocol/constants";
import { LitAbility, LitAccessControlConditionResource, LitActionResource, createSiweMessageWithRecaps, generateAuthSig } from "@lit-protocol/auth-helpers";
import { ethers, Wallet } from 'ethers';

const url = `<our http endpoint for api-key :: i.e. HUGGING FACE-stable diffusion 2 urls>`;
const key = '<our HUGGING FACE api key>';

// Decrypt functionality
const genActionSource = (url: string) => {
    return (async () => {
        const apiKey = await Lit.Actions.decryptAndCombine({
            accessControlConditions,
            ciphertext,
            dataToEncryptHash,
            authSig: null,
            chain: 'ethereum',
        });

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: "<your_input_for_stable_diffusion_model>" // PROMPT
            })
        });
        let data = await resp.json();

        Lit.Actions.setResponse({ response: data });
    })();
}

const ONE_WEEK_FROM_NOW = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7
).toISOString();

const genProvider = () => {
    return new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE);
}

const genWallet = () => {
    // replace with our own PrivateKey 
    // This is the One Lit will generate for us.
    return new Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', genProvider());
}

const genAuthSig = async (
    wallet: Wallet, // for v6
    client: LitNodeClient,
    uri: string,
    resources: LitResourceAbilityRequest[]
) => {

    let blockHash = await client.getLatestBlockhash();
    const message = await createSiweMessageWithRecaps({
        walletAddress: wallet.address,
        nonce: blockHash,
        litNodeClient: client,
        resources,
        expiration: ONE_WEEK_FROM_NOW,
        uri
    })
    const authSig = await generateAuthSig({
        signer: wallet,
        toSign: message,
        address: wallet.address
    });

    return authSig;
}

const genSession = async (
    wallet: Wallet,
    client: LitNodeClient,
    resources: LitResourceAbilityRequest[]) => {
    let sessionSigs = await client.getSessionSigs({
        chain: "ethereum",
        resourceAbilityRequests: resources,
        authNeededCallback: async (params: AuthCallbackParams) => {
            console.log("resourceAbilityRequests:", params.resources);

            if (!params.expiration) {
                throw new Error("expiration is required");
            }

            if (!params.resources) {
                throw new Error("resourceAbilityRequests is required");
            }

            if (!params.uri) {
                throw new Error("uri is required");
            }

            // generate the authSig for the inner signature of the session
            // we need capabilities to assure that only one api key may be decrypted
            const authSig = genAuthSig(wallet, client, params.uri, params.resourceAbilityRequests ?? []);
            return authSig;
        }
    });

    return sessionSigs;
}

const main = async () => {
    let client = new LitNodeClient({
        litNetwork: LitNetwork.DatilDev,
        debug: true
    });

    const wallet = genWallet();
    const chain = 'ethereum';
    // lit action will allow anyone to decrypt this api key with a valid authSig
    const accessControlConditions = [
        {
            contractAddress: "", // Distributor Address
            standardContractType: "", // WHAT ??
            chain, // ethereum
            method: "eth_getBalance", // fn call
            parameters: [":currentActionId", "latest"],
            returnValueTest: {
                comparator: "==",
                value: "<your ipfs id>", // 
            },
        },
    ];

    await client.connect();
    /*
    Here we are encypting our key for secure use within an action
    this code should be run once and the ciphertext and dataToEncryptHash stored for later sending
    to the Lit Action in 'jsParams'
    */
    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
            accessControlConditions,
            dataToEncrypt: key,
        },
        client
    );

    console.log("cipher text:", ciphertext, "hash:", dataToEncryptHash);
    const accsResourceString =
        await LitAccessControlConditionResource.generateResourceString(accessControlConditions as any, dataToEncryptHash);
    const sessionForDecryption = await genSession(wallet, client, [
        {
            resource: new LitActionResource('*'),
            ability: LitAbility.LitActionExecution,
        },
        {
            resource: new LitAccessControlConditionResource(accsResourceString),
            ability: LitAbility.AccessControlConditionDecryption,

        }
    ]
    );
    console.log("action source code: ", genActionSource(url))
    /*
    Here we use the encrypted key by sending the
    ciphertext and dataTiEncryptHash to the action
    */
    const res = await client.executeJs({
        sessionSigs: sessionForDecryption,
        code: genActionSource(url),
        jsParams: {
            accessControlConditions,
            ciphertext,
            dataToEncryptHash
        }
    });

    console.log("result from action execution:", res);
    client.disconnect();
}

await main();