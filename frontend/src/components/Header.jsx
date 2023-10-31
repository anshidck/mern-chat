import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from "../features/auth/authSlice";

function Header({handleNav, nav}) {
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
  return (
    <div className="bg-white border-2 border-gray-600 h-[10%] rounded w-full flex justify-between p-3  items-center">
      <button className="hidden md:flex items-center text-base gap-1 text-white bg-gray-700 p-2 rounded font-bold hover:bg-gray-500" onClick={handleNav}>
        <AiOutlineSearch size={23} /> {nav ? `Search User` : `Search Chats`}
      </button>
      <button className="flex md:hidden py-2 px-1 items-center text-xs text-white bg-gray-700 rounded font-bold hover:bg-gray-500" onClick={handleNav}>
        <AiOutlineSearch size={15} /> {nav ? `Search User` : `Search Chats`}
      </button>
      <h1 className=" md:text-2xl font-bold">Mern-Chat</h1>
      <div className="flex gap-3 ">
        <button className="hidden md:flex items-center">
          <MdNotifications size={23} />
        </button>
        <button className="hidden md:flex gap-2 bg-gray-700 p-2 rounded text-white hover:bg-gray-500" onClick={logoutHandler}>
          <BsPersonCircle size={23} /> {user && user.name}
        </button>
        <button className="flex items-center text-xs gap-2 bg-gray-700 p-2 rounded text-white hover:bg-gray-500 md:hidden" onClick={logoutHandler}>
          <BsPersonCircle size={16} /> {user && user.name}
        </button>
      </div>
    </div>
  );
}

export default Header;
