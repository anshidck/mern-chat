import { useState, useEffect } from "react";
import { BiArrowBack, BiShowAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import ProfilView from "./ProfilView";
import Updategroup from "./Updategroup";
import { toast } from "react-toastify";
import ScrollableFeed from "react-scrollable-feed";
import { fetchMessages, createMessage } from "../features/message/messageSlice";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

function Chatbox({ chat, setChat }) {
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState("");

  const typinghandler = (e) => {
    setNewMessage(e.target.value);
  };

  const fetchUserMessage = () => {
    if (!chat) return;

    try {
      dispatch(fetchMessages(chat._id));
      socket.emit("join chat", chat._id);
    } catch (error) {
      toast.error('Error occurred')
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      try {
        dispatch(
          createMessage({
            content: newMessage,
            chatId: chat,
          })
        );
        socket.emit("new message", messages);
        setNewMessage("");
      } catch (error) {
        toast.error("Message not created");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchUserMessage();
    selectedChatCompare = chat;
    // eslint-disable-next-line
  }, [chat]);


 

  return (
    <div className=" bg-white h-screen w-full p-4 border-2 border-gray-600">
      <div className="flex-col">
        <div className="flex justify-between items-center">
          <BiArrowBack
            className="md:hidden"
            size={25}
            onClick={() => setChat("")}
          />
          <h1 className="text-2xl font-bold">
            {chat && chat.isGroupChat ? (
              chat.chatName
            ) : (
              <>
                {chat && chat.users && chat.users.length > 0 && (
                  <>
                    {user && chat.users[0]._id === user._id
                      ? chat.users[1].name
                      : chat.users[0].name}
                  </>
                )}
              </>
            )}
          </h1>
          <div>
            {chat && chat.isGroupChat ? (
              <BiShowAlt size={25} onClick={() => setUpdateOpen(!updateOpen)} />
            ) : (
              <BiShowAlt size={25} onClick={() => setOpen(!open)} />
            )}
          </div>
        </div>
        <div className="border border-gray-300 mt-3"></div>
        <div className="flex flex-col justify-center items-center">
          {chat ? (
            <>
              <div className="w-full h-[500px] md:h-[550px] flex flex-col justify-end gap-3">
                <ScrollableFeed className="flex flex-col gap-2 p-2 w-full">
                  {messages &&
                    messages.map((message, index) => (
                      <p
                        className={`${
                          message.sender._id === user._id
                            ? "ml-auto text-white bg-green-900"
                            : " text-white bg-black"
                        }  p-2 rounded`}
                        style={{ width: `${message.content.length * 13}px` }}
                        key={index}
                      >
                        {message.content}
                      </p>
                    ))}
                </ScrollableFeed>
                <form className="w-full flex gap-1" onSubmit={sendMessage}>
                  <input
                    type="text"
                    className="border-2 border-gray-500 rounded w-full py-2 px-2"
                    onChange={typinghandler}
                    value={newMessage}
                  />
                  <button
                    className="bg-black text-white p-2 rounded"
                    type="submit"
                  >
                    send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-lg mt-48">
              Click on a user to start chatting
            </h1>
          )}
        </div>
        {open && <ProfilView chat={chat} setOpen={setOpen} />}
        {updateOpen && (
          <Updategroup
            chat={chat}
            setChat={setChat}
            setUpdate={setUpdateOpen}
          />
        )}
      </div>
    </div>
  );
}

export default Chatbox;
