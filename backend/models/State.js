const ChatRoom = require("./ChatRoom");

class State {
  constructor() {
    this.chatRooms = [];
  }

  createChatRoom(roomID, user) {
    let chatRoom = new ChatRoom(roomID, [user]);
    this.chatRooms = [...this.chatRooms, chatRoom];
  }

  deleteRoom(roomID) {
    this.chatRooms = this.chatRooms.filter(room => room.id !== roomID);
  }

  addUserToChat(roomID, user) {
    let chatRoom = this.getRoom(roomID);
    if (chatRoom) chatRoom.addUser(user);
  }

  deleteUserFromChat(roomID, user) {
    let chatRoom = this.getRoom(roomID);
    if (chatRoom) chatRoom.deleteUser(user);
  }

  getRoom(roomID) {
    return this.chatRooms.find(room => room.id === roomID);
  }
}

module.exports = State;
