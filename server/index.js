// index.js
import dotenv from "dotenv";
import cron from "node-cron";
import { pollMentions } from "./jobs/pollMentions.js";
import logger from "./utils/logger.js";

// Load environment variables
dotenv.config();

// Log startup
logger.info("🤖 Bot server starting...");

// Run poll once on startup
pollMentions();

// Schedule polling every 30 seconds
cron.schedule("*/30 * * * * *", () => {
  logger.info("⏳ Scheduled poll triggered...");
  pollMentions();
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  logger.info("🛑 Bot shutting down (SIGINT)...");
  process.exit();
});

process.on("SIGTERM", () => {
  logger.info("🛑 Bot shutting down (SIGTERM)...");
  process.exit();
});
