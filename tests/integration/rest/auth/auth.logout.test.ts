import rest from '../../rest';

describe('Logout', () => {
  const testUser = global.testUser;

    it('should successfully log out', async () => {
      await rest
        .post('/logout')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .expect(204);
    });

    it('should check access after logout', async () => {
        await rest
            .get('/profiles')
            .set('User-Agent', 'Integration-Test-Agent/1.0')
            .set('Key', `${testUser.token}`)
            .expect(401);
    });
});