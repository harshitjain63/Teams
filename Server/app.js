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
// const users = new Map();

let users = [];

const addUser = (userId, username, room) => {
  const user = { userId, username, room };
  users.push(user);
  return user;
};
const removeUser = (userId) => {
  users = users.filter((user) => user.userId !== userId);
  return users;
};
const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

io.on("connection", (socket) => {
  let userId = socket.id;
  console.log("a user connected".green.bgWhite);
  console.log(userId.bgBlue.white);

  socket.emit("welcome", `Welcome ${userId}`);

  socket.on("join-room", ({ room, username }) => {
    console.log(`${username} joined room ${room}`.green);
    socket.join(room);
    addUser(socket.id, username, room);

    io.to(room).emit("user-joined", `${username} has joined the room`);

    io.to(room).emit("current-users", getUsersInRoom(room));
  });

  socket.on("leave-room", ({ room, username }) => {
    socket.leave(room);
    console.log(`${username} left room ${room}`.red);
    removeUser(userId);

    io.to(room).emit("user-left", `${username} has left the room`);

    io.to(room).emit("current-users", getUsersInRoom(room));
  });

  // Handling user messages
  socket.on("message", ({ room, username, text }) => {
    // Check if the user is in the room
    const isInRoom = users.some(
      (user) => user.userId === userId && user.room === room
    );

    if (isInRoom) {
      console.log(`Message from ${username}: ${text}`.bgMagenta.white);
      // Broadcast the message to everyone in the room
      io.to(room).emit("message", { username, text });
    } else {
      console.log(
        `User ${username} attempted to send a message to a room they are not in.`
      );
    }
  });

  socket.on("disconnect", () => {
    const user = users.find((user) => user.userId === userId);

    if (user) {
      removeUser(userId);

      console.log(`${user.username} disconnected`.red.bgWhite);
      io.to(user.room).emit("user-left", `${user.username} has left the room`);
      io.to(user.room).emit("current-users", getUsersInRoom(user.room));
    }
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`.green.bgYellow.bold);
});
