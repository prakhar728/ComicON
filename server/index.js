import express from 'express';
import dotenv from 'dotenv';
import { handleWebhook } from './services/webhookHandler.js';
import { responseSample } from './utils/sample.js';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const publishedCasts = new Set();

// Middleware
app.use(express.json()); // Parse JSON bodies

// CORS
app.use(cors());

app.get('/health', async (req, res) => {
  try {
    // const sampleRequest = responseSample; 
    // await handleWebhook(sampleRequest);
    console.log("Request received health");
    
    res.status(200).send('Request up received');
  } catch (err) {
    console.error('❌ Webhook error:', err);
    res.status(400).send('Invalid request');
  }
});

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  try {
    // const sampleRequest = responseSample; 
    // await handleWebhook(sampleRequest);
    const castHash = req.body?.data?.hash;
    
    if (!castHash) {
      console.warn('⚠️ No cast hash found in request');
      return res.status(400).send('Invalid cast data');
    }

    if (publishedCasts.has(castHash)) {
      console.log(`🔁 Duplicate cast detected (hash: ${castHash})`);
      return res.status(200).send('Duplicate cast ignored');
    }

    // Add to published set
    publishedCasts.add(castHash);
    
    console.log("Request received", castHash);

    await handleWebhook(req.body);
    res.status(200).send('Webhook received');
  } catch (err) {
    console.error('❌ Webhook error:', err);
    res.status(400).send('Invalid request');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
