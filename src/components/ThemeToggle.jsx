import { useEffect, useState } from 'react';
import '../styles/ThemeToggle.css';

// null = follow OS; "light"/"dark" = explicit user choice (persisted).
const getStored = () => {
  try {
    const t = localStorage.getItem('theme');
    return t === 'light' || t === 'dark' ? t : null;
  } catch {
    return null;
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getStored);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
    } else {
      root.removeAttribute('data-theme');
      try { localStorage.removeItem('theme'); } catch { /* ignore */ }
    }
  }, [theme]);

  const isDark = theme
    ? theme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className="visually-hidden">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
    </button>
  );
};

export default ThemeToggle;
