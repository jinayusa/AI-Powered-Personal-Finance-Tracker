import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to home if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user_id);
      setUserId(response.data.user_id);
      navigate("/");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="button">
        Login
      </button>
    </div>
  );
};

export default Login;