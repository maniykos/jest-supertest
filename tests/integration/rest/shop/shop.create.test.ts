import rest from '../../rest';
import {expectValidationErrorsFor} from "../../../utils/validation-helpers";

describe('Create shop', () => {
  const testUser = global.testUser;

  it('should successfully create a new shop', async () => {
    const shopData = {
      name: `Test Shop ${Date.now()}`,
      link: `https://shop-${Date.now()}.example.com`
    };

    const response = await rest
      .post('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(shopData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(shopData.name);
    expect(response.body.link).toBe(shopData.link);
  });

  it('should return error when trying to create without data', async () => {
    const shopData = {};

    const response = await rest
      .post('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(shopData)
      .expect(422);

    expectValidationErrorsFor(response, [
      'name',
      'link'
    ]);
  });

  it('should return error when trying to create shop with invalid URL', async () => {
    const shopData = {
      name: `Test Shop <script>}`,
      link: `invalid-url`
    };

    const response = await rest
      .post('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(shopData)
      .expect(422);

    expectValidationErrorsFor(response, [
      'name',
      'link'
    ]);
  });

  it('should return error if token is missing', async () => {
    const shopData = {
      name: `Test Shop ${Date.now()}`,
      link: `https://shop-${Date.now()}.example.com`
    };

    await rest
      .post('/shops')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send(shopData)
      .expect(401);
  });
});
