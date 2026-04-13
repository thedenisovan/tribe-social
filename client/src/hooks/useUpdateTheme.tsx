import { useEffect } from 'react';

export default function useUpdateTheme(isLightTheme: boolean) {
  useEffect(() => {
    // Update ui & localstorage based on theme state boolean value
    const updateTheme = () => {
      const body = document.querySelector('body');

      if (isLightTheme) {
        localStorage.setItem('isLightTheme', 'true');
        body?.classList.remove('dark');
      } else {
        localStorage.removeItem('isLightTheme');
        body?.classList.add('dark');
      }
    };

    updateTheme();
  }, [isLightTheme]);
}
