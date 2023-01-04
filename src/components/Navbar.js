import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.png";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">
        <img src={logo} alt="logo" width={40} />
        <p>chit chat</p>
      </span>

      <div className="user">
        {currentUser.photoURL ? (
          <img src={currentUser.photoURL} alt="head" />
        ) : (
          <img
            src="https://static.thenounproject.com/png/638636-200.png"
            alt="head"
          />
        )}

        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
