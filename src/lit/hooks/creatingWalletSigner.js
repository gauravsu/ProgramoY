import * as ethers from "ethers";

import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { api } from "@lit-protocol/wrapped-keys";
import { litNodeClient } from "../utils/lit"
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";


export const createWallet = async (
  pkpPublicKey,
) => {

  try {

    await litNodeClient.connect();
    console.log("✅ Connected to Lit network");
    const pkp = JSON.parse(localStorage.getItem('pkp')).publicKey;

    console.log("🔄 Getting PKP Session Sigs...");
    const pkpSessionSigs = await litNodeClient.getPkpSessionSigs({
        pkp,
      authMethods,
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.PKPSigning,
        },
      ],
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
    });
    console.log("✅ Got PKP Session Sigs",pkpSessionSigs);

    console.log("🔄 Generating wallet key...");

   
    return a;
  } catch (error) {
    console.error;
  } 
};