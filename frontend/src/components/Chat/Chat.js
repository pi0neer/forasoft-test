import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import io from "socket.io-client";

import "./Chat.scss";

let socket = io("http://localhost:3000/");

function Chat() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const location = useLocation();

  const sendMessage = () => {
    socket.emit("message", {
      message: message,
      userName: location.state.userName
    });
  };

  useEffect(() => {
    socket.on("message", message => {
      setAllMessages(previousMessages => [...previousMessages, message]);
    });
  }, []);

  return (
    <div className="chat">
      <div className="messagesField">{allMessages.map((message, index) => (
          <p key={index}>{message.userName}: {message.message}</p>
      ))}</div>
      <div className="onlineUsersField"></div>
      <p>Message:</p>
      <input onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
