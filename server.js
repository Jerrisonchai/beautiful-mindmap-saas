const { WebSocketServer } = require('ws');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url, true);
    if (pathname === '/ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      // Forward other WebSocket upgrades (like Next.js HMR) to Next.js
      if (app.getUpgradeHandler) {
        app.getUpgradeHandler()(req, socket, head);
      } else {
        socket.destroy();
      }
    }
  });

  // Store connected clients and their mindmap sessions
  const sessions = {};

  wss.on('connection', (ws, req) => {
    const url = parse(req.url, true);
    const mindmapId = url.query.mindmapId || 'default';

    // Add to session
    if (!sessions[mindmapId]) {
      sessions[mindmapId] = new Set();
    }
    sessions[mindmapId].add(ws);

    console.log(`✅ User connected to mindmap: ${mindmapId} (Total users: ${sessions[mindmapId].size})`);

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Broadcast to all other clients in the same session
        sessions[mindmapId].forEach(client => {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify({
              type: 'update',
              data: data,
              userId: data.userId
            }));
          }
        });

        // Acknowledge receipt
        ws.send(JSON.stringify({
          type: 'ack',
          data: data
        }));
      } catch (error) {
        console.error('❌ Error processing message:', error);
      }
    });

    ws.on('close', () => {
      console.log(`👋 User disconnected from mindmap: ${mindmapId}`);
      if (sessions[mindmapId]) {
        sessions[mindmapId].delete(ws);
        if (sessions[mindmapId].size === 0) {
          delete sessions[mindmapId];
          console.log(`🗑️ Cleaned up empty session: ${mindmapId}`);
        }
      }
    });

    ws.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
      if (sessions[mindmapId]) {
        sessions[mindmapId].delete(ws);
      }
    });
  });

  wss.on('error', (error) => {
    console.error('❌ WebSocket server error:', error);
  });

  server.listen(PORT, () => {
    console.log(`\n🚀 Beautiful Mindmap SaaS`);
    console.log(`   📱 HTTP: http://localhost:${PORT}`);
    console.log(`   🌐 WS:   ws://localhost:${PORT}/ws`);
    console.log(`   🎨 Editor: http://localhost:${PORT}/editor`);
    console.log(`   🌙 Ready in production mode!`);
    console.log(`\n`);
  });
});
