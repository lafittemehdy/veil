import { useState, useEffect } from 'react';
import './App.css';
import {
  ArchClip,
  RoundedRectangleClip,
  RoundedLeftClip
} from 'react-veil'; // Import from the library package
import ThemeToggle from './components/ThemeToggle'; // Import local component

type Theme = 'light' | 'dark';

function App() {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('app-theme') as Theme | null;
    return storedTheme || 'dark';
  });

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Effect to apply theme class to body and save to localStorage
  useEffect(() => {
    document.body.className = ''; // Clear existing classes
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const getAssetUrl = (assetName: string) => {
    const baseUrl = import.meta.env.BASE_URL;
    if (baseUrl.endsWith('/') && assetName.startsWith('/')) {
      return `${baseUrl.slice(0, -1)}${assetName}`;
    }
    if (!baseUrl.endsWith('/') && !assetName.startsWith('/')) {
      return `${baseUrl}/${assetName}`;
    }
    return `${baseUrl}${assetName}`;
  };

  return (
    <div className={`app-wrapper`} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      
      <div className="container">
        <ArchClip>
          <video 
            src={getAssetUrl("01.mp4")} 
            autoPlay 
            loop 
            muted
            playsInline
          />
        </ArchClip>
      </div>

      <div className="container">
        <RoundedRectangleClip>
          <img src={getAssetUrl("02.jpg")} alt="Rounded rectangle clipped image" />
        </RoundedRectangleClip>
      </div>

      <div className="container">
        <RoundedLeftClip>
          <img src={getAssetUrl("03.jpg")} alt="Rounded left clipped image" />
        </RoundedLeftClip>
      </div>
    </div>
  );
}

export default App;
