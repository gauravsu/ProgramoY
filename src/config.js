import { http, createConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

// const projectId = "c256f9892a3c4908bc0cd539619ff664";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
