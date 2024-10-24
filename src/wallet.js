import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from './components/ui/button.jsx';

export const ConnectWalletButton = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                setError('');
            } catch (err) {
                setError('Failed to connect wallet. Please try again.');
            }
        } else {
            setError('Please install MetaMask to use this feature.');
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <Button onClick={connectWallet} disabled={!!walletAddress}>
                {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
            {walletAddress && (
                <p className="text-sm">Connected: {walletAddress}</p>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
        </div>
    );
};