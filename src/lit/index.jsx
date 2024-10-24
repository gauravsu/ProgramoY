import React from "react";
import useAuthenticate from "./hooks/useAuthenticate";
import LoginMethods from "./loginMethods";

const LitPage = () => {
  const redirectUri = "localhost:5173" + "/login";

  const { authMethod, authWithEthWallet } = useAuthenticate(redirectUri);

  return <LoginMethods authWithEthWallet={authWithEthWallet} />;
};

export default LitPage;
