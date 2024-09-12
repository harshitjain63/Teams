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

io.on("connection", (socket) => {
  console.log("a user connected".green.bgWhite);
  console.log(socket.id.bgBlue.white);

  socket.emit("welcome", `Welcome ${socket.id}`);

  socket.on("join-room", (room, username) => {
    socket.join(room);
    console.log(`${username} joined room ${room}`.green);

    // Notify everyone in the room that a new user has joined
    io.to(room).emit("user-joined", `${username} has joined the room`);

    // send the current room members to the user
    const roomUsers = [...(io.sockets.adapter.rooms.get(room) || [])];
    io.to(socket.id).emit("current-users", roomUsers);
  });

  socket.on("leave-room", (room, username) => {
    socket.leave(room);
    console.log(`${username} left room ${room}`.yellow);

    // Notify everyone in the room that a user has left
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
    console.log("a user disconnected".red.bgWhite);
    console.log(socket.id.bgBlue.white);
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`.green.bgYellow.bold);
});
