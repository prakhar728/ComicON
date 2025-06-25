// services/farcaster.js
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY,
});
const client = new NeynarAPIClient(config);

// Your bot FID (set this in .env or hardcode)
const BOT_FID = parseInt(process.env.BOT_FID); // e.g., 12345

console.log(BOT_FID);

/**
 * Get new mentions of the bot (cast where the bot is mentioned)
 * @param {number} fid - Bot's FID
 * @param {number} limit - Number of notifications to fetch
 * @returns {Array<Object>} Array of relevant cast objects
 */
export async function getBotMentions(fid = BOT_FID, limit = 20) {
  try {
    const { notifications } = await client.fetchAllNotifications({
      fid,
      type: ["mentions"],
      limit,
    });

    const mentions = notifications
      .filter(
        (notif) =>
          notif.type === "mention" &&
          notif.cast &&
          notif.cast.mentioned_profiles.some((p) => p.fid === fid)
      )
      .map((notif) => ({
        id: notif.cast.hash, // Unique cast ID
        text: notif.cast.text,
        author: notif.cast.author,
        raw: notif.cast,
      }));

    logger.info(`Fetched ${mentions.length} mentions of bot.`);
    logger.debug(mentions);
    return mentions;
  } catch (err) {
    console.log(err);
    
    logger.error("Error fetching bot mentions:", err.message);
    return [];
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
