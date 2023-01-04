import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AiFillVideoCamera, AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillPersonPlusFill, BsThreeDots } from "react-icons/bs";
import Messages from "./Messages";
import Input from "./Input";
const Chat = ({ hide, onHideChat, className, showChat }) => {
  const { data } = useContext(ChatContext);

  return (
    <div className={`chat ${className}`}>
      <div className="chatInfo">
        <span onClick={onHideChat}>
          <AiOutlineArrowLeft className="leftIcon" /> {data.user?.displayName}
        </span>
        <div className="chatIcons">
          <AiFillVideoCamera className="icon" />
          <BsFillPersonPlusFill className="icon" />
          <BsThreeDots className="icon" />
        </div>
      </div>

      <Messages hide={hide} showChat={showChat} />
      <Input />
    </div>
  );
};

export default Chat;
