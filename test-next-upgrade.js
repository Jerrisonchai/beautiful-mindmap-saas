const http = require('http');
const { parse } = require('url');
const next = require('next');
const { WebSocketServer } = require('ws');

const app = next({ dev: true });
app.prepare().then(() => {
  const handle = app.getRequestHandler();
  const server = http.createServer((req, res) => {
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
      app.getUpgradeHandler()(req, socket, head);
    }
  });

  server.listen(3001, () => {
    console.log('Test server ready');
    process.exit(0);
  });
});
