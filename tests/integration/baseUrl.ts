// Disable SSL certificate verification for tests
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import supertest from 'supertest';

// Base API URL for tests - taken from environment variables or uses the default value
const BASE_URL = process.env.BASE_URL || 'https://site.loc';

// Create a supertest instance
const baseUrl = supertest(BASE_URL);

export default baseUrl;
