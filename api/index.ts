const express = require("express");
const WS = require("ws");

const app = express();
const server = require("http").createServer(app);
const wss = new WS.Server({ server });

app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/ws", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end();
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Handle incoming messages
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Process the message and send a response
    ws.send(`Server response: ${message}`);
  });

  // Handle disconnections
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
