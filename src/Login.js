import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      // Your backend login route with JWT
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // If successful, the response contains { message, token, user }
      if (response.data.token) {
        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Call your existing onLogin with username/password (keep existing behavior)
        onLogin(email, password, response.data?.user);
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Login failed. Please check your credentials."
      );
    }
  }

  return (
    <div className="auth-modal">
      <div className="auth-box">
        <h2>Sign In</h2>
        <p className="auth-subtitle">Enter your credentials to continue</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-extra">
          Don't have an account? <span className="auth-link" onClick={() => onLogin(false, true)}>Create one</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
