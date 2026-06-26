'use client';

import React, { useEffect, useState } from 'react';
import { useThemeStore } from '@/stores';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Hydrate persisted store on client
    useThemeStore.persist.rehydrate();
    useSearchStore.persist.rehydrate();
    useWatchlistStore.persist.rehydrate();
    useDashboardStore.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme, mounted]);

  // Prevent flash of wrong theme by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

// Import stores for hydration
import { useSearchStore, useWatchlistStore, useDashboardStore } from '@/stores';
