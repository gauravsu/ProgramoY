import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useState } from "react";

const Dummy = () => {
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    const getsigner = async () => {
      console.log("window ka ethereum", window.ethereum);
      try {
        console.log("here...");
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        const provider = new ethers.providers.JsonRpcProvider("https://devnet.galadriel.com");
        // const signer = provider.getSigner();
        const signer = new ethers.Wallet("PRIVATE_KEY", provider);
        console.log("Signer (galadriel)", signer);

        const url = "http://localhost:8000/dummy";
        console.log("url done");
        const data = {
          signer,
        };
        console.log("Data", data);
        fetch(url, {
          method: "POST", // HTTP method
          headers: {
            "Content-Type": "application/json", // Specify that the content is JSON
            // Add other headers if necessary
          },
          body: JSON.stringify(data), // Convert the data to a JSON string
        })
          .then((response) => {
            if (!response.ok) {
              console.log("HTTP Error!!!")
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
          })
          .then((result) => {
            console.log("Success:", result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (err) {
        console.log("error happened in getting signer", err);
      }

      // return new ethers.Contract(contractAddress, contractABI, signer)
    };

    getsigner();
  }, []);
};

export default Dummy;
