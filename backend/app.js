const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("pog");
  socket.on("message", function(msg) {
    console.log(msg);
    io.emit("message", msg);
  });
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || "3000";

http.listen(port, () => {
  console.log("listening on *:" + port);
});
