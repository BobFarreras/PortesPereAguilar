'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Update icon based on theme
  useEffect(() => {
    // This effect runs when theme changes
    // We could add any additional logic here if needed
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Canviar a ${theme === 'dark' ? 'clar' : 'fosc'} mode`}
      className="flex items-center justify-center w-10 h-10 rounded-md text-xs font-bold text-brand-grey hover:text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}