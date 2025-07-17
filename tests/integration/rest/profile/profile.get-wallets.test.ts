import rest from '../../rest';
import {ProfileWalletResponseDto} from "../../types";

describe('Get user wallets', () => {
  const testUser = global.testUser;

  it('should successfully return user wallets', async () => {
    const response = await rest
      .get('/profiles/wallets')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .expect(200);

    const responseBody = response.body as ProfileWalletResponseDto;
    expect(responseBody).toBeDefined();
    // Check that there is at least one wallet in the response
    expect(Object.keys(responseBody).length).toBeGreaterThan(0);

    testUser.wallets = Object.entries(responseBody)
        .filter(([_, wallet]) => wallet.hash)
        .map(([key, wallet]) => ({
          psys_cid: wallet.psys_cid,
          key: key,
          hash: wallet.hash
        }));

    const {saveState} = require('../../../utils/global-state');
    saveState(testUser);
  });

  it('should return error if token is missing', async () => {
    await rest
      .get('/profiles/wallets')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .expect(401);
  });
});
