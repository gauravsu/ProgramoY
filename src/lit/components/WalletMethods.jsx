import { Button, ButtonGroup } from "@chakra-ui/react";
import { useConnect } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import {
  get_color_for_wallet,
  get_image_src_for_wallet,
} from "../../lib/utils";

import { SymbolIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { CardSpotlight } from "../../components/ui/card-spotlight";
import { Boxes } from "../../components/ui/background-boxes";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Terminal } from "lucide-react";


const WalletMethods = ({ authWithEthWallet, setView }) => {
  const isMounted = useIsMounted();
  const { connectors } = useConnect();


  if (!isMounted) return null;
  console.log("connectors from wallet dashboard is ",connectors);
  const filteredConnectors = connectors.filter(connector => connector.id === "metaMaskSDK");

  return (
    <>
      <div className="mx-auto h-screen relative w-screen overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <div className="z-20 flex flex-col my-3 mx-2 gap-2">
          <div className="h-[12vh] text-white py-3 mt-2">
            <Alert className="text-xl color-white bg-gray-500 text-black border-0">
              <Terminal className="h-10 w-10" />
              <AlertTitle>Connect your web3 wallet</AlertTitle>
              <AlertDescription>
                And sign a message to verify you&apos;re the owner of the
                address.
              </AlertDescription>
            </Alert>
          </div>
          <Command className="bg-black text-white color-white z-40 rounded-lg mt-4 border-0 mx-auto shadow-md w-[40vw]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="h-full overflow-y-scroll">
               {filteredConnectors.map((connector) => {
              const appearance = get_color_for_wallet + " text-white";
              console.log("connector from map is ",connector);
              const img_src = get_image_src_for_wallet(
              
                connector.name.toLowerCase(),
              );
              return (
                <CommandItem className="h-[10vh] flex justify-between py-3 text-white">
                  <SymbolIcon className="mr-2 h-4 w-4" />
                  <Button
                    variant="secondary"
                    disabled={connector.ready}
                    key={connector.id}
                    onClick={() => authWithEthWallet({ connector })}
                  >
                    {connector.name.toLowerCase() === "metamask" && (
                      <div className="btn__icon"></div>
                    )}
                    <span className="btn__label w-[300px]">
                      Continue with {connector.name}
                    </span>
                  </Button>
                  <img src={img_src} className="w-[40px]" />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
      </div>
      </div>
  </>
  );
};

export default WalletMethods;
