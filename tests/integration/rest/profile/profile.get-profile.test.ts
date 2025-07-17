import rest from '../../rest';
import {ApiProfileResponse, AuthResponse} from "../../types";

describe('Get user profile', () => {
  const testUser = global.testUser;
  it('should successfully return user profile', async () => {
    const response = await rest
      .get('/profiles')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect(200);

    const responseBody = response.body as ApiProfileResponse<AuthResponse>;
    expect(responseBody.id).toBeDefined();
    testUser.id = responseBody.id;
    if (responseBody.id) {
      const {saveState} = require('../../../utils/global-state');
      saveState(testUser);
    }
  });

  it('should return error if token is missing', async () => {
    await rest
      .get('/profiles')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .expect(401);
  });
});
