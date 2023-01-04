import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  serverTimestamp,
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { GrAttachment } from "react-icons/gr";
import { BiImageAlt, BiImageAdd } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    if (data.user.uid + data.user.uid === data.chatId) {
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } else {
      console.log("incrementing unseen by 1");
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".unseen"]: increment(1),
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
    setText("");
    setImg(null);
  };
  const changeImage = (e) => {
    setImg(e.target.files[0]);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Message"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          name="file"
          style={{ display: "none" }}
          disabled={img}
          id="file"
          onChange={(e) => changeImage(e)}
        />
        <label htmlFor="file">
          {img ? (
            <BiImageAdd className="icon addedImg" />
          ) : (
            <BiImageAlt className="icon addImg" />
          )}
        </label>

        <GrAttachment className="icon" />

        <button type="submit" onClick={handleSend}>
          SEND
        </button>
      </div>
    </div>
  );
};

export default Input;
