import rest from '../../rest';


describe('Get referral list', () => {
  const testUser = global.testUser;
  it('should successfully return referral list', async () => {
    const response = await rest
      .get('/profiles/referral')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect(200);

    expect(response.body).toHaveProperty('referrals');
    expect(response.body).toHaveProperty('total_amount');
    expect(response.body).toHaveProperty('min_sum_withdrawal');
    expect(response.body).toHaveProperty('withdrawal_amount');
  });

  it('should support pagination parameters', async () => {
    const response = await rest
      .get('/profiles/referral?page=1&limit=10')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect(200);

    expect(response.body).toHaveProperty('pagination');
    expect(response.body.pagination).toHaveProperty('currentPage');
    expect(response.body.pagination).toHaveProperty('pageSize');
  });
});