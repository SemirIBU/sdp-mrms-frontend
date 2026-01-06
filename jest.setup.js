import '@testing-library/jest-dom';

// Mock import.meta for Vite
global.importMeta = {
  env: {
    VITE_API_URL: 'http://localhost:4000/api'
  }
};

// Mock import.meta.env
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:4000/api'
      }
    }
  }
});
