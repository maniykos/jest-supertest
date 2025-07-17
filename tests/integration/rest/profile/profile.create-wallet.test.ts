import rest from '../../rest';

describe('Create new wallet', () => {
  const testUser = global.testUser;
  const cidCurrencies = global.cids;

  cidCurrencies.forEach(cid => {
    let wallet_cid = {
      psys_cid: cid
    };
    it(`should successfully create new wallet ${cid}`, async () => {
      await rest
        .post('/profiles/wallets')
        .set('User-Agent', 'Integration-Test-Agent/1.0')
        .set('Key', `${testUser.token}`)
        .send(wallet_cid)
        .expect(200);
    });
  });

  it('should return error if psys_cid is missing', async () => {
    await rest
      .post('/profiles/wallets')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send({})
      .expect(422);
  });

  it('should return error for invalid psys_cid', async () => {
    const walletDataError = {
      psys_cid: 'INVALID_CURRENCY'
    };

    await rest
      .post('/profiles/wallets')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(walletDataError)
      .expect(422);
  });
});
