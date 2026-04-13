import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';

export default function AuthForm() {
  const themeContext = useContext(ThemeContext);

  return (
    <section className='flex-1 z-10 bg-red-400'>
      <div>
        <button
          onClick={() =>
            themeContext?.setIsLightTheme(!themeContext.isLightTheme)
          }
        >
          Theme
        </button>
      </div>
      <div>
        <h2>Welcome</h2>
        <p>Create Account</p>
      </div>
    </section>
  );
}
