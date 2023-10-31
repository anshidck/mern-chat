import { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import { fetchUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { fetchChats } from "../features/chat/chatSlice";
import UserBadgeItem from "./UserBadgeItem";
import { createGroup } from "../features/chat/chatSlice";

function Grouplist({ setOpen }) {
  const [groupName, setGroupName] = useState('')
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser({ search }));
  }, [dispatch, search]);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      dispatch(fetchChats(search));
    } catch (error) {
      console.log(error);
    }
  };

  const handlegroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User Already Exist");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = () => {

    if (!groupName || !selectedUsers) {
      toast.error('please fill all field')
      return;
    }

    if (selectedUsers.length < 3 ) {
      toast.error('More than 2 users are required to form a group chat')
      return;
    }

    try {
      dispatch(createGroup({ name: groupName,  users: JSON.stringify(selectedUsers.map((u) => u._id)) }));
      setSelectedUsers([])
      setOpen(false)
    } catch (error) {
      toast.success('New Group chat created')
    }
    
 
   
  }


  return (
    <div className="w-[97vw] h-[190vh] fixed top-10 flex justify-center">
      <div className="bg-white p-[20px] absolute w-[40%] h-[60%] flex flex-col gap-3 ">
        <RxCrossCircled
          size={25}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full outline-none"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <input
            className="p-2 border-2 border-gray-500 rounded w-full outline-none"
            type="text"
            placeholder="Search By Name"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="border border-gray-200"></div>
          <div className="flex w-full gap-4">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handlefunction={() => handleDelete(u)}
              />
            ))}
          </div>
          <div>
            {users?.slice(0, 4).map((user) => (
              <UsersList
                key={user._id}
                user={user}
                handlefunction={() => handlegroup(user)}
              />
            ))}
          </div>
          <button className="bg-black text-white w-full p-2 rounded" onClick={handleSubmit}>
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default Grouplist;
