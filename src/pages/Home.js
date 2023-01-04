import React, { useState } from "react";
import "../style.scss";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
const Home = () => {
  const [hideImage, setHideImage] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const onSelectChat = () => {
    setShowChat(true);
  };
  const handleClick = (e) => {
    if (e.target.classList.value === "image") {
      setHideImage(false);
    } else if (e.target.classList.value !== "image") {
      setHideImage(true);
    }
  };

  return (
    <div className="home">
      <div className="container" onClick={handleClick}>
        <Sidebar
          className={`${showChat ? "hide" : null}`}
          selectHandler={onSelectChat}
        />
        <Chat
          hide={hideImage}
          onHideChat={() => setShowChat(false)}
          className={`${showChat ? null : "hide"}`}
          showChat={showChat}
        />
      </div>
    </div>
  );
};

export default Home;
