import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

function ProfilView({ setOpen, chat }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-[100vw] h-[110vh] fixed top-0 left-0 flex justify-center items-center">
      <div className="bg-gray-300 p-[20px] absolute w-[40%] h-[30%] flex flex-col gap-3  ">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
          <h1 className="font-bold text-2xl">view</h1>
          <RxCrossCircled
          size={25}
          className="rClose"
          onClick={() => setOpen(false)}
        />
          </div>
          <div className="border border-gray-200"></div>
          <h1 className="text-2xl">
            Name: {chat && chat.users && chat.users.length > 0 && (
              <>
                {user && chat.users[0]._id === user._id
                  ? chat.users[1].name
                  : chat.users[0].name}
              </>
            )}
          </h1>
          <h2>Email: {chat && chat.users && chat.users.length > 0 && (
              <>
                {user && chat.users[0]._id === user._id
                  ? chat.users[1].email
                  : chat.users[0].email}
              </>
            )}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProfilView;
