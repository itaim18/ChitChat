import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../style.scss";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };
  const handleFillDemo = () => {
    setEmail("itai@gmail.com");
    setPassword("123456");
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src={logo} alt="logo" />
          <h1>Chit Chat</h1>
        </span>
        <span className="title">Login:</span>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email"
            value={email}
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            value={password}
          />

          <button type="submit">Login</button>
          <button onClick={handleFillDemo} className="demo">
            Login with Demo
          </button>
          {error && (
            <span style={{ color: "red" }}>Something went wrong...</span>
          )}
        </form>
        <p>
          Don't have an account? <Link to="/register">sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
