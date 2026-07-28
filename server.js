/**
 * Entry point for Hostinger's Node.js app manager (Passenger-based).
 * It expects a plain JS file that starts an HTTP server listening on
 * process.env.PORT — it does not run arbitrary npm scripts directly.
 * Run `npm run build` before starting this in production.
 */
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on port ${port}`);
  });
});
