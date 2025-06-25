// server.js
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle GET /ping
  if (req.method === 'GET' && req.url === '/ping') {
    console.log(`[${new Date().toISOString()}] Ping received from ${req.socket.remoteAddress}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('pong\n');
    return;
  }

  // 404 for other routes
  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});