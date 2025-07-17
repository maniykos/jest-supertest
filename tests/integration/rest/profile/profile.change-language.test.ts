import rest from '../../rest';

describe('Change profile language', () => {
  const testUser = global.testUser;

  it('should successfully change profile language', async () => {
    const languageData = {
      language: 'ru'
    };

    await rest
      .post('/profiles/language')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(languageData)
      .expect(200);
  });

  it('should return error for invalid language', async () => {
    const languageData = {
      language: 'invalid_language'
    };

    await rest
      .post('/profiles/language')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(languageData)
      .expect(422);
  });
});
