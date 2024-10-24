import { useState } from "react";

import WalletMethods from "./WalletMethods.jsx";

export default function LoginMethods({ authWithEthWallet }) {
  const [view, setView] = useState("wallet");

  return (
    <div className="container z-1000">
      <div className="wrapper">
        {view === "default" && (
          <>
            <h1>Welcome back</h1>
            <p>Access your Lit wallet.</p>

            <div className="buttons-container">
              <button type="button" className="btn btn--link">
                Need an account? Sign up
              </button>
            </div>
          </>
        )}

        {view === "wallet" && (
          <WalletMethods
            authWithEthWallet={authWithEthWallet}
            setView={setView}
          />
        )}
      </div>
    </div>
  );
}
