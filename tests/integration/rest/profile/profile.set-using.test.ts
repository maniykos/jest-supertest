import rest from '../../rest';

describe('Set using (Business|Profile)', () => {

  it('should successfully select Business', async () => {
    const usingData = {
      using: 1
    };

    await rest
      .post('/profiles/set-using')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(usingData)
      .expect(200);
  });

  it('should return error if using is missing', async () => {
    await rest
        .post('/profiles/set-using')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .send({})
        .expect(422);
  });
});
