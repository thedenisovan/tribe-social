import DashContext from '../../context/DashContext';
import ThemeContext from '../../context/ThemeContext';
import useTokenVerify from '../../hooks/useTokenVerify';
import * as logo from '../../pages/auth/components/Logo';
import { useContext } from 'react';
import * as theme from '../common/ThemeIcons';
import ICONS from '../../constants/icons';
import UserBubble from '../common/UserBubble';
import { Link } from 'react-router';

export default function Header() {
  useTokenVerify();
  const dashContext = useContext(DashContext);
  const themeContext = useContext(ThemeContext);

  return (
    <header className='sticky top-0 z-100000 bg-theme py-2! px-2 md:py-0! flex items-center border-b border-b-neutral-300 dark:border-b-neutral-700 justify-between'>
      <div className='flex items-center gap-3 md:gap-10'>
        <div className='flex items-center'>
          <div className='w-10 md:w-18'>
            <logo.DarkLogo></logo.DarkLogo>
            <logo.LightLogo></logo.LightLogo>
          </div>
          <h1 className='hidden md:block font-bubblegum font-bold text-xl md:text-3xl tracking-widest'>
            TRIBE
          </h1>
        </div>
        <p className='dark:text-[#B7B7B7] text-[#666666] font-bold text-sm md:text-sm '>
          dashboard /{document.title.split('|')[1]}
        </p>
      </div>
      <div className='flex gap-3 items-center'>
        <button
          className='header-button cursor-pointer'
          onClick={() =>
            themeContext?.setIsLightTheme(!themeContext.isLightTheme)
          }
        >
          <theme.DarkIcon fill='#666666' path={ICONS.moon}></theme.DarkIcon>
          <theme.LightIcon fill='#999999' path={ICONS.sun}></theme.LightIcon>
        </button>
        <div className='flex gap-1 md:gap-5 items-center font-bold text-xs md:text-sm'>
          <UserBubble />
          <div className='flex gap-1'>
            <p className='hidden md:block lg:text-lg'>
              {dashContext?.decoded.user.firstName}
            </p>
            <p className='hidden md:block lg:text-lg'>
              {dashContext?.decoded.user.lastName}
            </p>
          </div>
          <Link
            to={'/'}
            className='header-button'
            onClick={() => {
              localStorage.clear();
            }}
          >
            <theme.LightIcon
              fill='#999999'
              path='M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z'
            />
            <theme.DarkIcon
              fill='#666666'
              path='M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z'
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
