import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';
import moonIcon from '../../assets/moon.svg';
import sunIcon from '../../assets/sun.svg';
import { useTheme } from '../../context/useTheme.ts';
import classes from './ThemeSwitcher.module.css';

const ThemeSwitcher = memo(() => {
  const isMounted = useRef(false);
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <button className={classes.switcher} onClick={toggleTheme}>
      <img src={sunIcon} alt="light theme" />
      <img src={moonIcon} alt="dark theme" />
      <div
        className={clsx(
          classes.activeIndicator,
          theme === 'light' ? classes.leftPosition : classes.rightPosition,
          isMounted.current
            ? theme === 'dark'
              ? classes.slideRight
              : classes.slideLeft
            : undefined
        )}
      ></div>
    </button>
  );
});
ThemeSwitcher.displayName = 'ThemeSwitcher';

export { ThemeSwitcher };
