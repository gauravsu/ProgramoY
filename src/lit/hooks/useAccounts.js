import { useCallback, useState } from 'react';
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import { getPKPs, mintPKP } from '../utils/lit';
import { litNodeClient } from '../utils/lit'
import { LitActionResource} from '@lit-protocol/auth-helpers';
import {
  LitAbility,
} from '@lit-protocol/types';
import { toSafeSmartAccount } from "permissionless/accounts"
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { sepolia, baseSepolia } from "viem/chains"
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { createPublicClient,  http } from "viem"
import {  createBundlerClient, entryPoint07Address } from "viem/account-abstraction"


export default function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  
  const fetchAccounts = useCallback(
    async (authMethod) => {
      setLoading(true);
      setError(undefined);
      try {
        
        const myPKPs = await getPKPs(authMethod);
        setAccounts(myPKPs);
        if (myPKPs.length === 1) {
          setCurrentAccount(myPKPs[0]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createAccount = useCallback(
    async (authMethod)=> {
      setLoading(true);
      setError(undefined);
      try {
        const newPKP = await mintPKP(authMethod);

        setAccounts(prev => [...prev, newPKP]);
        setCurrentAccount(newPKP);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createWallet = useCallback(
    async(authMethod,sessionSign)=>{
      try{

      await litNodeClient.connect();
      const pkp = await getPKPs(authMethod);
      console.log("pkp from last is ",pkp[pkp.length - 1].publicKey);
      const resourceAbilities = [
        {
            resource: new LitActionResource("*"),
            ability: LitAbility.PKPSigning,
        },
    ];
    const sessionKeyPair = litNodeClient.getSessionKey();

    const authNeededCallback = async (params) => {
      const response = await litNodeClient.signSessionKey({
          sessionKey: sessionKeyPair,
          statement: params.statement,
          authMethods: authMethod,
          pkpPublicKey: pkp[pkp.length - 1].publicKey,
          expiration: params.expiration,
          resources: params.resources,
          chainId: 1,
      });
      return response.authSig;
  };

      const pkpWallet = new PKPEthersWallet({
        pkpPubKey:pkp[pkp.length - 1].publicKey,
        litNodeClient:litNodeClient,
        rpc:  'https://rpc2.sepolia.org/',
        authContext: {
          client: litNodeClient,
          getSessionSigsProps: {
            chain: 'ethereum',
            expiration: new Date(Date.now() + 60_000 * 60).toISOString(),
            resourceAbilityRequests: resourceAbilities,
          
          },
          authNeededCallback
    }}
);
     console.log("pkpWallet is ",pkpWallet);
     const a = await pkpWallet.init();
     console.log("PKP wallet set",JSON.parse(a));

     const txHash = await pkpWallet.sendTransaction({
      to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      value: 0n,
      data: "0x1234",
    })
     
    console.log(`User operation included: https://sepolia.etherscan.io/tx/${txHash}`)
   

  }
  catch (err){
   console.log(err);
  }

    },
    []
  )

  return {
    fetchAccounts,
    createWallet,
    createAccount,
    setCurrentAccount,
    accounts,
    currentAccount,
    loading,
    error,
  };
}
