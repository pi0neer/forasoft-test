class ChatRoom {
  constructor(id, users) {
    this.users = users;
    this.id = id;
  }

  addUser(user) {
    this.users = [...this.users, user];
  }

  deleteUser(socketID) {
    this.users = this.users.filter(user => user.socketID !== socketID);
  }
}

module.exports = ChatRoom;
