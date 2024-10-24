import { IRelayPKP, SessionSigs } from '@lit-protocol/types';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers';
import { useDisconnect } from 'wagmi';
import { litNodeClient } from '../utils/lit';

import { getProviderByAuth } from '../utils/lit'
import { generateWrappedKey } from "../hooks/generatingWrappedKey";
import { initializeWallet } from "../../lib/walletManager";
import useAuthenticate from "../../lit/hooks/useAuthenticate";
import { addPost, updateBudget, getParticularPost, getAllOptions, getAllPosts, withdrawETH, getBudget, initDistributor, updateDescription} from "../../lib/distributorFunctions"
import {initWorker, withdrawRewards, getVotedOption, getRewards  } from "../../lib/workerFunctions";




export default function Dashboard({
  currentAccount,
  sessionSigs,
}) {
  const [message, setMessage] = useState('Free the web!');
  const [signature, setSignature] = useState();
  const [verified, setVerified] = useState(false);
  const { authMethod, getPKPs } = useAuthenticate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  console.log("authMethod is",authMethod);

 


  const { disconnectAsync } = useDisconnect();

  const handleSetScope = async () => {
    const authMethod = JSON.parse(localStorage.getItem("authMethod"));
    // const pkpWallet =await initializeWallet(authMethod);   //working

    // const initDist = await initDistributor();   // working
    // console.log("init dist hash",initDist);

    // const addingPostt = await addPost();       //working
    // console.log("adding post hash",addingPostt);

    // const updateBudgett = await updateBudget();    //working
    // console.log("updating budget hash",updateBudgett);
    
    // const updateDescriptionn = await updateDescription();  //working
    // console.log("updating discription",updateDescriptionn);

    // const getbudget = await getBudget();     // working
    // console.log("getting budget",getbudget);

    // const getposts = await getAllPosts();     //working
    // console.log("getting all posts",getposts);
     
    // const getalloptions = await getAllOptions();   //working
    // console.log("all options are ",getalloptions)

    // const getparticularpost = await getParticularPost();   //working
    // console.log("particular post is ",getparticularpost); 
    
    // const initworkerr = await initWorker();          //working
    // console.log("initialising worker ",initworkerr); 

    // const withdrawRewardss = await withdrawRewards();    //working
    // console.log("withdraw reward ",withdrawRewardss); 

    // const getWorkerr = await getRewards();      //working
    // console.log("get the worker ",getWorkerr);    

    // const getVotedOptionn = await getVotedOption();  //working
    // console.log("voted option is ",getVotedOptionn); 

    
  };
  useEffect(() => {
    handleSetScope();
  }, []);

  /**
   * Sign a message with current PKP
   */
  async function signMessageWithPKP() {
    setLoading(true);
  

    try {
      await litNodeClient.connect();

      const pkpWallet = new PKPEthersWallet({
        controllerSessionSigs: sessionSigs,
        pkpPubKey: currentAccount.publicKey,
        litNodeClient: litNodeClient,
      });

      await pkpWallet.init();

      const signature = await pkpWallet.signMessage(message);
      setSignature(signature);

      // Get the address associated with the signature created by signing the message
      const recoveredAddr = ethers.utils.verifyMessage(message, signature);
      setRecoveredAddress(recoveredAddr);

      // Check if the address associated with the signature is the same as the current PKP
      const verified =
        currentAccount.ethAddress.toLowerCase() === recoveredAddr.toLowerCase();
      setVerified(verified);
    } catch (err) {
      console.error(err);
      setError(err);
    }

    setLoading(false);
  }

  async function handleLogout() {
    try {
      await disconnectAsync();
    } catch (err) { }
    localStorage.removeItem('lit-wallet-sig');
    router.reload();
  }

  return (
    <div className="container">
      <div className="logout-container">
        <button className="btn btn--link" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1>Ready for the open web</h1>
      <div className="details-card">
        <p>My address: {currentAccount.ethAddress.toLowerCase()}</p>
      </div>
      <div className="divider"></div>
      <div className="message-card">
        <p>Test out your wallet by signing this message:</p>
        <p className="message-card__prompt">{message}</p>
        <button
          onClick={signMessageWithPKP}
          disabled={loading}
          className={`btn ${signature ? (verified ? 'btn--success' : 'btn--error') : ''
            } ${loading && 'btn--loading'}`}
        >
          {signature ? (
            verified ? (
              <span>Verified ✓</span>
            ) : (
              <span>Failed x</span>
            )
          ) : (
            <span>Sign message</span>
          )}
        </button>
      </div>
    </div>
  );
}
