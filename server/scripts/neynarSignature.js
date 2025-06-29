// Independent script run using `pnpm generate-signature`

import dotenv from "dotenv";
import { Configuration, NeynarAPIClient } from "@neynar/nodejs-sdk";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { ViemLocalEip712Signer } from "@farcaster/hub-nodejs";
import { bytesToHex, hexToBytes } from "viem";

// Load environment variables
dotenv.config();

const getNeynarClient = () => {
    const apiKey = process.env.NEYNAR_API_KEY;
    if (!apiKey) throw new Error("NEYNAR_API_KEY is not set in .env");
    const config = new Configuration({ apiKey });
    return new NeynarAPIClient(config);
};

const getFid = async (neynarClient, mnemonic) => {
    const account = mnemonicToAccount(mnemonic);
    console.log("🔍 Custody Address:", account.address);
    const { user } = await neynarClient.lookupUserByCustodyAddress({
        custodyAddress: account.address,
    });

    return Number(user.fid);

};

const generateSignature = async (fid, publicKey, mnemonic) => {
    try {
        const deadline = Math.floor(Date.now() / 1000) + 86400;
        const account = mnemonicToAccount(mnemonic);
        const signer = new ViemLocalEip712Signer(account);
        const uintKey = hexToBytes(publicKey);
        const signature = await signer.signKeyRequest({
            requestFid: BigInt(fid),
            key: uintKey,
            deadline: BigInt(deadline),
        });

        if (signature.isErr()) {
            throw new Error("Failed to sign key request");
        }

        return { deadline, signature: bytesToHex(signature.value) };
    } catch (error) {
        console.log(error);

    }

};

const createAndRegisterSigner = async () => {
    const mnemonic = process.env.FARCASTER_DEVELOPER_MNEMONIC;
    if (!mnemonic) throw new Error("FARCASTER_DEVELOPER_MNEMONIC not found");

    const neynarClient = getNeynarClient();
    const fid = await getFid(neynarClient, mnemonic);

    const signer = await neynarClient.createSigner();
    const { deadline, signature } = await generateSignature(fid, signer.public_key, mnemonic);

    console.log((new Date(deadline)).toLocaleTimeString());

    const signedKey = await neynarClient.registerSignedKey({
        signerUuid: signer.signer_uuid,
        appFid: fid,
        deadline,
        signature,
    });

    return signedKey;
};

(async () => {
    try {
        const result = await createAndRegisterSigner();
        console.log("✅ Signer Created and Registered:");
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.log(err.response.data);

        console.error("❌ Error:", err.message);
    }
})();
