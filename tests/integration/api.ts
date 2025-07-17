// Disable SSL certificate verification for tests
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import supertest from 'supertest';

// Base API URL for tests - taken from environment variables or uses the default value
const BASE_URL = process.env.API_URL || 'https://site.loc/api/v1';

// Create a supertest instance
const api = supertest(BASE_URL);

export default api;
