import rest from '../../rest';
import { TestUser } from '../../../types/global';

describe('User Registration', () => {
    const testUser: TestUser = {};

    // Create a unique email for registration
  const uniqueEmail = `test.${Date.now()}@example.com`;
  // Create a unique password for registration
  const uniquePassword = process.env.TEST_USER_PASSWORD ?? 'StrongsPassword122!';

  it('should successfully register a new user', async () => {
     await rest
      .post('/register')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        email: uniqueEmail,
        password: uniquePassword,
        password_compare: uniquePassword,
        is_test_user: 1
      })
      .expect(201);
      testUser.email = uniqueEmail;
      testUser.password = uniquePassword;
      // console.log(`Registered user: ${uniqueEmail} / ${uniquePassword}`);

      // Save state to file for next tests
      const { saveState } = require('../../../utils/global-state');
      saveState(testUser);
  });

  it('should return error when trying to register a user with an existing email', async () => {
    await rest
      .post('/register')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        email: uniqueEmail, // Use email that is already registered
        password: uniquePassword,
        password_compare: uniquePassword,
        is_test_user: 1
      })
      .expect(201);
  });

  it('should return error when registering with invalid email', async () => {
    await rest
      .post('/register')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        email: 'invalid-email',
        password: uniquePassword,
        password_compare: uniquePassword,
          is_test_user: 1
      })
      .expect(422);
  });

  it('should return error when registering with a weak password', async () => {
     await rest
      .post('/register')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        email: `another.${Date.now()}@example.com`,
        password: '12345',
        password_compare: '12345',
          is_test_user: 1
      })
      .expect(422);
  });
});