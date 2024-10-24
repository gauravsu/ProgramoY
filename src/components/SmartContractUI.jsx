// import React, { useState, useEffect } from "react";
// import { Button } from "./ui/Button.jsx";
// import WalletConnector from "./ui/WalletConnector.jsx"; // Import the WalletConnector
// import {
//   initWorker,
//   removeWorker,
//   updateRewards,
//   updateVotingMapping,
//   withdrawRewards,
//   getWorker,
//   getRewards,
//   getVotedOption,
//   getAllWorkersRewards,
// } from "../lib/worker.js"; // Adjust the path if necessary

// const SmartContractUI = () => {
//   const [output, setOutput] = useState("");
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const checkConnection = () => {
//       const connected = sessionStorage.getItem("IsConnected") === "true";
//       setIsConnected(connected);
//     };
//     checkConnection();

//     // Listen for session storage changes
//     window.addEventListener("storage", checkConnection);

//     return () => {
//       window.removeEventListener("storage", checkConnection);
//     };
//   }, []);

//   const handleInitWorker = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     try {
//       await initWorker();
//       setOutput("Worker Initialized Successfully");
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   const handleRemoveWorker = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     const workerAddress = prompt("Enter worker address:");
//     if (workerAddress) {
//       try {
//         await removeWorker(workerAddress);
//         setOutput("Worker Removed Successfully");
//       } catch (error) {
//         setOutput(`Error: ${error.message}`);
//       }
//     }
//   };

//   const handleUpdateRewards = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     const workerAddresses = prompt(
//       "Enter worker addresses (comma-separated):",
//     ).split(",");
//     const prizepool = prompt("Enter prize pool:");
//     const postId = prompt("Enter post ID:");
//     try {
//       await updateRewards(workerAddresses, prizepool, postId);
//       setOutput("Rewards Updated Successfully");
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   const handleUpdateVotingMapping = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     const workers = prompt("Enter worker addresses (comma-separated):").split(
//       ",",
//     );
//     const postId = prompt("Enter post IDs (comma-separated):").split(",");
//     const option_id = prompt("Enter option IDs (comma-separated):").split(",");
//     try {
//       await updateVotingMapping(workers, postId, option_id);
//       setOutput("Voting Mapping Updated Successfully");
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   const handleWithdrawRewards = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     try {
//       await withdrawRewards();
//       setOutput("Rewards Withdrawn Successfully");
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   const handleGetWorker = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     const workerAddress = prompt("Enter worker address:");
//     if (workerAddress) {
//       try {
//         const worker = await getWorker(workerAddress);
//         setOutput(`Worker: ${JSON.stringify(worker)}`);
//       } catch (error) {
//         setOutput(`Error: ${error.message}`);
//       }
//     }
//   };

//   const handleGetRewards = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     const workerAddress = prompt("Enter worker address:");
//     if (workerAddress) {
//       try {
//         const rewards = await getRewards(workerAddress);
//         setOutput(`Rewards: ${JSON.stringify(rewards)}`);
//       } catch (error) {
//         setOutput(`Error: ${error.message}`);
//       }
//     }
//   };

//   const handleGetVotedOption = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     const workerAddress = prompt("Enter worker address:");
//     const post_id = prompt("Enter post ID:");
//     if (workerAddress && post_id) {
//       try {
//         const votedOption = await getVotedOption(workerAddress, post_id);
//         setOutput(`Voted Option: ${JSON.stringify(votedOption)}`);
//       } catch (error) {
//         setOutput(`Error: ${error.message}`);
//       }
//     }
//   };

//   const handleGetAllWorkersRewards = async () => {
//     if (!isConnected) {
//       setOutput("Please connect your wallet first.");
//       return;
//     }
//     const workerAddresses = prompt(
//       "Enter worker addresses (comma-separated):",
//     ).split(",");
//     try {
//       const rewards = await getAllWorkersRewards(workerAddresses);
//       setOutput(`All Workers' Rewards: ${JSON.stringify(rewards)}`);
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Smart Contract Interaction</h2>
//       <WalletConnector />
//       {isConnected ? (
//         <>
//           <Button onClick={handleInitWorker} label="Initialize Worker" />
//           <Button onClick={handleRemoveWorker} label="Remove Worker" />
//           <Button onClick={handleUpdateRewards} label="Update Rewards" />
//           <Button
//             onClick={handleUpdateVotingMapping}
//             label="Update Voting Mapping"
//           />
//           <Button onClick={handleWithdrawRewards} label="Withdraw Rewards" />
//           <Button onClick={handleGetWorker} label="Get Worker" />
//           <Button onClick={handleGetRewards} label="Get Rewards" />
//           <Button onClick={handleGetVotedOption} label="Get Voted Option" />
//           <Button
//             onClick={handleGetAllWorkersRewards}
//             label="Get All Workers' Rewards"
//           />
//         </>
//       ) : (
//         <p>Please connect your wallet to interact with the smart contract.</p>
//       )}
//       <textarea
//         readOnly
//         value={output}
//         style={{
//           width: "100%",
//           height: "150px",
//           marginTop: "20px",
//           padding: "10px",
//           fontSize: "16px",
//         }}
//       />
//     </div>
//   );
// };

// export default SmartContractUI;
