import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../style.scss";
const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src={logo} alt="logo" />
          <h1>Chit Chat</h1>
        </span>
        <span className="title">Login:</span>
        <form action="">
          <input type="email" placeholder="email" name="" id="" />
          <input type="password" placeholder="password" name="" id="" />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't an account? <Link to="/">sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
