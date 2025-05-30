import React from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <div 
      className={`${styles.toggleTrack} ${isDark ? styles.dark : styles.light}`} 
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }} // Allow keyboard activation
    >
      <div className={styles.iconContainer} style={{ marginRight: 'auto' }}> 
        <BsSunFill className={`${styles.icon} ${styles.sunIcon}`} />
      </div>
      
      <div className={`${styles.toggleThumb} ${isDark ? styles.dark : ''}`}>
        {/* Thumb is now empty, icons are in the track */}
      </div>

      <div className={styles.iconContainer} style={{ marginLeft: 'auto' }}>
        <BsMoonFill className={`${styles.icon} ${styles.moonIcon}`} />
      </div>
    </div>
  );
};

export default ThemeToggle;