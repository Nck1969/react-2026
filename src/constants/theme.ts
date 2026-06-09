const THEMES = ['dark', 'light'] as const;

export type Theme = (typeof THEMES)[number];

export const isTheme = (value: string | null): value is Theme =>
  value !== null && THEMES.includes(value as Theme);
