import React, { useState } from "react";
import "./Login.scss";

function Login() {
  // Declare a new state variable, which we'll call "count"
  const [userName, setUserName] = useState("Your name");

  return (
    <div className="login">
      <div className="login-container">
        <p>Please, enter your name</p>
        <input placeholder="Your name" onChange={e => setUserName(e.target.value)} />
        <button onClick={}>Enter chat</button>
      </div>
    </div>
  );
}

export default Login;
