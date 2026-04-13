import { createContext } from 'react';

type ThemeContextType = {
  isLightTheme: boolean;
  setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;
