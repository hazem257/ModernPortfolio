// components/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // مثال بسيط للتحقق من بيانات الدخول
    if (username === "admin" && password === "1234") {
      localStorage.setItem("token", "loggedin");
      setIsLoggedIn(true);
      navigate("/Admin-Dash");
    } else {
      alert("خطأ في بيانات الدخول");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin} style={{ display: "inline-block", marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
