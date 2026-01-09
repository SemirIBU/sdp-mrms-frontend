import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import theme from './theme';
import GlobalLoading from './components/GlobalLoading';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <GlobalLoading />
      <App />
      <Toaster />
    </BrowserRouter>
  </ThemeProvider>
);
