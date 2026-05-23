import { memo } from 'react';
import { useTheme } from '../../context/useTheme.ts';
import classes from './ThemeSwitcher.module.css';
import moonIcon from '../../assets/moon.svg';
import sunIcon from '../../assets/sun2.svg';
import clsx from 'clsx';

const ThemeSwitcher = memo(() => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <button className={classes.switcher} onClick={toggleTheme}>
      <img src={sunIcon} alt="dark theme" />
      <img src={moonIcon} alt="dark theme" />
      <div
        className={clsx(
          classes.activeIndicator,
          isDarkMode ? classes.slideLeft : classes.slideRight
        )}
      ></div>
    </button>
  );
});
ThemeSwitcher.displayName = 'ThemeSwitcher';

export { ThemeSwitcher };
