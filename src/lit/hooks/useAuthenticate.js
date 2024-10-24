import { useCallback, useState } from 'react';
import { authenticateWithEthWallet, } from '../utils/lit';
import { useConnect } from 'wagmi';
import { providers } from 'ethers'

export default function useAuthenticate() {
  const [authMethod, setAuthMethod] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { connectAsync } = useConnect({
    onError: (err) => {
      setError(err);
    },
  });
  console.log("connectAsync ",connectAsync);

  const authWithEthWallet = useCallback(
    async (connector) => {
      setLoading(true);
      setError(undefined);
      setAuthMethod(undefined);
      console.log("inside use autheticate authwithethwallet");

      try {
        const provider = new providers.Web3Provider(window.ethereum);
        const [address] = await provider.listAccounts();
        const signer = provider.getSigner(address);

        const { accounts, connector: metaMask } = await connectAsync(
          connector
        );

        const signMessage = async (message) => {
          const sig = await signer.signMessage(message);
          return sig;
        };

        const result = await authenticateWithEthWallet(
          accounts[0],
          signMessage
        );
        console.log("auth method is",authMethod);

        setAuthMethod(result);
        console.log("result is", result);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [connectAsync]
  );

  return {
    authWithEthWallet,
    authMethod,
    loading,
    error,
  };
}