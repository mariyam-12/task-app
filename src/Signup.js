import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.style.css";

const Signup = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee 1");
  const navigate = useNavigate();

  const handleSignUp = () => {
    const newUser = { email, password, role };
    onSignUp(newUser);
    navigate('/login'); 
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Manager">Manager</option>
        <option value="Employee 1">Employee 1</option>
        <option value="Employee 2">Employee 2</option>
      </select>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default Signup;
