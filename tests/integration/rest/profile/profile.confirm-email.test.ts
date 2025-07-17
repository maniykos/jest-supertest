import rest from '../../rest';

describe('Confirm user email', () => {
  it('should return error for invalid token', async () => {
    const confirmData = {
      token: 'invalid_token_123456'
    };

    await rest
      .post('/profiles/confirm-email')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send(confirmData)
      .expect(422);
  });

  it('should return error if token is missing', async () => {
    await rest
      .post('/profiles/confirm-email')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({})
      .expect(422);
  });
});
