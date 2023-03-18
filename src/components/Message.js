import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Message = ({ message, showImage }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const ref = useRef();
  const handleClick = (e) => {
    showImage(e.target.currentSrc);
  };

  var currentDate = Math.abs((new Date().getTime() / 1000).toFixed(0));
  var pastDate = message.date.seconds;
  var diff = currentDate - pastDate;
  var days = Math.floor(diff / 86400);
  var hours = Math.floor(diff / 3600);
  var minutes = Math.floor(diff / 60);
  var seconds = diff;
  var text = "";
  if (seconds < 60) {
    text = "Just Now";
  } else if (minutes < 60) {
    text = minutes + "m";
  } else if (hours < 24) {
    text = hours + "h";
  } else if (days < 365) {
    text = days + "d";
  }
  if (days > 365) {
    text = new Date(pastDate * 1000);
  }

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser.uid ? "owner" : null
      }`}
    >
      <div className="messageInfo">
        {" "}
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="profile"
        />{" "}
        <span>{text}</span>
      </div>
      <div className="messageContent">
        {message.text.length > 0 && <p>{message.text} </p>}
        {message.img && (
          <img
            src={message.img}
            className="image"
            alt="profile"
            onClick={(e) => handleClick(e)}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
