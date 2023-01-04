import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
const Sidebar = ({ selectHandler, className }) => {
  return (
    <div className={`sidebar ${className}`}>
      <Navbar />
      <Search />
      <Chats handleSelectChat={selectHandler} />
    </div>
  );
};

export default Sidebar;
