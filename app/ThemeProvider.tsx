// ThemeProvider.tsx
'use client'; // This directive makes this component a client component

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store'; // Adjust the path as necessary

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.value); // Get the current theme

  return (
    <div className={theme}> {/* Use the theme as a class */}
      {children}
    </div>
  );
};
