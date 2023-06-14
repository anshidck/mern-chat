import { RxCross1 } from 'react-icons/rx'

function UserBadgeItem({user, handlefunction}) {
  return (
    <div className='bg-black text-white mx-1 p-1 rounded flex items-center justify-center gap-2 cursor-pointer font-semibold'>
        {user.name} <RxCross1 onClick={handlefunction} /></div>
  )
}

export default UserBadgeItem