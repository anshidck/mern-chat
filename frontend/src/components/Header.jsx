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
    <div className="bg-white border-2 border-gray-600 h-[60px] rounded w-full flex justify-between p-3  items-center">
      <button className="flex items-center gap-1 bg-gray-400 p-2 rounded font-bold hover:bg-gray-300" onClick={handleNav}>
        <AiOutlineSearch size={23} /> {nav ? `Search User` : `Search Chats`}
      </button>
      <h1 className="text-2xl font-semibold">Mern-Chat</h1>
      <div className="flex gap-3 mr-5">
        <button>
          <MdNotifications size={23} />
        </button>
        <button className="flex gap-2 bg-gray-500 p-2 rounded text-white hover:bg-gray-300" onClick={logoutHandler}>
          <BsPersonCircle size={23} /> {user && user.name}
        </button>
      </div>
    </div>
  );
}

export default Header;
