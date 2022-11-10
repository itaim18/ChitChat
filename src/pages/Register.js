import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../style.scss";
import { FcAddImage } from "react-icons/fc";
const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src={logo} alt="logo" />
          <h1>Chit Chat</h1>
        </span>
        <span className="title">Register:</span>
        <form action="">
          <input type="text" placeholder="name" name="" id="" />
          <input type="email" placeholder="email" name="" id="" />
          <input type="password" placeholder="password" name="" id="" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <FcAddImage
              style={{ fontSize: "34px", position: "relative", top: "10px" }}
            />{" "}
            uplaod profile picture
          </label>
          <button type="submit">sign up</button>
        </form>
        <p>
          Do you have an account? <Link to="/login">sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
