'use client';

import { ThemeProvider as NextThemesThemeProvider, type ThemeProviderProps } from 'next-themes';
import { useEffect } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // We use next-themes' ThemeProvider and also add a class to the html element for dark mode
  // This is useful for Tailwind CSS dark mode detection via class strategy
  useEffect(() => {
    // The next-themes provider will handle adding/removing the class on the html element
    // We don't need to do anything extra here because next-themes does it.
  }, []);

  return (
    <NextThemesThemeProvider {...props}>
      {children}
    </NextThemesThemeProvider>
  );
}