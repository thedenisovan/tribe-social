import DashContext from '../../context/DashContext';
import { useContext } from 'react';

export default function UserBubble() {
  const dashContext = useContext(DashContext);
  const user = dashContext?.fullUser;

  return (
    <div className='flex  md:h-10 md:w-10 items-center justify-center bg-linear-to-br from-purple-500 to-pink-500 p-1 rounded-full '>
      <p className='text-sm text-white'>
        {user && user.firstName[0].toUpperCase()}
      </p>
      <p className='text-sm text-white'>
        {user && user.lastName[0].toUpperCase()}
      </p>
    </div>
  );
}
