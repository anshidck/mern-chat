import { BiArrowBack, BiShowAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import ProfilView from "./ProfilView";
import Updategroup from "./Updategroup";
import { toast } from "react-toastify";
import ScrollableFeed from "react-scrollable-feed";
import { reset } from "../features/message/messageSlice";
import { fetchMessages, createMessage } from "../features/message/messageSlice";
import io from "socket.io-client";
import Scroll from "./Scroll";
import { useEffect, useState } from "react";
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
      toast.error("Error occurred");
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      try {
        dispatch(
          createMessage({
            content: newMessage,
            chatId: chat._id,
          })
        );
        socket.emit("new message",{ chat, sender: user, content: newMessage });
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
  
    return () => {
      socket.disconnect();
    };
  }, []);  

  useEffect(() => {
    fetchUserMessage();
    selectedChatCompare = chat;
    return () => {
      dispatch(reset());
    };
  }, [chat, dispatch]);

  return (
    <div className=" bg-white w-full h-[100vh] p-4 border-2 border-gray-600 overflow-hidden relative">
      <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center ">
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
        <div className="flex flex-col items-center w-full h-[90vh]">
          {chat ? (
            <>
              <div className="flex flex-col gap-1 overflow-hidden w-full h-[80vh]">
                <ScrollableFeed className="flex flex-col gap-2 md:p-2 w-full">
                  {messages &&
                    messages.map((message, index) => (
                      <p
                        className={`${
                          message.sender._id === user._id
                            ? "ml-auto text-white bg-green-900 min-w-[50px]"
                            : " text-white bg-black min-w-[60px]"
                        }  p-2 rounded`}
                        style={{ width: `${message.content.length * 13}px` }}
                        key={index}
                      >
                        {message.content}
                      </p>
                    ))}
                </ScrollableFeed>
                <form
                  className="w-full flex gap-1 absolute bottom-1 right-1 left-1"
                  onSubmit={sendMessage}
                >
                  <input
                    type="text"
                    className="border-2 border-gray-500 rounded w-[92%] py-2 px-2 "
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
