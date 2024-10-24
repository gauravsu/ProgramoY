import { useEffect } from "react";
import useAuthenticate from "../hooks/useAuthenticate";
import useSession from "../hooks/useSession";
import useAccounts from "../hooks/useAccounts";
import { ORIGIN } from "../utils/lit";
import SignUpMethods from "../components/SignUpMethods";
import Dashboard from "../components/Dashboard";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsLitAuthenticated,
  setType,
  setAddress,
  setPublicKey,
  resetUser,
} from "../../slices/userSlice";
import InteractiveHome from "../../pages/InteractiveHome";

export default function SignUpView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //TODO: i dont know when we should do this..
  const handleTakeHome = () => {
    dispatch(setIsLitAuthenticated(true));
    navigate("/home");
  };
  const redirectUri = ORIGIN;

  const {
    authMethod,
    authWithEthWallet,
    loading: authLoading,
    error: authError,
  } = useAuthenticate();

  const {
    createAccount,
    currentAccount,
    loading: accountsLoading,
    error: accountsError,
  } = useAccounts();

  const {
    initSession,
    sessionSigs,
    loading: sessionLoading,
    error: sessionError,
  } = useSession();

  const error = authError || accountsError || sessionError;

  if (error) {
    if (authError) {
      console.error("Auth error:", authError);
    }

  if (accountsError) {
      console.error('Accounts error:', accountsError);
    }

  if (sessionError) {
      console.error('Session error:', sessionError);
    }
  }

  useEffect(() => {
    if (authMethod != undefined) {
      console.log("creation of account called");
      createAccount(authMethod);

    }
  }, [createAccount, authMethod]);

  useEffect(() => {
    if (authMethod && currentAccount) {
      console.log("session key is initialised")
      initSession(authMethod, currentAccount);
    }
  }, [authMethod, currentAccount, initSession]);

  if (authLoading) {
    return (
      <div className="bg-black w-screen h-screen flex items-center justify-center text-white">
        <Loading copy={"Authenticating your credentials..."} error={error} />
      </div>
    );
  }

  if (accountsLoading) {
    return (
      <div className="bg-black w-screen h-screen flex items-center justify-center text-white">
        <Loading copy={"Creating your account..."} error={error} />
      </div>
    );
  }

  if (sessionLoading) {
    return (
      <div className="bg-black w-screen h-screen flex items-center justify-center text-white">
        <Loading copy={"Securing your session ..."} error={error} />
      </div>
    );
  }

  if (currentAccount && sessionSigs) {
        const pkp = JSON.parse(localStorage.getItem('pkp'));
        console.log("pkp from index",pkp);
        dispatch(setIsLitAuthenticated(true));
        dispatch(setPublicKey(pkp.publicKey));
        dispatch(setAddress(pkp.ethAddress));
        console.log("inside session",user);
    return (
      // <Dashboard currentAccount={currentAccount} sessionSigs={sessionSigs} />
      <InteractiveHome/>
    );
  } else {
    return (
      <SignUpMethods authWithEthWallet={authWithEthWallet} error={error} />
    );
  }
}
