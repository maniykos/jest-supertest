import rest from '../../rest';
import baseUrl from '../../baseUrl';
describe('API Invoices - Create Invoice', () => {
  const testUser = global.testUser;
  let paymentButtonsHash : string;

  beforeAll(async () => {
    // Check for authorization token
    expect(testUser.token).toBeDefined();

    // Create a test payment button before each test
    const requestData = {
      store_name: 'Test Button for Deletion',
      amount: 100,
      currency: 'USD',
      allowed_psys_cids: global.cids.join(','),
      return_url: 'https://test.com/return'
    };

    const response = await rest
        .post('/payment-buttons')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .send(requestData)
        .expect(201);

    paymentButtonsHash = response.body.hash;
    expect(paymentButtonsHash).toBeDefined();
  });

  it('should successfully create a new invoice with minimal required parameters', async () => {
    if (!paymentButtonsHash) {
      console.warn('Test skipped: HASH is not defined');
      return;
    }
    await baseUrl
        .get(`/invoice/${paymentButtonsHash}`)
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .expect(301);
  });

  it('should return error when requesting with a non-existent hash', async () => {
    await baseUrl
        .get(`/invoice/invalid-hash`)
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .expect(500);
  });
});
