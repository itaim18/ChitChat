import React from "react";
import "../style.scss";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/404.json";
const NotFound = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 200, height: 200 }}
        />
        <h2 style={{ color: "#006064" }}>Not Found</h2>
      </div>
    </div>
  );
};

export default NotFound;
