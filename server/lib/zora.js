import 'dotenv/config';
import { createCoin, DeployCurrency, validateMetadataURIContent } from '@zoralabs/coins-sdk';
import {
    createWalletClient,
    createPublicClient,
    http,
} from 'viem';
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from 'viem/accounts';


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(PRIVATE_KEY);

const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(baseSepolia.rpcUrls.default.http[0]),
});

const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(baseSepolia.rpcUrls.default.http[0]),
});



export async function createZoraCoin(address, imgUrl = 'ipfs://bafybeigoxzqzbnxsn35vq7lls3ljxdcwjafxvbvkivprsodzrptpiguysy', randomNumber) {

    await validateMetadataURIContent(imgUrl);
    const coinParams = {
        name: `ComicOn - Strip #${randomNumber}`,
        symbol: `CS#${randomNumber}`,
        uri: imgUrl,
        payoutRecipient: address,
        platformReferrer: '0x90f6797C18dF84b5D0cFA110F57D4eCB4Afa37Ed',
        chainId: baseSepolia.id,
        currency: DeployCurrency.ETH,
    };

    try {
        console.log("Creating coin");

        const result = await createCoin(coinParams, walletClient, publicClient, {
            gasMultiplier: 120,
        });

        console.log('✅ Transaction hash:', result.hash);
        console.log('✅ Coin address:', result.address);
        console.log('✅ Deployment details:', result.deployment);
        return result;
    } catch (err) {
        console.error('❌ Error creating coin:', err);
        throw err;
    }
}
