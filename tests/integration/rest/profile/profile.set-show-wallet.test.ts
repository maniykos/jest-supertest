import rest from '../../rest';

describe('Set wallet visibility', () => {
  const testUser = global.testUser;

  it('should successfully hide wallet visibility', async () => {
    const cidCurrencies = global.cids;
    const showWalletData = {
      psys_cid_hide: cidCurrencies
    };

    await rest
      .post('/profiles/set-show-wallet')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(showWalletData)
      .expect(204);
  });

  it('should successfully show wallet visibility', async () => {
    const cidCurrencies = global.cids;
    const showWalletData = {
      psys_cid_show: cidCurrencies
    };

    await rest
      .post('/profiles/set-show-wallet')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(showWalletData)
      .expect(204);
  });
});
