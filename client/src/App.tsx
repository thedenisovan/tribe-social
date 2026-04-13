import { Outlet } from 'react-router';
import { useState } from 'react';
import ThemeContext from './context/ThemeContext';
import useUpdateTheme from './hooks/useUpdateTheme';

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(
    // If local storage contains theme variable set state to it
    (localStorage.isLightTheme && JSON.parse(localStorage.isLightTheme)) ||
      false,
  );

  // Hook to update theme ui and isLightTheme localstorage
  // value based on isLightTheme state
  useUpdateTheme(isLightTheme);

  return (
    <>
      <ThemeContext value={{ isLightTheme, setIsLightTheme }}>
        <button
          onClick={() => {
            // updateLocalTheme(isLightTheme);
            setIsLightTheme(!isLightTheme);
          }}
        >
          click
        </button>
        <Outlet />
      </ThemeContext>
    </>
  );
}
