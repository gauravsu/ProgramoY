import * as ethers from "ethers";

import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { api } from "@lit-protocol/wrapped-keys";
import { litNodeClient } from "../utils/lit"

const { generatePrivateKey } = api;


export const generateWrappedKey = async (
  pkpPublicKey,
  authMethods,
) => {

  try {
    await litNodeClient.connect();
    console.log("✅ Connected to Lit network");

    console.log("🔄 Getting PKP Session Sigs...");
    const pkpSessionSigs = await litNodeClient.getPkpSessionSigs({
      pkpPublicKey,
      authMethods,
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.LitActionExecution,
        },
      ],
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
    });
    console.log("✅ Got PKP Session Sigs",);

    console.log("🔄 Generating wrapped key...");
    const response = await generatePrivateKey({
      pkpSessionSigs,
      network: "evm",
      memo:"this is function",
      litNodeClient,
    });
    console.log(
      `✅ Generated wrapped key with id: ${response.id} and public key: ${response.generatedPublicKey}`
    );
    return response;
  } catch (error) {
    console.error;
  } 
};