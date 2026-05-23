import { createContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: VoidFunction;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
