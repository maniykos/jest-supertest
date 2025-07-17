import rest from '../../rest';

describe('Delete shop', () => {
  const testUser = global.testUser;

  let shopId : string;
  let shopLink : string;

  beforeAll(async () => {
    // Check for authorization token
    expect(testUser.token).toBeDefined();

    const shopData = {
      name: `Test Shop delete`,
      link: `https://shop-del-${Date.now()}.example.com`
    };

    const response = await rest
        .post('/shops')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .send(shopData)
        .expect(201);

    expect(response.body).toHaveProperty('id');
    shopId = response.body.id;
    shopLink = response.body.link;
    expect(shopId).toBeDefined();
    expect(shopLink).toBeDefined();
  });

  it('should successfully delete shop', async () => {
    // Check that we have temporary shop ID
    if (!shopId || !shopLink) {
      console.warn('Test skipped: temporary shop ID is not defined');
      return;
    }
    await rest
      .post('/shops/delete-one')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send({
        id: shopId,
        link: shopLink
      })
      .expect(204);
  });

  it('should check if shop was actually deleted', async () => {
    await rest
        .get(`/shops/${shopId}`)
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .expect(404);
  });

  it('should return error when deleting a non-existent shop', async () => {
    await rest
      .delete('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send({
        id: 'non-existent-id',
        link: 'https://non-existent-shop.example.com'
      })
      .expect([500, 405]);
  });

  it('should return error if token is missing', async () => {
    await rest
      .delete('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        id: 'any-id',
        link: 'https://any-shop.example.com'
      })
      .expect(401);
  });
});
