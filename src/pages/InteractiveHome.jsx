import { Button as ButtonShad } from "../components/ui/Button";
import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { useNavigate } from "react-router-dom";
import { CardSpotlight } from "../components/ui/card-spotlight";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormLabel,
  FormControl,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  setIsLitAuthenticated,
  setType,
  setAddress,
  setPublicKey,
} from "../slices/userSlice";
import { useState } from "react";
import { initDistributor } from "../lib/distributorFunctions";
import { initWorker } from "../lib/workerFunctions";

const InteractiveHome = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [name, setName] = useState("Somyajeet");
  const [personality, setPersonality] = useState("Student");
  const [frequency, setFrequency] = useState(100);
  const [budget, setBudget] = useState(0);
  const [jugad, setJugad] = useState(1);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const user = useSelector((state) => state.user);
  console.log({user});

  // if(!user.is_lit_authenticated){
  //   navigate("/lit");
  // }

  console.log({ user });
  // const pkp = ;
  const pkp = JSON.parse(localStorage.getItem('pkp'));
  const ethAddress = pkp?.ethAddress;




  useEffect(() => {
    async function init() {
      if (!pkp) return;
      console.log("pkp from index", pkp);
      await dispatch(setIsLitAuthenticated(true));
      console.log(user);
      await dispatch(setPublicKey(pkp.publicKey));
      await dispatch(setAddress(pkp.ethAddress));
      console.log("inside session", user);
    }
    init();
  }, []);
  useEffect(() => {
    console.log("before navigating", user);
    console.log(user.is_lit_authenticated);
    const auth = user.is_lit_authenticated;
    console.log("auth: ", auth, typeof (auth));
    if (auth) {
      setJugad(true);
    }
  }, [user])

  // useEffect(()=>{

  // },[auth])

  const handleDistributor = async () => {
    //TODO: open a pop up-> take his details -> create a distributor first and then route
    dispatch(setType("distributor"));
    const contract_response = await initDistributor(true, budget, frequency);
    console.log("inited distributor", contract_response);
    const backend_init_distributor_endpoint = "http://192.168.45.90:8000/distributor/register";
    const data = {
      name: name,
      address: user.address,
      budget: budget,
      frequency: frequency,
      description: personality
    }
    const backend_response = await fetch(backend_init_distributor_endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(backend_response);
    //todo: call the contract with name, address,etc...
    // const = 
    navigate("/distributor");
  };

  const handleWorker = async () => {
    //TODO: create a worker first
    dispatch(setType("worker"));
    const contract_response = await initWorker();
    console.log("inited distributor", contract_response);

    const backend_init_worker_endpoint = "http://192.168.45.90:8000/worker/register";
    const data = {
      name: name,
      address: user.address,
    }
    const backend_response = await fetch(backend_init_worker_endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(backend_response);

    //todo: call the contract with name, address,etc..
    //navigate("/worker");
  };

  const handleSave = () => {
    console.log("handlesave")
    switch (user.type) {
      case "distributor":
        handleDistributor();
        break;
      case "worker":
        handleWorker();
        break;
      default:
        break;
    }
    onClose();
  }

  return (
    <>
      {jugad ? <div>
        <div className="fixed z-30 top-2 right-2 bg-black mr-4 mt-3">
          <div
            className="inline-flex h-[52px] text-xl w-[690px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white"
          >
            <p>Wallet Address:  {`${ethAddress}`}</p>
            </div>
         
        </div>
        <div className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <div className="z-20 flex my-3 mx-2 gap-2">
            <CardSpotlight className="flex flex-col justify-center items-center gap-3">
              <h1 className="text-white">What do you want to register as? </h1>
              <div className="flex gap-3">
                <ButtonShad
                onClick={()=>{dispatch(setType("distributor")); onOpen()}}
                  className="h-[50px] w-[100px] bg-violet-700 z-50 cursor-pointer"
                >
                  Programer
                </ButtonShad>
                <ButtonShad
                  onClick={()=>{dispatch(setType("worker")); onOpen()}}
                  className="h-[50px] w-[100px] bg-green-400 z-50 cursor-pointer"
                >
                  Learner
                </ButtonShad>
              </div>
            </CardSpotlight>
          </div>
        </div>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  value={name}
                  placeholder="Give yourself a cool name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              {user.type === "distributor" && (
                <FormControl mt={4}>
                  <FormLabel>Personality</FormLabel>
                  <Input
                    placeholder="Describe your character"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                  />
                </FormControl>
              )}
              {user.type === "distributor" && (
                <FormControl mt={4}>
                  <FormLabel>Frequency</FormLabel>
                  <Input
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="In how much intervals do you want to post?"
                  />
                </FormControl>
              )}
              {user.type === "distributor" && (
                <FormControl mt={4}>
                  <FormLabel>Budget</FormLabel>
                  <Input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="what is your budget ?"
                  />
                </FormControl>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal></div> : <div className="bg-black text-white text-2xl flex justify-center items-center w-screen h-screen">Preparing your home...</div>
      }
    </>
  );
};
export default InteractiveHome;
