// server.js
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Accept only POST
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // Read JSON body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const json = JSON.parse(body);
      console.log('📦 Webhook received:\n', JSON.stringify(json, null, 2));
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Webhook received');
    } catch (err) {
      console.error('❌ Invalid JSON:', err.message);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid JSON');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Webhook server listening at http://localhost:${PORT}`);
});
