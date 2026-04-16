import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

export default function AuthSlider({
  isSignupPage,
  setIsSignupPage,
}: {
  isSignupPage: boolean;
  setIsSignupPage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const authContext = useContext(AuthContext);

  return (
    <div className='relative shadow-md dark:bg-purple-950/30  font-light text-center bg-neutral-100 p-1.5 rounded-2xl'>
      <div className='grid items-center grid-cols-2'>
        <button
          onClick={() => {
            setIsSignupPage(false);
            authContext?.resetForm();
            authContext?.resetFormErrors();
          }}
          className='cursor-pointer flex-1 dark:text-neutral-200'
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setIsSignupPage(true);
            authContext?.resetForm();
            authContext?.resetFormErrors();
          }}
          className='cursor-pointer flex-1 dark:text-neutral-200'
        >
          Sign Up
        </button>
      </div>

      <CurrentPage isSignupPage={isSignupPage} />
    </div>
  );
}

function CurrentPage({ isSignupPage }: { isSignupPage: boolean }) {
  return (
    <span
      style={{
        transform: `translateX(${isSignupPage ? '0%' : '-100%'})`,
      }}
      className='absolute top-0 bg-white/30 h-full w-[50%] transition-all duration-200 rounded-2xl border dark:bg-purple-800/20 dark:border-neutral-400/20 border-neutral-300'
    ></span>
  );
}
