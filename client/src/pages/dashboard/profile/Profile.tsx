import { useEffect } from 'react';
import { useContext } from 'react';
import DashContext from '../../../context/DashContext';
import { LightIcon, DarkIcon } from '../../../components/common/ThemeIcons';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';

export default function Discover() {
  const dashContext = useContext(DashContext);

  useEffect(() => {
    document.title = 'Tribe Social | Profile';
  });

  useSetCurrentPage('Profile');

  return (
    <main>
      <header className='bg-linear-to-br from-purple-900 to-purple-700 h-34 relative profile-header-w'>
        <div className='absolute flex justify-center h-25 w-25 -bottom-8 left-5 border-4 border-white dark:border-black rounded-full p-3 bg-linear-to-bl from-purple-600 to-purple-400 '>
          <p className='text-4xl flex items-center font-bold text-white'>
            {dashContext?.decoded.user.firstName[0].toUpperCase()}
          </p>
          <p className='text-4xl flex items-center font-bold text-white'>
            {dashContext?.decoded.user.lastName[0].toUpperCase()}
          </p>
        </div>
      </header>
      <section className='mt-10! pl-6'>
        <div className='flex gap-2 font-medium'>
          <p className=' flex items-center'>
            {dashContext?.decoded.user.firstName}
          </p>
          <p className=' flex items-center'>
            {dashContext?.decoded.user.lastName}
          </p>
        </div>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          @{dashContext?.decoded.user.email}
        </p>
        <p className='pt-2 text-sm'>{dashContext?.decoded.user.bio || ''}</p>
        <div className='flex items-center gap-1'>
          <DarkIcon
            fill='#666666'
            width='18'
            path='M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z'
          />
          <LightIcon
            fill='#666666'
            width='18'
            path='M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z'
          />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            Joined{' '}
            {
              dashContext?.decoded.user.registeredAt
                ?.split('T')[0]
                .split('-')[0]
            }
            /
            {
              dashContext?.decoded.user.registeredAt
                ?.split('T')[0]
                .split('-')[1]
            }
          </p>
        </div>
      </section>
    </main>
  );
}
