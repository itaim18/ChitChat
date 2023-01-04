import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import logo from "../assets/logo.png";
import "../style.scss";
import { FcAddImage } from "react-icons/fc";
const Register = () => {
  // const navigate = useNavigate();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName =
      e.target[0].value.charAt(0).toUpperCase() + e.target[0].value.slice(1);
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
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
        <span className="title">Register:</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <FcAddImage
              style={{ fontSize: "34px", position: "relative", top: "10px" }}
            />{" "}
            upload profile picture
          </label>
          <button type="submit">sign up</button>
          {error && (
            <span style={{ color: "red" }}>Something went wrong...</span>
          )}
        </form>
        <p>
          Do you have an account? <Link to="/login">sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
