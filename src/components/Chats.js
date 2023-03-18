import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = ({ handleSelectChat }) => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    handleSelectChat();
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="profile" />
              <div className="userChatInfo">
                <div>
                  {chat[1]?.unseen > 0 ? (
                    <span style={{ color: "#00b181" }}>
                      {chat[1].userInfo.displayName}
                    </span>
                  ) : (
                    <span>{chat[1].userInfo?.displayName}</span>
                  )}
                  {chat[1].lastMessage?.text.length >= 27 ? (
                    <p>{chat[1].lastMessage?.text.slice(0, 27)}...</p>
                  ) : (
                    <p>{chat[1].lastMessage?.text}</p>
                  )}
                </div>
                {chat[1]?.unseen > 0 && (
                  <div className="unseenMsgs">
                    <p>{chat[1].unseen}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
