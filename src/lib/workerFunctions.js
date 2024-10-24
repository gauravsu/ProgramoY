import { initializeWallet, getWallet } from './walletManager';
import { ethers } from 'ethers';
import { contractABI,contractAddress } from './contract';


export async function initWorker() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        console.log(address);

        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        console.log("contract is ",contract);

        const functionData = contract.interface.encodeFunctionData("initWorker",[]);
        console.log("function data ",functionData)

        try {
            await contract.callStatic.initWorker();
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error initialising worker:', error);
        }
        const estimatedGas = await contract.estimateGas.initWorker();
      
          console.log('Estimated Gas:', estimatedGas.toString());
          const gasPrice = await wallet.provider.getGasPrice();
          console.log("Gas Price:", gasPrice.toString());


        const tx = {
            from:address,
            to: contractAddress,
            data: functionData,
            gasLimit: estimatedGas.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)),
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        await txResponse.wait();
        console.log('Transaction Confirmed');
        return txResponse.hash;
    } catch (error) {
        console.error('Error initialising worker:', error);
    }
}


// export async function updateRewards() {
//     try {
//         const authMethod = JSON.parse(localStorage.getItem("authMethod"));

//         await initializeWallet(authMethod);

//         const wallet = await getWallet();
//         console.log("wallet is ",wallet.address);
        
//         const contract = new ethers.Contract(WcontractAddress, WcontractABI, wallet.provider);
//         const params = "";

//         const functionData = contract.interface.encodeFunctionData("updateRewards",params);
//         try {
//             await contract.callStatic.updateRewards(params);
//             console.log('Call Static succeeded');
//         } catch (error) {
//             console.error('Call Static Error:', error);
//         }
//         const estimatedGas = await contract.estimateGas.updateRewards(params);
      
//           console.log('Estimated Gas:', estimatedGas.toString());
//           const gasPrice = await wallet.provider.getGasPrice();
//           console.log("Gas Price:", gasPrice.toString());


//         const tx = {
//             to: contractAddress,
//             data: functionData,
//             gasLimit: estimatedGas.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)),
//         };

//         const txResponse = await wallet.sendTransaction(tx);
//         console.log(txResponse);
//         await txResponse.wait();
//         console.log('Transaction Confirmed');
//         return txResponse.hash;
//     } catch (error) {
//         console.error('Error initialising Distributor:', error);
//     }
// }

// export async function updateVotingMapping() {
//     try {
//         const authMethod = JSON.parse(localStorage.getItem("authMethod"));

//         await initializeWallet(authMethod);

//         const wallet = await getWallet();
//         console.log("wallet is ",wallet.address);
        
//         const contract = new ethers.Contract(WcontractAddress, WcontractABI, wallet.provider);
//         const params = "";

//         const functionData = contract.interface.encodeFunctionData("updateVotingMapping",params);
//         try {
//             await contract.callStatic.updateVotingMapping(params);
//             console.log('Call Static succeeded');
//         } catch (error) {
//             console.error('Call Static Error:', error);
//         }
//         const estimatedGas = await contract.estimateGas.updateVotingMapping(params);
      
//           console.log('Estimated Gas:', estimatedGas.toString());
//           const gasPrice = await wallet.provider.getGasPrice();
//           console.log("Gas Price:", gasPrice.toString());


//         const tx = {
//             to: contractAddress,
//             data: functionData,
//             gasLimit: estimatedGas.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)),
//         };

//         const txResponse = await wallet.sendTransaction(tx);
//         console.log(txResponse);
//         await txResponse.wait();
//         console.log('Transaction Confirmed');
//         return txResponse.hash;
//     } catch (error) {
//         console.error('Error initialising Distributor:', error);
//     }
// }

export async function withdrawRewards() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        console.log("wallet is ",wallet.address);
        const address = await wallet.address;
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
       

        const functionData = contract.interface.encodeFunctionData("withdrawRewards");
        try {
            await contract.callStatic.withdrawRewards();
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error:', error);
        }
        const estimatedGas = await contract.estimateGas.withdrawRewards();
      
          console.log('Estimated Gas:', estimatedGas.toString());
          const gasPrice = await wallet.provider.getGasPrice();
          console.log("Gas Price:", gasPrice.toString());


        const tx = {
            from:address,
            to: WcontractAddress,
            data: functionData,
            gasLimit: estimatedGas.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)),
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        await txResponse.wait();
        console.log('Transaction Confirmed');
        return txResponse.hash;
    } catch (error) {
        console.error('Error withdraw award:', error);
    }
}

export async function getRewards() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI,  wallet.provider);
        const result = await contract.getRewards(address);
     
        console.log('Transaction Hash:', result.toNumber);
        return result.toNumber();
    } catch (error) {
        console.error('Error getting rewars:', error);
    }
}

export async function getVotedOption() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getVotedOption(address,"s");
     
        console.log('Transaction Hash:', result.toString);
        return result;
    } catch (error) {
        console.error('Error getting voted option:', error);
    }
}
