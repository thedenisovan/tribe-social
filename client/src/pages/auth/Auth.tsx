import Hero from './sections/Hero';
import { Outlet } from 'react-router';
import { useContext, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { DarkIcon, LightIcon } from '../../components/common/ThemedIcons';
import ICONS from '../../constants/icons';
import AuthSelector from './components/AuthSelector';

export default function Auth() {
  const themeContext = useContext(ThemeContext);
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);

  return (
    <>
      <title>Tribe Social | Homepage</title>
      <main className='flex min-w-screen min-h-screen'>
        <Hero />
        <section className='flex-1 p-6 transition-colors bg-neutral-50 dark:text-white dark:bg-(--purple-1000)'>
          <header className='flex justify-end'>
            <button
              className='border hover:bg-neutral-100 transition-colors dark:hover:bg-purple-900/70 border-neutral-200 dark:border-neutral-600 rounded-full p-3'
              onClick={() =>
                themeContext?.setIsLightTheme(!themeContext.isLightTheme)
              }
            >
              <LightIcon width='18' path={ICONS.sun} />
              <DarkIcon width='18' path={ICONS.moon} />
            </button>
          </header>
          <Outlet />
          <AuthSelector
            setIsSignupPage={setIsSignupPage}
            isSignupPage={isSignupPage}
          />
        </section>
      </main>
    </>
  );
}
