'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Adjust the path based on your setup
import { ThemeProvider } from './ThemeProvider'; // Import the ThemeProvider

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  );
}