import { BsPersonCircle } from "react-icons/bs";

function UsersList({ user, handlefunction }) {
  return (
    <div className='w-full h-[50px] bg-gray-300 flex gap-3 items-center rounded p-4 my-2' onClick={handlefunction}>
        <BsPersonCircle size={29}/>
        <div>
            <h1 className="font-bold text-xl">{user.name}</h1>
            <p className="text-[12px]">{user.email}</p>
        </div>
    </div>
  )
}

export default UsersList