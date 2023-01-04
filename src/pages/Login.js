import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../style.scss";
const Login = () => {
  // const navigate = useNavigate();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
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
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button type="submit">Login</button>
          {error && (
            <span style={{ color: "red" }}>Something went wrong...</span>
          )}
        </form>
        <p>
          Don't an account? <Link to="/register">sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
