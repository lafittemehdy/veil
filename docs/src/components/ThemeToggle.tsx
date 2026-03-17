/** Light/dark theme toggle switch component. */
import type { FC, KeyboardEvent } from 'react';
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

  /** Triggers toggle on Enter or Space key press for keyboard accessibility. */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onToggle();
    }
  };

  return (
    <div
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`${styles.toggleTrack} ${isDark ? styles.dark : styles.light}`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="switch"
      tabIndex={0}
    >
      <div className={`${styles.iconContainer} ${styles.iconLeft}`}>
        <BsSunFill className={`${styles.icon} ${styles.sunIcon}`} />
      </div>

      <div className={`${styles.toggleThumb} ${isDark ? styles.dark : ''}`} />

      <div className={`${styles.iconContainer} ${styles.iconRight}`}>
        <BsMoonFill className={`${styles.icon} ${styles.moonIcon}`} />
      </div>
    </div>
  );
};

export default ThemeToggle;
