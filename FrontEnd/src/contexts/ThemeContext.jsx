import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const themes = {
  light: {
    name: 'light',
    colors: {
      // Primary purple palette
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
      primaryLight: '#A78BFA',
      primaryDark: '#5B21B6',

      // Accent
      accent: '#EC4899',
      accentHover: '#DB2777',

      // Backgrounds
      background: '#FAF5FF',
      backgroundSecondary: '#FFFFFF',
      backgroundTertiary: '#F3E8FF',

      // Surfaces (cards, inputs)
      surface: '#FFFFFF',
      surfaceHover: '#F9FAFB',
      surfaceBorder: '#E9D5FF',

      // Text
      text: '#1F2937',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      textOnPrimary: '#FFFFFF',

      // States
      success: '#10B981',
      error: '#EF4444',
      errorBackground: '#FEE2E2',
      warning: '#F59E0B',

      // Gradient
      gradientStart: '#FAF5FF',
      gradientEnd: '#7C3AED',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      // Primary purple palette
      primary: '#A78BFA',
      primaryHover: '#8B5CF6',
      primaryLight: '#2D2250',
      primaryDark: '#7C3AED',

      // Accent
      accent: '#F472B6',
      accentHover: '#EC4899',

      // Backgrounds
      background: '#1A1425',
      backgroundSecondary: '#241B35',
      backgroundTertiary: '#2E2345',

      // Surfaces (cards, inputs)
      surface: '#241B35',
      surfaceHover: '#2E2345',
      surfaceBorder: '#3D2E5C',

      // Text
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      textMuted: '#9CA3AF',
      textOnPrimary: '#1A1425',

      // States
      success: '#34D399',
      error: '#F87171',
      errorBackground: '#7F1D1D',
      warning: '#FBBF24',

      // Gradient
      gradientStart: '#1A1425',
      gradientEnd: '#5B21B6',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    },
  },
};

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const theme = themes[themeName];

  useEffect(() => {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
