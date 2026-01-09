import '@testing-library/jest-dom';

// Set test environment
process.env.NODE_ENV = 'test';
process.env.VITE_API_URL = 'http://localhost:4001/api';

// Mock localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
