// Global setup for integration tests

// Load utilities for working with global state
const { loadState } = require('../utils/global-state');

// Setup for loading environment variables
try {
  require('dotenv').config();
  // console.log('Environment variables loaded from .env file');
} catch (error) {
  console.log('Could not load .env file, using default values');
}

// Increase timeout for all tests, as API requests may take time
jest.setTimeout(30000);

// Note: Global types are defined in types/global.d.ts

// Load currency array from .env file or use default values
const DEFAULT_CURRENCIES = ['USD', 'EUR', 'RUB'];
global.currencies = process.env.CURRENCIES ? process.env.CURRENCIES.split(',') : DEFAULT_CURRENCIES;

// Load currency cid array from .env file or use default values
const DEFAULT_CIDS = ['TON'];
global.cids = process.env.CIDS ? process.env.CIDS.split(',') : DEFAULT_CIDS;

global.cashoutHashTo = process.env.CASHOUT_HASH_TO ?? 'cashout_hash';
global.cashoutCidTo = process.env.CASHOUT_CID_TO ?? 'cashout_cid';

// Load currency cid array from .env file or use default values

global.localIP = process.env.LOCAL_IP ? process.env.LOCAL_IP : '';

// Attempt to load saved state
const savedState = loadState();

// Initialize a global object to store data between tests
global.testUser = {
  email: undefined,
  password: undefined,
  token: undefined,
  refreshToken: undefined,
  id: undefined,
  wallets: undefined,
  ...savedState // Overwrite with values from saved state, if any
};

