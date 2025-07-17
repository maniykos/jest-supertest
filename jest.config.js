/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  transform: {
    '^.+\.(ts|tsx)$': 'babel-jest'
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/integration/setup.ts'
  ],
  testTimeout: 15000, // Timeout for API requests
};

module.exports = config;
