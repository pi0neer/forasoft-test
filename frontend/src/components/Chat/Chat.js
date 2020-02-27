import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import io from "socket.io-client";

import "./Chat.scss";

const socket = io("http://localhost:3001/");

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Chat = () => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const sendMessage = () => {
    let messageData = {
      message: message,
      userName: location.state.userName,
      time: new Date().toLocaleString()
    };
    socket.emit("message", { ...messageData, roomID: location.state.roomID });
    setAllMessages(previousMessages => [...previousMessages, messageData]);
  };

  useEffect(() => {
    if (!location.state || !location.state.userName) {
      history.push({
        pathname: "/login",
        state: {
          roomID: query.get("id")
        }
      });
    } else {
      if (location.state.newRoom)
        socket.emit("create new room", location.state);
      else socket.emit("connect to room", location.state);
    }
    socket.on("online users", onlineUsers => {
      setUsers(users => onlineUsers);
    });
    socket.on("message", message => {
      setAllMessages(previousMessages => [...previousMessages, message]);
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat-top">
        <div className="messages-field">
          Messages:
          <div className="scroll-container">
            {allMessages.map((message, index) => (
              <p key={index}>
                <span className="time">{message.time}</span>{" "}
                <span className="username">{message.userName}</span>:{" "}
                {message.message}
              </p>
            ))}
          </div>
        </div>
        <div className="online-users">
          Online users:
          <div className="scroll-container">
            {users.map((name, index) => (
                <p key={index}>{name}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="chat-inputs">
        <input
          placeholder="Enter your message"
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
