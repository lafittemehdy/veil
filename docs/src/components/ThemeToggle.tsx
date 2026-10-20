/** Light/dark theme toggle switch component. */
import type { FC } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

import type { Theme } from '../types';
import styles from './ThemeToggle.module.css';

/** Props for the ThemeToggle component. */
interface ThemeToggleProps {
  /** Callback invoked when the user toggles the theme. */
  onToggle: () => void;
  /** The currently active theme. */
  theme: Theme;
}

/** Accessible toggle switch for light/dark theme selection. */
const ThemeToggle: FC<ThemeToggleProps> = ({ onToggle, theme }) => {
  const isDark = theme === 'dark';

  return (
    <button
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`${styles.toggleTrack} ${isDark ? styles.dark : styles.light}`}
      onClick={onToggle}
      role="switch"
      type="button"
    >
      <span className={`${styles.iconContainer} ${styles.iconLeft}`}>
        <BsSunFill className={`${styles.icon} ${styles.sunIcon}`} />
      </span>

      <span className={`${styles.toggleThumb} ${isDark ? styles.dark : ''}`} />

      <span className={`${styles.iconContainer} ${styles.iconRight}`}>
        <BsMoonFill className={`${styles.icon} ${styles.moonIcon}`} />
      </span>
    </button>
  );
};

export default ThemeToggle;
