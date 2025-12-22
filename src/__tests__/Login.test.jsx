import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
test('renders login form', ()=>{
  render(<Login/>);
  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});
