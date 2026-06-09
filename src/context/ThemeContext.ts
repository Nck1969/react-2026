import { createContext } from 'react';
import type { Theme } from '../constants/theme.ts';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: VoidFunction;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
