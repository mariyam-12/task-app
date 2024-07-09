import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.style.css";

const Login = ({ users, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      onLogin(user);
      navigate('/todo');  
    } else {
      setErrorMessage("Invalid email or password. No account? ");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {errorMessage && (
        <p className="error-message">
          {errorMessage}
          <Link to="/signup">Sign Up</Link>
        </p>
      )}
    </div>
  );
};

export default Login;
