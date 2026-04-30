import { LightIcon, DarkIcon } from '../common/ThemeIcons';
import { Link } from 'react-router';
import { useContext } from 'react';
import { CurrentPageContext } from '../../context/DashContext';

export default function Sidebar() {
  const currentPageContext = useContext(CurrentPageContext);
  const currentPageStyle = (pageName: string) =>
    currentPageContext?.currentPage === pageName
      ? 'dark:bg-purple-900/40 bg-purple-900/10'
      : '';

  return (
    <aside className='h-full lg:w-50 fixed border-r p-4 dark:border-neutral-800 border-neutral-200'>
      <nav>
        <ul className='flex flex-col gap-7'>
          <li
            className={`hover:dark:bg-purple-900/40 p-1 hover:bg-purple-900/10 rounded-lg ${currentPageStyle('Home')}`}
            onClick={() => currentPageContext?.setCurrentPage('Home')}
          >
            <Link className='flex items-center gap-2' to={'/dashboard/home'}>
              <NavIcons path='M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z' />
              <p className='font-medium hidden md:block text-neutral-600 dark:text-neutral-300/90'>
                Home
              </p>
            </Link>
          </li>
          <li
            className={`hover:dark:bg-purple-900/40 p-1 hover:bg-purple-900/10 rounded-lg ${currentPageStyle('Discover')}`}
            onClick={() => currentPageContext?.setCurrentPage('Discover')}
          >
            <Link
              className='flex items-center gap-2'
              to={'/dashboard/discover'}
            >
              <NavIcons path='m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z' />
              <p className='hidden font-medium md:block text-neutral-600 dark:text-neutral-300/90'>
                Discover
              </p>
            </Link>{' '}
          </li>{' '}
          <li
            className={`hover:dark:bg-purple-900/40 p-1 hover:bg-purple-900/10 rounded-lg ${currentPageStyle('Profile')}`}
            onClick={() => currentPageContext?.setCurrentPage('Profile')}
          >
            <Link className='flex items-center gap-2' to={'/dashboard/profile'}>
              <NavIcons path='M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z' />
              <p className='font-medium hidden md:block text-neutral-600 dark:text-neutral-300/90'>
                Profile
              </p>
            </Link>
          </li>
          <li
            className={`hover:dark:bg-purple-900/40 p-1 hover:bg-purple-900/10 rounded-lg ${currentPageStyle('Settings')}`}
            onClick={() => currentPageContext?.setCurrentPage('Settings')}
          >
            <Link
              className='flex items-center gap-2'
              to={'/dashboard/settings'}
            >
              <NavIcons path='m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z' />
              <p className='font-medium hidden md:block text-neutral-600 dark:text-neutral-300/90'>
                Settings
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function NavIcons({ path }: { path: string }) {
  return (
    <>
      <LightIcon width='25' fill='#999999' path={path} />
      <DarkIcon width='25' fill='#999999' path={path} />
    </>
  );
}
