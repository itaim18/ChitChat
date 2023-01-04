import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IoIosClose } from "react-icons/io";
import defaultIcon from "../assets/chat-computer.png";
import Message from "./Message";
const Messages = ({ hide, showChat }) => {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const kof = () => {
    setTimeout(async () => {
      if (
        (detectMob() &&
          showChat &&
          data.chatId.includes(currentUser.uid) &&
          data.chatId !== "null" &&
          currentUser.uid) ||
        (!detectMob() &&
          data.chatId.includes(currentUser.uid) &&
          data.chatId !== "null" &&
          currentUser.uid)
      ) {
        console.log("change seen - kof");
        const transChatRef = doc(db, "userChats", currentUser.uid);
        await updateDoc(transChatRef, {
          [data.chatId + ".unseen"]: 0,
        });
      }
    }, 500);
  };
  kof();
  useEffect(() => {
    const chatRef = doc(db, "chats", data.chatId);

    const unsub = onSnapshot(chatRef, async (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
      kof();
    };
  }, [data.chatId, data.user.uid, currentUser.uid]);
  const showImage = (src) => {
    setImage(src);
  };
  function detectMob() {
    return window.innerWidth <= 500 && window.innerHeight <= 1000;
  }

  if (data.chatId === "null") {
    return (
      <div className="messages">
        <div className="defaultScreen">
          <img src={defaultIcon} alt="default" className="defaultIcon" />
          <h1>chit chat</h1>
          <p>
            look for your contact by his username. <br />
            choose him and start Sending texts, images or both... <br />
            receive messages back as well!
          </p>
        </div>
      </div>
    );
  }
  if (image && !hide) {
    return (
      <>
        <div
          className="messages"
          style={{ background: "rgba(9, 45, 56, 0.5)" }}
        >
          <div className="imageForm">
            <IoIosClose className="closeIcon" onClick={() => setImage(null)} />

            <img src={image} className="image" alt="zoomedImage" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} showImage={showImage} />
      ))}
    </div>
  );
};

export default Messages;
