import { useState } from 'react';

import AuthMethods from './AuthMethods';
import WalletMethods from './WalletMethods';


export default function LoginMethods({

  authWithEthWallet,

  signUp,
  error,
}) {
  const [view, setView] = useState('default');

  return (
    <div className="container">
      <div className="wrapper">
        {error && (
          <div className="alert alert--error">
            <p>{error.message}</p>
          </div>
        )}
        {view === 'default' && (
          <>
            <h1>Welcome back</h1>
            <p>Access your Lit wallet.</p>
           
          </>
        )}
       
        {view === 'wallet' && (
          <WalletMethods
            authWithEthWallet={authWithEthWallet}
            setView={setView}
          />
        )}
      
      </div>
    </div>
  );
}
