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
});

server.listen(port, () => {
  console.log(`listening on ${port}`.green.bgYellow.bold);
});
