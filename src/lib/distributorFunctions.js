import { initializeWallet, getWallet } from './walletManager';
import { ethers } from 'ethers';
import { contractABI,contractAddress } from './contract';


export async function initDistributor(listed,initialBudget,initialFrequency) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);
        

        const wallet = await getWallet();
        console.log("wallet is ",wallet.address);
        const valueInWei = ethers.utils.parseEther(initialBudget.toString());
        console.log("value is ",valueInWei);

        const params = [
            listed,
            parseInt(initialBudget),
            initialFrequency,
            "13",
            "0",
            ["xx3","yy3","zz3"],
            ["-1","-1","-1"]
        ];
        console.log("params",params)
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);

        const functionData = contract.interface.encodeFunctionData("initDistributor",params);
        console.log("hello")
   
        try {
            await contract.callStatic.initDistributor(
                listed,
                parseInt(initialBudget*10**3),
                parseInt(initialFrequency),
                "13",
                "0",
                ["xx3","yy3","zz3"],
                ["-1","-1","-1"],
                { value: valueInWei }

            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error for Init Dist:', error);
        }
        const estimatedGas = await contract.estimateGas.initDistributor(
            listed,
            parseInt(initialBudget*10**3),
            parseInt(initialFrequency),
            "13",
            "0",
            ["xx3","yy3","zz3"],
            ["-1","-1","-1"],
            { value: valueInWei }
          );
      
          console.log('Estimated Gas:', estimatedGas.toString());
          const gasPrice = await wallet.provider.getGasPrice();
          console.log("Gas Price:", gasPrice.toString());


        const tx = {
            to: contractAddress,
            data: functionData,
            value: valueInWei,
            gasLimit: estimatedGas.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)),
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        await txResponse.wait();
        console.log('Transaction Confirmed');
        return txResponse.hash;
    } catch (error) {
        console.error('Error initialising Distributor:', error);
    }
}

export async function addPost(postId,description,optionIds,imageIds) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();

        const address = await  wallet.address;
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = [
            postId, 
            description, 
            optionIds, 
            imageIds,
            address
        ]
        const functionData = contract.interface.encodeFunctionData("AddPost",param);

        try {
            await contract.callStatic.AddPost(
                postId, 
                description, 
                optionIds, 
                imageIds,
                address
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error for Add post:', error);
        }

        const estimatedGas = await contract.estimateGas.AddPost(
            postId, 
            description, 
            optionIds, 
            imageIds,
            address
        );
    
        console.log('Estimated Gas:', estimatedGas.toString());

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
        console.error('Error adding post:', error);
    }
}

export async function updateBudget(amount) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = [amount,address]

        const functionData = contract.interface.encodeFunctionData("updateBudget",param)

        try {
            await contract.callStatic.updateBudget(
                amount,
                address
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error updating budget:', error);
        }
        const estimatedGas = await contract.estimateGas.updateBudget(
            amount,
            address
        );
      
        console.log('Estimated Gas:', estimatedGas.toString());

        const tx = {
            from:address,
            to: contractAddress,
            data: functionData,
            gasLimit: estimatedGas
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        await txResponse.wait();
        console.log('Transaction Confirmed');
        return txResponse.hash;
    } catch (error) {
        console.error('Error updating budget:', error);
    }
}

export async function updateDescription(description,posiId) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = [description,posiId,address]

        const functionData = contract.interface.encodeFunctionData("updateDescription",param)

        try {
            await contract.callStatic.updateDescription(
                description,
                posiId,
                address
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error updating description:', error);
        }
        const estimatedGas = await contract.estimateGas.updateDescription(
            description,
            posiId,
            address
        );
      
        console.log('Estimated Gas:', estimatedGas.toString());

        const tx = {
            from:address,
            to: contractAddress,
            data: functionData,
            gasLimit: estimatedGas
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        await txResponse.wait();
        console.log('Transaction Confirmed');
        return txResponse.hash;
    } catch (error) {
        console.error('Error updating description:', error);
    }
}

export async function withdrawETH(amount) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = [amount]

        const functionData = contract.interface.encodeFunctionData("withdrawETH",param)

        try {
            await contract.callStatic.withdrawETH(
                amount
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error:', error);
        }
        const estimatedGas = await contract.estimateGas.withdrawETH(
            amount
        );
      
        console.log('Estimated Gas:', estimatedGas.toString());

        const tx = {
            to: contractAddress,
            data: functionData,
            chainId: 11155111, // For non-EIP-1559 networks
            gasLimit: estimatedGas
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        await txResponse.wait();
        console.log('Transaction Confirmed');
        return txResponse.hash;
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

export async function getBudget() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getBudget(address);
     
        console.log('Transaction Hash:', result.toNumber());
        return result;
    } catch (error) {
        console.error('Error withdrawing:', error);
    }
}

export async function getAllPosts() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getAllPosts(address);
     
        console.log('Transaction Hash:', result.toJSON);
        return result;
    } catch (error) {
        console.error('Error getting all posts:', error);
    }
}

export async function getParticularPost(postId) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        const postid = postId;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getParticularPost(address,postid);
     
        console.log('Transaction Hash:', result.toJSON);
        return result;
    } catch (error) {
        console.error('Error getting post:', error);
    }
}

export async function getAllOptions(postId) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        const postid = postId
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getAllOptions(postid);
     
        console.log('Transaction Hash:', result.toJSON);
        return result;
    } catch (error) {
        console.error('Error getting options:', error);
    }
}

export async function getAllVotesOnPost(postid) {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getAllOptions(postid);
     
        console.log('Transaction Hash:', result);
        return result;
    } catch (error) {
        console.error('Error getting votes:', error);
    }
}

