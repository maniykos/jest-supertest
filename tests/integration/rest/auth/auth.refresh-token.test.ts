import rest from '../../rest';

describe('Refresh JWT token', () => {
  const testUser = global.testUser;
  it('should complete successfully', async () => {

    expect(testUser.refreshToken).toBeDefined();

    const response = await rest
      .post('/auth/refresh-token')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
          "token": testUser.refreshToken
      })
      .expect([200, 204]);

    const responseBody = response.body;
    expect(responseBody.token).toBeDefined();

    // Update token
    if (responseBody.token) {
      testUser.token = responseBody.token;
      testUser.refreshToken = responseBody.refreshToken;
      const { saveState } = require('../../../utils/global-state');
      saveState(testUser);
    }
  });

  it('should return error when trying with an invalid token', async () => {
      await rest
        .post('/auth/refresh-token')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .send({
          "token": 'invalid token'
        })
        .expect(403);
  });
});
