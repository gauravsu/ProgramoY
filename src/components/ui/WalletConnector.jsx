import React, { useEffect, useState } from "react";

const WalletConnector = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const isConnected = sessionStorage.getItem('IsConnected') === 'true';
        const walletAddress = sessionStorage.getItem('WalletAddress');
        if (walletAddress) {
            setWalletAddress(walletAddress);
            fetchBalance(walletAddress);
        }
        setIsConnected(isConnected);
    }, []);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                if (isConnected) {
                    // Disconnect wallet
                    setIsConnected(false);
                    sessionStorage.removeItem('IsConnected');
                    sessionStorage.removeItem('WalletAddress');
                    setWalletAddress('');
                    setBalance('');
                } else {
                    // Connect wallet
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const account = accounts[0];
                    setIsConnected(true);
                    sessionStorage.setItem('IsConnected', 'true');
                    sessionStorage.setItem('WalletAddress', account);
                    setWalletAddress(account);
                    fetchBalance(account);
                }
            } else {
                console.error('MetaMask is not installed');
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    };

    const fetchBalance = async (address) => {
        try {
            if (window.ethereum) {
                const balanceInWei = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [address, 'latest']
                });
                const balanceInEth = window.web3.utils.fromWei(balanceInWei, 'ether');
                setBalance(balanceInEth);
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={connectWallet} style={styles.button}>
                {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
            {isConnected && (
                <div style={styles.info}>
                    <p style={styles.walletAddress}>Address: {walletAddress}</p>
                    <p style={styles.balance}>Balance: {balance} ETH</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        height: '100vh',
        backgroundColor: '#f0f4f8',
        padding: '20px',
    },
    button: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    info: {
        position: 'absolute',
        top: '60px',
        right: '20px',
        backgroundColor: '#e1f5e4',
        border: '1px solid #a5d6a7',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
    },
    walletAddress: {
        margin: '0',
        fontWeight: 'bold',
    },
    balance: {
        margin: '5px 0 0',
    }
};

export default WalletConnector;
