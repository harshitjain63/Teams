import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import colors from "colors";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello From Team Server");
  console.log("Hello From Team Server".green.bgWhite);
});

const port = process.env.PORT || 3000;
const users = new Map();
io.on("connection", (socket) => {
  console.log("a user connected".green.bgWhite);
  console.log(socket.id.bgBlue.white);

  socket.emit("welcome", `Welcome ${socket.id}`);

  socket.on("join-room", (room, username) => {
    socket.join(room);
    users.set(socket.id, username);
    console.log(`${username} joined room ${room}`.green);
    const roomSockets = io.sockets.adapter.rooms.get(room) || new Set();
    const roomUsers = Array.from(roomSockets).map((socketId) =>
      users.get(socketId)
    );

    // current list of usernames to the newly joined user
    io.to(socket.id).emit("current-users", roomUsers);

    // Notify everyone in the room that a new user has joined
    io.to(room).emit("user-joined", `${username} has joined the room`);
  });

  socket.on("leave-room", (room, username) => {
    socket.leave(room);

    users.delete(socket.id);

    // Notify everyone in the room that the user has left
    io.to(room).emit("user-left", `${username} has left the room`);
  });

  // Handling user messages
  socket.on("message", (msg) => {
    console.log(`Message from ${msg.username}: ${msg.text}`.bgMagenta.white);

    // Broadcast the message to everyone in the room
    io.to(msg.room).emit("message", msg);
  });

  // Handle disconnect events
  socket.on("disconnecting", () => {
    console.log("disconnecting".red.bgWhite);
    console.log(socket.id.bgBlue.white);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);

    if (username) {
      users.delete(socket.id);

      console.log(`${username} disconnected`.red.bgWhite);
    }
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`.green.bgYellow.bold);
});