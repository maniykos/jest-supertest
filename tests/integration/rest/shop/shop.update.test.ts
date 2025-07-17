import rest from '../../rest';
import {expectValidationErrorsFor} from "../../../utils/validation-helpers";

describe('Update shop information', () => {
  const testUser = global.testUser;
  const localIP = global.localIP;

  let shopId : string;
  let api_key : string;
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
      expect(first).toHaveProperty('secretKey');
      shopId = response.body[0].id;
      api_key = response.body[0].secretKey;
    }
    expect(shopId).toBeDefined();
    expect(api_key).toBeDefined();

    testUser.api_key = api_key;
    const { saveState } = require('../../../utils/global-state');
    saveState(testUser);

  });

  it('should successfully update shop information', async () => {
    // Check that we have shop ID
    if (!shopId) {
      console.warn('Test skipped: shop ID is not defined');
      return;
    }
    const shopData = {
      name: `Updated Shop ${Date.now()}`,
      commissionPayment: 1,
      white_label: true,
      allow_renew: true,
      publicEmail: 'publicEmail@example.com',
      link: 'https://shop.example.com',
      is_qrcode_amount: true,
      is_qrcode_name_hash: true,
      risky: "1",
      allowed_psys_cids: global.cids.join(','),
      integration: "Opencart",
      disable_cash_out: true,
      failedUrl: 'https://failedUrl.example.com',
      requestIp: localIP,
      statusUrl: 'https://statusUrl.example.com',
      successUrl: 'https://successUrl.example.com',
      expire_min: 65,
      autoApproveUnderpaidPercentage:1
    };

    await rest
        .put(`/shops/${shopId}`)
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .send(shopData)
        .expect(200);
  });


  it('should return error when updating with invalid data', async () => {
    if (!shopId) {
      console.warn('Test skipped: shop ID is not defined');
      return;
    }

    const shopData = {
      name: `Updated Shop <script>`,
      commissionPayment: "invalid-commissionPayment",
      publicEmail: 'invalid email',
      link: 'invalid url',
      risky: "invalid",
      allowed_psys_cids: 'BTC<script>',
      failedUrl: 'invalid',
      requestIp: 'invalid',
      statusUrl: 'invalid',
      successUrl: 'invalid',
      expire_min: 'invalid',
      autoApproveUnderpaidPercentage: 'invalid'
    };
    const response = await rest
        .put(`/shops/${shopId}`)
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .send(shopData)
        .expect(422);

    expectValidationErrorsFor(response, [
      'name',
      'commissionPayment',
      'publicEmail',
      'link',
      'risky',
      'allowed_psys_cids',
      'failedUrl',
      'requestIp',
      'statusUrl',
      'successUrl',
      'expire_min',
      'autoApproveUnderpaidPercentage'
    ]);
  });

  it('should return error when updating a non-existent shop', async () => {
    await rest
      .put('/shops/non-existent-id')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send({
        name: `Updated Shop ${Date.now()}`
      })
      .expect([500,404]);
  });

  it('should return error if token is missing', async () => {
    if (!shopId) {
      console.warn('Test skipped: shop ID is not defined');
      return;
    }

    await rest
      .put(`/shops/${shopId}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send({
        name: `Updated Shop ${Date.now()}`
      })
      .expect(401);
  });
});
