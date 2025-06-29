// services/farcaster.js
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import { CastParamType } from "@neynar/nodejs-sdk/build/api/index.js";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY,
});
const client = new NeynarAPIClient(config);

const BOT_FID = parseInt(process.env.BOT_FID);

/**
 * Reply to a cast on Farcaster
 * @param {string} signerUuid - Your approved signer UUID
 * @param {string} replyText - The text content of your reply
 * @param {string} parentCastHash - Hash of the cast you're replying to
 * @param {number} parentAuthorFid - FID of the original cast author
 * @returns {Promise} - The published cast response
 */
export async function fetchCast(hash) {
  try {
    const cast = await client.lookupCastByHashOrWarpcastUrl({
      identifier: hash,
      type: CastParamType.Hash
    });
    
    console.log(cast);
    
    return cast;
  } catch (error) {
    console.error("Error publishing reply:", error);
    throw error;
  }
}


/**
 * Reply to a cast on Farcaster
 * @param {string} signerUuid - Your approved signer UUID
 * @param {string} replyText - The text content of your reply
 * @param {string} parentCastHash - Hash of the cast you're replying to
 * @param {number} parentAuthorFid - FID of the original cast author
 * @returns {Promise} - The published cast response
 */
export async function replyToCast(signerUuid, replyText, parentCastHash, parentAuthorFid) {
  try {
    const response = await client.publishCast({
      signerUuid: signerUuid,
      text: replyText,
      parent: parentCastHash,           // The cast hash you're replying to
      parentAuthorFid: parentAuthorFid // FID of the original cast author
    });

    console.log("Reply published successfully!");
    console.log("Cast hash:", response.cast.hash);
    console.log("Author:", response.cast.author.username);
    console.log("Text:", response.cast.text);
    
    return response;
  } catch (error) {
    console.error("Error publishing reply:", error);
    throw error;
  }
}

export async function createSigner() {
  try {
    const signer = await client.createSigner();
    console.log("Signer created:", signer);
    console.log("Approval URL:", signer.signer_approval_url);
    
    // User needs to visit the approval URL to authorize the signer
    // This will show a QR code or link to approve in Warpcast
    console.log(signer);
    
    return signer;
  } catch (error) {
    console.error("Error creating signer:", error);
  }
}

/**
 * Reply to a cast with an image
 * @param {string} parentHash - The cast hash to reply to
 * @param {string} imagePathOrUrl - The image URL or path to include
 */
export async function replyWithImage(parentHash, imagePathOrUrl) {
  // TODO: Fill in logic to reply to Farcaster using your SDK of choice
  logger.info(`Replying to cast ${parentHash} with image: ${imagePathOrUrl}`);
  // e.g., call to Farcaster client post API
}
