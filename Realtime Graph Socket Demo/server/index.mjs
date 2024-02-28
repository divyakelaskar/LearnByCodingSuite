import express from 'express';
import http from 'http';
import * as socketio from 'socket.io';

const port = 4001;
const app = express();
const httpServer = http.createServer(app);

const server = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
  },
});

let data = [
  { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
  { name: 2, x: Math.random() * 10, y: Math.random() * 10 },
  { name: 3, x: Math.random() * 10, y: Math.random() * 10 },
  { name: 4, x: Math.random() * 10, y: Math.random() * 10 },
  { name: 5, x: Math.random() * 10, y: Math.random() * 10 },
];

server.on("connection", (socket) => {
  setInterval(() => {
    const newName = data[data.length - 1].name + 1;
    data.push({ name: newName, x: Math.random() * 10, y: Math.random() * 10 });
    if (data.length > 5) {
      data.shift();
    }
    socket.emit("message", data);
  }, 1000);
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});