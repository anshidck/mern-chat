import { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import UserBadgeItem from "./UserBadgeItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  removeFromGroup,
  updateAddUser,
  updateRename,
} from "../features/chat/chatSlice";
import { fetchUser } from "../features/auth/authSlice";
import UsersList from "./UsersList";
import { toast } from "react-toastify";

function Updategroup({ setUpdate, chat }) {
  const { users, user } = useSelector((state) => state.auth);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      dispatch(fetchChats(search));
    } catch (error) {
      toast.success("chats created");
    }
  };

  const handleRename = () => {
    if (!groupName) return;

    try {
      dispatch(
        updateRename({
          chatId: chat._id,
          chatName: groupName,
        })
      );
      dispatch(fetchChats());
      toast.success('name updated')
    } catch (error) {
      toast.error("name Not changed");
    }
  };

  const handleAddUser = async (user1) => {
    if (chat.users.find((u) => u._id === user1._id)) {
      toast.error("user already exist");
      return;
    }

    if (chat.groupAdmin._id !== user._id) {
      toast.error("Only admins can Added");
      return;
    }

    try {
      dispatch(
        updateAddUser({
          chatId: chat._id,
          userId: user1._id,
        })
      );
      dispatch(fetchChats());
    } catch (error) {
      toast.error("error occured");
    }
    setGroupName("");
  };
  const handleRemove = async (user1) => {
    if (chat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error('only admin can add some one')
      return;
    }

    try { 
     dispatch(removeFromGroup({
      chatId: chat._id,
      userId: user1._id,
    }))
    dispatch(fetchChats());
    } catch (error) {
      toast.error('error occurred')
    }
  };

  
  useEffect(() => {
    dispatch(fetchUser({ search }));
  }, [dispatch, search]);
  return (
    <div className="w-full md:w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center">
      <div className="bg-gray-300 p-[20px] absolute md:w-[40%] h-[80%] flex flex-col gap-3  ">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl">Update Group</h1>
            <RxCrossCircled
              size={25}
              className="rClose"
              onClick={() => setUpdate(false)}
            />
          </div>
          <div className="border border-gray-200"></div>
          <div className="flex">
            {chat &&
              chat.users &&
              chat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handlefunction={() => handleRemove(u)}
                />
              ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full outline-none"
              placeholder="Rename Group"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button
              className="bg-black text-white rounded text-sm p-2"
              onClick={handleRename}
            >
              Rename
            </button>
          </div>
          <input
            className="p-2 border-2 border-gray-500 rounded w-full outline-none"
            type="text"
            placeholder="Search By Name"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div>
            {users &&
              users
                ?.slice(0, 3)
                .map((user) => (
                  <UsersList
                    key={user._id}
                    user={user}
                    handlefunction={() => handleAddUser(user)}
                  />
                ))}
          </div>
          <button
            className="bg-red-500 text-white w-full p-2 rounded"
            onClick={() => handleRemove(user)}
          >
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default Updategroup;
