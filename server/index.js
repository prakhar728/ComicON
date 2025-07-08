import express from 'express';
import dotenv from 'dotenv';
import { handleWebhook } from './services/webhookHandler.js';
import { responseSample } from './utils/sample.js';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// CORS
app.use(cors());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  try {
    // const sampleRequest = responseSample; 
    // await handleWebhook(sampleRequest);
    await handleWebhook(req);
    res.status(200).send('Webhook received');
  } catch (err) {
    console.error('❌ Webhook error:', err);
    res.status(400).send('Invalid request');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
