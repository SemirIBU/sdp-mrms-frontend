import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Login from '../pages/Login';

const theme = createTheme({
  palette: {
    custom: {
      pageBackground: '#edede9',
      cardBackground: 'white',
      navBackground: '#0E2239',
      navHover: 'rgba(255, 255, 255, 0.15)'
    }
  }
});

test('renders login form', () => {
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </ThemeProvider>
  );
  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});
