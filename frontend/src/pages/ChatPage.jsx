import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Mychats from "../components/Mychats";
import Chatbox from "../components/Chatbox";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const [nav, setNav] = useState(true);
  const [chat, setChat] = useState();

  const { user } = useSelector((state) => state.auth);
  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex flex-col gap-2 p-2 h-screen max-h-screen">
      <Header handleNav={handleNav} nav={nav} />
      <div className="w-full flex gap-2 h-screen">
        {nav ? (
          <Mychats chat={chat} setChat={setChat} />
        ) : (
          <Sidebar nav={nav} />
        )}
        <div className={`${chat ? "flex" : "hidden  md:flex"} w-full`}>
          <Chatbox chat={chat} setChat={setChat} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
