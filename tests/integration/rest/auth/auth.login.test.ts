import rest from '../../rest';
import { ApiLoginResponse, AuthResponse } from '../../types';

describe('User Authentication', () => {
  const testUser = global.testUser;

  it('should successfully authenticate a registered user', async () => {
    try {
      // Check that we have registration data
      expect(testUser.email).toBeDefined();
      expect(testUser.password).toBeDefined();

      // console.log(`Login with data: ${testUser.email}, ${testUser.password}`);

      const response = await rest
        .post('/login')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      const responseBody = response.body as ApiLoginResponse<AuthResponse>;
      expect(responseBody.token).toBeDefined();

      // Update token
      if (responseBody.token) {
        testUser.token = responseBody.token;
        testUser.refreshToken = responseBody.refreshToken;

        const { saveState } = require('../../../utils/global-state');
        saveState(testUser);
      }
    } catch (error) {
      console.error('Error in authentication test:', error);
      throw error;
    }
  });

  it('should return error when trying to authenticate with wrong email', async () => {
    await rest
      .post('/login')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        email: `wrong.${Date.now()}@example.com`,
        password: testUser.password,
      })
      .expect(422);
  });

  it('should return error when trying to authenticate with wrong password', async () => {
    await rest
      .post('/login')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        email: testUser.email,
        password: 'WrongPassword123!',
      })
      .expect(422);
  });

  it('should reject requests with invalid data format', async () => {
    await rest
      .post('/login')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        username: 'not_an_email',
        pass: '123'
      })
      .expect(422);
  });
});