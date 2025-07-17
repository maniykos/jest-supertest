import rest from '../../rest';

describe('Get shop information', () => {
  const testUser = global.testUser;
  let shopId : string;
  beforeAll(async () => {
    // Check for authorization token
    expect(testUser.token).toBeDefined();

    const response = await rest
        .get('/shops')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    // Check structure of the first element, if it exists
    if (response.body.length > 0) {
      const first = response.body[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('name');
      shopId = response.body[0].id;
    }
    expect(shopId).toBeDefined();
  });

  // This test will be skipped if shopId is not defined
  it('should successfully return shop information', async () => {
    // Check that we have shop ID
    if (!shopId) {
      console.warn('Test skipped: shop ID is not defined');
      return;
    }
    const response = await rest
      .get(`/shops/${shopId}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('link');
  });

  it('should return error when requesting a non-existent shop', async () => {
    await rest
      .get('/shops/non-existent-id')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect([404, 500]);
  });

  it('should return error if token is missing', async () => {
    if (!shopId) {
      console.warn('Test skipped: shop ID is not defined');
      return;
    }

    await rest
      .get(`/shops/${shopId}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .expect(401);
  });
});
