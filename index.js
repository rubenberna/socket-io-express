const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  perMessageDeflate: false,
});

const port = process.env.PORT || 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
