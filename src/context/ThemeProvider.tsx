import { type PropsWithChildren, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { THEME_KEY } from '../constants/storage.ts';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);

    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    setDarkMode((mode) => !mode);
  };

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
