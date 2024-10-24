import { useConnect } from "wagmi";

const WalletMethods = ({ authWithEthWallet }) => {
  const { connectors } = useConnect();
  console.log("connectors", connectors);

  return (
    <>
      <h1>Connect your web3 wallet</h1>
      <p>
        Connect your wallet then sign a message to verify you&apos;re the owner
        of the address.
      </p>
      <div className="buttons-container">
        {connectors.map((connector) => (
          <button
            type="button"
            className="btn btn--outline bg-red-500 z-1000"
            disabled={connector.ready}
            key={connector.id}
            onClick={async () => {
              console.log("i was clicked...");
              await authWithEthWallet({ connector });
            }}
          >
            {connector.name.toLowerCase() === "metamask" && (
              <div className="btn__icon bg-purple-500">
                <img src="/logo512.png" alt="MetaMask logo" fill={true}></img>
              </div>
            )}
            {connector.name.toLowerCase() === "coinbase wallet" && (
              <div className="btn__icon">
                <img src="/logo192.png" alt="Coinbase logo" fill={true}></img>
              </div>
            )}
            <span className="btn__label">Continue with {connector.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default WalletMethods;
