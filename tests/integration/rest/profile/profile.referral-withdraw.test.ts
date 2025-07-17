import rest from '../../rest';

describe('Get referral withdrawal information', () => {
  const testUser = global.testUser;
  it('should successfully return referral withdrawal information', async () => {
    await rest
      .get('/profiles/referral-withdraw')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect(200);
  });
});

