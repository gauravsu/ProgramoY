import { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import DalleNftAbi from '../../contract/Dalle.json';

const CONTRACT_ADDRESS = "0x5a76D8a2BAD252fe57fb5281029a46C65d96aF52";
const GALADRIEL_RPC_URL = "https://devnet.galadriel.com";

function DalleInteraction() {
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [finalPrompt, setFinalPrompt] = useState('');
    const [tokenuri, setTokenuri] = useState('');

    // Blockchain...
    const [tokenId, setTokenId] = useState(null);
    const [prompt, setPrompt] = useState(null);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setFinalPrompt(prompt);  // Finalize the prompt
            console.log("Final prompt set:", prompt);
        }
    };

    useEffect(() => {
        async function connectToBlockchain() {
            if (typeof window.ethereum !== "undefined") {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);

                const signer = provider.getSigner();
                setSigner(signer);

                // Load the smart contract
                const dalleNftContract = new ethers.Contract(CONTRACT_ADDRESS, DalleNftAbi.abi, signer);
                setContract(dalleNftContract);
            } else {
                alert("MetaMask not detected!");
            }
        }
        connectToBlockchain();
    }, []);

    useEffect(() => {
        if (signer && tokenId) {
            const getTokenUri = async () => {
                try {
                    const url = "http://localhost:8000/getTokenUri";
                    const signerAddress = await signer.getAddress(); // Ensure signer is available
                    const data = {
                        signerAddress: signerAddress,
                        tokenId: tokenId,
                    };

                    fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((result) => {
                            console.log("Success:", result);
                            setTokenuri(result.tokenURI);
                            console.log(tokenuri);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                } catch (err) {
                    console.log("Error fetching token URI:", err);
                }
            };

            getTokenUri();
        }
    }, [signer, tokenId]);

    useEffect(() => {
        if (finalPrompt) {
            const initializeMint = async () => {
                try {
                    const url = "http://localhost:8000/initializeMint";
                    const data = {
                        prompt: finalPrompt,
                    };

                    fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((result) => {
                            console.log("Success:", result);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                } catch (err) {
                    console.log("Error fetching token URI:", err);
                }
            };

            initializeMint();
        }
    }, [finalPrompt]);

    return (
        <div>
            <h1>Interact with Galadriel Smart Contract</h1>
            <form>
                <div className="grid w-full items-center gap-4" >
                    <div
                        className="flex flex-col space-y-2 p-4 rounded-lg shadow-lg py-8"
                        style={{ background: "transparent", border: "1.6px solid #6B4DBF", borderRadius: "8px", borderBottomLeftRadius: "17px", borderTopRightRadius: "6px", width: "307x", paddingBottom: "2px", }}
                    >
                        <input
                            placeholder="Enter TokenId"
                            type="text"
                            id="TokenName"
                            value={tokenId}
                            onChange={(e) => setTokenId(e.target.value)}
                            className="p-2 rounded-md border focus:outline-none focus:ring-0  "
                            style={{ color: "#854CE6", width: "250px", width: "240px", background: "transparent", border: "none", paddingLeft: "50px", paddingBottom: "8px", border: "none", boxShadow: "none", outline: "none" }}
                        />

                        <input
                            placeholder="Enter Prompt"
                            type="text"
                            id="Prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyUp={handleKeyPress} // Detect Enter key
                            className="p-2 rounded-md border focus:outline-none focus:ring-0  "
                            style={{ color: "#854CE6", width: "250px", width: "240px", background: "transparent", border: "none", paddingLeft: "50px", paddingBottom: "8px", border: "none", boxShadow: "none", outline: "none" }}
                        />
                    </div>
                    <p>{tokenuri}</p>
                </div>
            </form>
        </div>
    );
}

export default DalleInteraction;
