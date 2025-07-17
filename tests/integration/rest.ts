// Disable SSL certificate verification for tests
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import supertest from 'supertest';

// Base REST API URL for tests - taken from environment variables or uses the default value
const BASE_URL = process.env.REST_URL || 'https://site.loc/rest';

// Create a supertest instance
const rest = supertest(BASE_URL);

export default rest;
