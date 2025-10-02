import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, ColorScheme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  handleColorSchemeChange: (scheme: ColorScheme) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem('colorScheme');
    return (saved as ColorScheme) || ('dark-blue' as ColorScheme);
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
    document.documentElement.setAttribute('data-color', colorScheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleColorSchemeChange = (newScheme: ColorScheme) => {
    if (newScheme === colorScheme) return;
    
    setIsTransitioning(true);
    
    // Añadir clase de transición al documento
    document.documentElement.classList.add('color-transitioning');
    
    // Cambiar el esquema de color
    setColorScheme(newScheme);
    
    // Remover la clase de transición después de la animación
    setTimeout(() => {
      document.documentElement.classList.remove('color-transitioning');
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      colorScheme, 
      setColorScheme, 
      handleColorSchemeChange,
      isTransitioning 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};