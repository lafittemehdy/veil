/** Root component for the react-veil demo application. */
import { useEffect, useState } from 'react';
import {
  ArchClip,
  RoundedLeftClip,
  RoundedRectangleClip,
} from 'react-veil';

import ThemeToggle from './components/ThemeToggle';
import type { Theme } from './types';

const VALID_THEMES = new Set<Theme>(['dark', 'light']);

/**
 * Resolves an asset path relative to the Vite base URL,
 * handling trailing/leading slash combinations.
 */
function getAssetUrl(assetName: string): string {
  if (!assetName) {
    throw new Error('getAssetUrl: assetName must be a non-empty string');
  }

  const baseUrl = import.meta.env.BASE_URL;

  if (baseUrl.endsWith('/') && assetName.startsWith('/')) {
    return `${baseUrl.slice(0, -1)}${assetName}`;
  }
  if (!baseUrl.endsWith('/') && !assetName.startsWith('/')) {
    return `${baseUrl}/${assetName}`;
  }

  return `${baseUrl}${assetName}`;
}

/** Reads the persisted theme from localStorage, falling back to 'dark'. */
function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem('app-theme');
    if (stored && VALID_THEMES.has(stored as Theme)) {
      return stored as Theme;
    }
  } catch {
    // localStorage may be unavailable (e.g. private browsing, storage quota)
  }
  return 'dark';
}

/** Demo application showcasing all react-veil clip components. */
function App() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);

    try {
      localStorage.setItem('app-theme', theme);
    } catch {
      // localStorage may be unavailable (e.g. private browsing, storage quota)
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-wrapper">
      <div className="theme-toggle-wrapper">
        <ThemeToggle onToggle={toggleTheme} theme={theme} />
      </div>

      <div className="container">
        <ArchClip>
          <video
            autoPlay
            loop
            muted
            playsInline
            src={getAssetUrl('01.mp4')}
          />
        </ArchClip>
      </div>

      <div className="container">
        <RoundedRectangleClip>
          <img alt="Rounded rectangle clipped image" src={getAssetUrl('02.jpg')} />
        </RoundedRectangleClip>
      </div>

      <div className="container">
        <RoundedLeftClip>
          <img alt="Rounded left clipped image" src={getAssetUrl('03.jpg')} />
        </RoundedLeftClip>
      </div>
    </div>
  );
}

export default App;
