import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grouplist from "./Grouplist";
import { fetchChats } from "../features/chat/chatSlice";
import ScrollableFeed from "react-scrollable-feed";

function Mychats({ setChat, chat }) {
  const [openModel, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch, chat]);

  return (
    <div
      className={`${
        chat ? "hidden md:block" : ""
      } bg-white w-full md:w-[30%] p-4 border-2 border-gray-600 rounded h-[100vh]`}
    >
      <div className="flex flex-col justify-between gap-3">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">My Chat</h1>
          <button
            className="bg-black text-white text-sm p-2 rounded"
            onClick={() => setOpen(!openModel)}
          >
            + New Gorup
          </button>
        </div>
        <div className="border border-gray-300"></div>
        <div className="flex flex-col gap-2 h-[80vh]  overflow-hidden">
          <ScrollableFeed className="flex flex-col gap-2 w-full ">
            {chats &&
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className="text-black bg-gray-300 rounded p-3 font-bold "
                  onClick={() => setChat(chat)}
                >
                  {chat.isGroupChat ? (
                    chat.chatName
                  ) : (
                    <>
                      {user && chat.users[0]._id === user._id
                        ? chat.users[1].name
                        : chat.users[0].name}
                    </>
                  )}
                </div>
              ))}
          </ScrollableFeed>
        </div>
        {openModel && <Grouplist setOpen={setOpen} />}
      </div>
    </div>
  );
}

export default Mychats;
