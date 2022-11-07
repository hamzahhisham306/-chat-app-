'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
const four = require('./error-handlers/400');
const userRoutes=require('./routes/user.route');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
app.use(userRoutes);
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Home Post',
    code: 200
  })
});
app.use('*', (req, res) => {

  four("this is error", req, res);
});
function start(port) {
  server.listen(port, () => console.log(`Up an running on port ${port}`));
}

module.exports = {
  start,
};