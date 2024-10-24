import { useState } from "react";
import WalletMethods from "./WalletMethods";

export default function SignUpMethods({ authWithEthWallet, error }) {
  const [view, setView] = useState("wallet");

  return (
    <div>
      <div>
        {error && (
          <div className="alert alert--error">
            <p>{error.message}</p>
          </div>
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
