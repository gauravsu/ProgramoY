
import {LitAbility,} from '@lit-protocol/types';
import { litNodeClient } from '../lit/utils/lit';
import { LitPKPResource} from '@lit-protocol/auth-helpers';
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import { getPKPs } from '../lit/utils/lit'

let walletInstance = null;

async function initializeWallet(authMethod) {
    if (walletInstance) {
        return walletInstance;
    }

    try {
        await litNodeClient.connect();
        const pkp = await getPKPs(authMethod);

        const resourceAbilities = [
            {
                resource: new LitPKPResource("*"),
                ability: LitAbility.PKPSigning,
            },
        ];

        const sessionKeyPair = litNodeClient.getSessionKey();
        const authNeededCallback = async (params) => {
            const response = await litNodeClient.signSessionKey({
                sessionKey: sessionKeyPair,
                statement: params.statement,
                authMethods: authMethod,
                pkpPublicKey: pkp[pkp.length - 1].publicKey,
                expiration: params.expiration,
                resources: params.resources,
                chainId: 1,
            });
            return response.authSig;
        };

        const sessionSigs = await litNodeClient.getSessionSigs({
            chain: "sepolia",
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
            authMethod: authMethod,
            resourceAbilityRequests: resourceAbilities,
            authNeededCallback,
        });

        walletInstance = new PKPEthersWallet({
            pkpPubKey: pkp[pkp.length - 1].publicKey,
            litNodeClient: litNodeClient,
            rpc: 'https://rpc2.sepolia.org/',
            controllerSessionSigs: sessionSigs,
            authNeededCallback,
        });

        await walletInstance.init();
        console.log("Wallet initialized:", walletInstance);

        return walletInstance;
    } catch (error) {
        console.error('Error initializing wallet:', error);
        throw error;
    }
}

async function getWallet() {
    if (!walletInstance) {
        throw new Error('Wallet is not initialized. Call initializeWallet first.');
    }
    return walletInstance;
}

export { initializeWallet, getWallet };