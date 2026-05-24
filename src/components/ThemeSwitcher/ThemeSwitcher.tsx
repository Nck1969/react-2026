import { memo, useEffect, useRef } from 'react';
import { useTheme } from '../../context/useTheme.ts';
import classes from './ThemeSwitcher.module.css';
import moonIcon from '../../assets/moon.svg';
import sunIcon from '../../assets/sun2.svg';
import clsx from 'clsx';

const ThemeSwitcher = memo(() => {
  const isMounted = useRef(false);
  const { toggleTheme, isDarkMode } = useTheme();

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <button className={classes.switcher} onClick={toggleTheme}>
      <img src={sunIcon} alt="dark theme" />
      <img src={moonIcon} alt="dark theme" />
      <div
        className={clsx(
          classes.activeIndicator,
          !isDarkMode ? classes.leftPosition : classes.rightPosition,
          isMounted.current
            ? isDarkMode
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
