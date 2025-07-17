import rest from '../../rest';

describe('Get shop list', () => {
  const testUser = global.testUser;

  it('should successfully return user shop list', async () => {
    const response = await rest
      .get('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    // Check that at least one shop contains required fields
    if (response.body.length > 0) {
      const shop = response.body[0];
      expect(shop).toHaveProperty('id');
      expect(shop).toHaveProperty('name');
      expect(shop).toHaveProperty('link');
    }
  });

  it('should return error if token is missing', async () => {
    await rest
      .get('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .expect(401);
  });
});
