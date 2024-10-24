import React, { useEffect, useState } from 'react';
import { encryptString } from "@lit-protocol/lit-node-client";
import { createSiweMessageWithRecaps, generateAuthSig, LitActionResource, LitAbility, LitAccessControlConditionResource } from "@lit-protocol/auth-helpers";
import { litNodeClient } from '../utils/lit';
import * as ethers from "ethers";

const Encrypt = () => {
    const [encryptionResult, setEncryptionResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const performEncryption = async () => {
            try {
                await litNodeClient.connect();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const ethersSigner = provider.getSigner();
                console.log(ethersSigner);

                const chain = 'ethereum';
                const pkp = JSON.parse(localStorage.getItem('lit-wallet-sig'));
                console.log("pkp address is ", pkp.address);




                const accessControlConditions = [
                    {
                        contractAddress: '',
                        standardContractType: '',
                        chain,
                        method: '',
                        parameters: [
                            ':userAddress',
                        ],
                        returnValueTest: {
                            comparator: '=',
                            value: pkp.address
                        }
                    }
                ];

                const sessionSigs = await litNodeClient.getSessionSigs({
                    chain: 'ethereum',
                    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
                    resourceAbilityRequests: [
                        {
                            resource: new LitActionResource('*'),
                            ability: LitAbility.LitActionExecution,
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

                console.log("session key is ", sessionSigs);


                const message = 'Hello world';

                const { ciphertext, dataToEncryptHash } = await encryptString(
                    {
                        accessControlConditions,
                        sessionSigs: sessionSigs,
                        chain,
                        dataToEncrypt: message
                    },
                    litNodeClient
                );

                setEncryptionResult({ ciphertext, dataToEncryptHash });
                const code = `(async () => {
                    const resp = await Lit.Actions.decryptAndCombine({
                      accessControlConditions,
                      ciphertext,
                      dataToEncryptHash,
                      authSig: null,
                      chain: 'ethereum',
                    });
                  
                    Lit.Actions.setResponse({ response: resp });
                  })();`


                console.log("down");

                const accsResourceString =
                    await LitAccessControlConditionResource.generateResourceString(accessControlConditions, dataToEncryptHash);

                const sessionSigsDecrypt = await litNodeClient.getSessionSigs({
                    chain: 'ethereum',
                    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
                    resourceAbilityRequests: [
                        {
                            resource: new LitActionResource('*'),
                            ability: LitAbility.LitActionExecution,
                        },
                        {
                            resource: new LitAccessControlConditionResource(accsResourceString),
                            ability: LitAbility.AccessControlConditionDecryption,

                        }
                    ],



                });

                console.log("decrypting key is ", sessionSigsDecrypt);
                const res = await litNodeClient.executeJs({
                    code,
                    sessionSigs: sessionSigs,
                    jsParams: {
                        accessControlConditions,
                        ciphertext,
                        dataToEncryptHash
                    }
                });

                console.log("decrypted content sent from lit action:", res);

            } catch (err) {
                console.error("Encryption failed:", err);
                setError(err.message);
            }
        };

        performEncryption();
    }, []); // Empty dependency array to run once when the component mounts

    return (
        <div>
            {encryptionResult ? (
                <div>
                    <h3>Encryption Successful</h3>
                    <p>Cipher text: {encryptionResult.ciphertext}</p>
                    <p>Data to Encrypt Hash: {encryptionResult.dataToEncryptHash}</p>
                </div>
            ) : error ? (
                <h3>Error: {error}</h3>
            ) : (
                <h3>Encrypting...</h3>
            )}
        </div>
    );
};

export default Encrypt;