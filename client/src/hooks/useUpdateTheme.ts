import { useEffect } from 'react';

// Update isLightTheme in local storage and ui accordingly
export default function useUpdateTheme(isLightTheme: boolean) {
  useEffect(() => {
    const body = document.body;

    localStorage.setItem('isLightTheme', String(isLightTheme));

    if (isLightTheme) {
      body.classList.remove('dark');
    } else {
      body.classList.add('dark');
    }
  }, [isLightTheme]);
}
