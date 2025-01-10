import '@testing-library/jest-dom';
// setupTests.ts o jest.setup.js
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
Object.defineProperty(global, 'importMeta', {
  value: {
    env: {
      VITE_API_URL: 'http://localhost:8080/products',
    },
  },
});
