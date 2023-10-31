import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUser } from "../features/auth/authSlice";
import UsersList from "./UsersList";
import { createChat } from "../features/chat/chatSlice";
import Spinner from "./Spinner";
import ScrollableFeed from "react-scrollable-feed";

function Sidebar() {
  const { users, isLoading } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser({ search }));
  }, [dispatch, search]);

  const handleClick = () => {
    if (!search) {
      toast.error("Search Something");
    } else {
      try {
        dispatch(fetchUser(search));
      } catch (error) {
        toast.error("No such user found");
      }
    }
  };

  const handlefunction = (userId) => {
    try {
      dispatch(createChat({ userId }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white w-full md:w-[30%] p-4 border-2 border-gray-600">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">Search user</h1>
        <div className="border border-gray-300"></div>
        <div className="flex gap-3">
          <input
            className="p-2 border-2 border-gray-500 rounded w-full outline-none"
            type="text"
            placeholder="Search By Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-gray-500 text-white font-bold px-3 rounded"
            onClick={handleClick}
          >
            Go
          </button>
        </div>
        <div className="h-full">
          <ScrollableFeed className="flex flex-col">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {Array.isArray(users) &&
                  users.map((user) => (
                    <UsersList
                      key={user._id}
                      user={user}
                      handlefunction={() => handlefunction(user._id)}
                    />
                  ))}
              </>
            )}
          </ScrollableFeed>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
