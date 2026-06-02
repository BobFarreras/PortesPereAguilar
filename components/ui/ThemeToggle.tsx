'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <button
        aria-label="Canviar tema"
        className="flex items-center justify-center w-10 h-10 rounded-md text-brand-grey hover:text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Canviar a ${resolvedTheme === 'dark' ? 'clar' : 'fosc'} mode`}
      className="flex items-center justify-center w-10 h-10 rounded-md text-brand-grey hover:text-brand-dark hover:bg-brand-dark/10 dark:hover:text-white dark:hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
