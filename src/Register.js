import React, { useState } from "react";
import axios from "axios";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    try {
      await axios.post("http://localhost:5000/api/signup", { name, email, password });
      setSuccess("Registration successful! You can now login.");
      setName("");
      setEmail("");
      setPassword("");
      if (onRegister) onRegister();
    } catch (err) {
      setRegisterError(err.response?.data?.error || "Registration failed!");
      setSuccess("");
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-box">
        <h2>Register</h2>
        <p className="auth-subtitle">Create your account to continue</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-btn">Register</button>
          {registerError && <div className="auth-error">{registerError}</div>}
          {success && <div className="auth-success">{success}</div>}
        </form>
      </div>
    </div>
  );
}

export default Register;
