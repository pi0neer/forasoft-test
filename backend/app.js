const express = require("express");
const cors = require("cors");
const State = require("./models/State");
const app = express();

app.use(cors());
app.use(express.json());

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const state = new State();

io.on("connection", socket => {
  socket.on("create new room", data => {
    state.createChatRoom(data.roomID, {
      userName: data.userName,
      socketID: socket.id
    });
    socket.join(data.roomID, () => {
      io.to(data.roomID).emit(
        "online users",
        state.getRoom(data.roomID).users.map(user => user.userName)
      );
    });
  });
  socket.on("connect to room", data => {
    state.addUserToChat(data.roomID, {
      userName: data.userName,
      socketID: socket.id
    });
    socket.join(data.roomID, () => {
      io.to(data.roomID).emit(
        "online users",
        state.getRoom(data.roomID).users.map(user => user.userName)
      );
    });
  });
  socket.on("message", message => {
    socket.to(message.roomID).emit("message", message);
  });
  socket.on("disconnect", () => {
    let roomID = findUserBySocketIDRoom(socket.id);
    state.deleteUserFromChat(roomID, socket.id);
    let room = state.getRoom(roomID);
    io.to(roomID).emit(
      "online users",
        room.users.map(user => user.userName)
    );
    if (room.users.length === 0) state.deleteRoom(roomID)
  });
});

const findUserBySocketIDRoom = socketID => {
  let roomID = "";
  state.chatRooms.map(room => {
    if (room.users.find(user => user.socketID === socketID)) roomID = room.id;
  });
  return roomID;
};

const port = process.env.PORT || "3001";

http.listen(port, () => {
  console.log("listening on:" + port);
});
