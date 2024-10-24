import {
  LitAuthClient,
} from '@lit-protocol/lit-auth-client';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import {
  AuthMethodScope,
  AuthMethodType,
  LIT_NETWORK,
  ProviderType,
} from '@lit-protocol/constants';
import {
  LitAbility,
} from '@lit-protocol/types';
import { LitPKPResource, LitActionResource, LitAccessControlConditionResource } from '@lit-protocol/auth-helpers';

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'localhost';
export const ORIGIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${DOMAIN}`
    : `http://${DOMAIN}:3000`;

export const SELECTED_LIT_NETWORK = ((process.env
  .NEXT_PUBLIC_LIT_NETWORK) ||
  LIT_NETWORK.DatilDev);

export const litNodeClient = new LitNodeClient({
  alertWhenUnauthorized: false,
  litNetwork: 'datil-dev',
  debug: true,
});

litNodeClient.connect();

export const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: '6ts099ns-xy2h-kk7b-s2ve-ih5tf1wddk80_septo',
  },
  litNodeClient,
});

export async function getProviderByAuth(authMethod){
  return await getProviderByAuthMethod(authMethod);
}

export async function authenticateWithEthWallet(
  address,
  signMessage
) {
  const ethWalletProvider = litAuthClient.initProvider(
    ProviderType.EthWallet,
    {
      domain: DOMAIN,
      origin: ORIGIN,
    }
  );
  const authMethod = await ethWalletProvider.authenticate({
    address,
    signMessage,
  });
  console.log("int lit.js the authmethod is ", authMethod);
  return authMethod;
}


export async function getSessionSigsForDistributor({
  pkpPublicKey,
  authMethod,
}) {
  const provider = getProviderByAuthMethod(authMethod);
  if (provider) {
    await litNodeClient.connect();
    const sessionSigs = await litNodeClient.getPkpSessionSigs({
      pkpPublicKey,
      authMethods: [authMethod],
      resourceAbilityRequests: [
        {
          resource: new LitPKPResource('*'),
          ability: LitAbility.PKPSigning,
        },
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.LitActionExecution,
        },
        {
          resource: new LitAccessControlConditionResource('*'),
          ability: LitAbility.AccessControlConditionDecryption,

        }
      ],
    });

    return sessionSigs;
  } else {
    throw new Error(
      `Provider not found for auth method type ${authMethod.authMethodType}`
    );
  }
}

export async function updateSessionSigs(
  params
) {
  const sessionSigs = await litNodeClient.getSessionSigs(params);
  return sessionSigs;
}


export async function getPKPs(authMethod) {
  const provider = getProviderByAuthMethod(authMethod);
  const allPKPs = await provider.fetchPKPsThroughRelayer(authMethod);
  return allPKPs;
}

export async function mintPKP(authMethod) {
  const provider = getProviderByAuthMethod(authMethod);

  const options = {
    permittedAuthMethodScopes: [[AuthMethodScope.SignAnything]],
  };

  let txHash
  txHash = await provider.mintPKPThroughRelayer(authMethod, options);
  let attempts = 3;
  let response = null;

  while (attempts > 0) {
    try {
      response = await provider.relay.pollRequestUntilTerminalState(txHash);
      break;
    } catch (err) {
      console.warn('Minting failed, retrying...', err);

      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts--;
    }
  }

  if (!response || response.status !== 'Succeeded') {
    throw new Error('Minting failed');
  }

  const newPKP = {
    tokenId: response.pkpTokenId,
    publicKey: response.pkpPublicKey,
    ethAddress: response.pkpEthAddress,
  };

  return newPKP;
}

function getProviderByAuthMethod(authMethod) {
  console.log("auth method in lit.js is ", authMethod);
  switch (authMethod.authMethodType) {

    case AuthMethodType.EthWallet:
      console.log("provider is ",litAuthClient.getProvider(ProviderType.EthWallet));
      return litAuthClient.getProvider(ProviderType.EthWallet);

    default:
      return;
  }
}

