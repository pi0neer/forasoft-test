import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Login.scss";

function Login() {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const handleEnterButton = () => {
    let id = 1;
    history.push({
      pathname: '/chat',
      search: `?id=${id}`,
      state: { userName: userName }
    });
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
}

export default Login;
