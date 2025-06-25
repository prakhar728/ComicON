// jobs/pollMentions.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import logger from "../utils/logger.js";
import { getBotMentions } from "../services/neynar.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROCESSED_CASTS_FILE = path.join(__dirname, "../db/processedCasts.json");

function loadProcessedCasts() {
  if (!fs.existsSync(PROCESSED_CASTS_FILE)) return new Set();
  const data = fs.readFileSync(PROCESSED_CASTS_FILE, "utf-8");
  return new Set(JSON.parse(data));
}

function saveProcessedCasts(processed) {
  fs.writeFileSync(PROCESSED_CASTS_FILE, JSON.stringify(Array.from(processed), null, 2));
}

export async function pollMentions() {
  logger.info("Polling for bot mentions...");
  const processed = loadProcessedCasts();

  const mentions = await getBotMentions();

  // for (const cast of mentions) {
  //   if (processed.has(cast.id)) continue;

  //   logger.info(`New cast from @${cast.author.username}: ${cast.text}`);

  //   const imagePath = await generateComic(cast.text);
  //   await replyWithImage(cast.id, imagePath);

  //   processed.add(cast.id);
  //   saveProcessedCasts(processed);
  // }
}
