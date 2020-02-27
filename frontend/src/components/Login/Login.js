import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import "./Login.scss";

const Login = () => {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const location = useLocation();
  const handleEnterButton = () => {
    if (!userName) alert("Enter username!");
    else {
      let newRoomID = uuidv4();
      let roomID =
        !location.state || !location.state.roomID
          ? newRoomID
          : location.state.roomID;
      history.push({
        pathname: "/chat",
        search: `?id=${roomID}`,
        state: { userName: userName, roomID: roomID, newRoom: !location.state || !location.state.roomID }
      });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <p>Please, enter your name</p>
        <input
          placeholder="Your name"
          onChange={e => setUserName(e.target.value)}
        />
        <button onClick={handleEnterButton}>Enter chat</button>
      </div>
    </div>
  );
};

export default Login;
