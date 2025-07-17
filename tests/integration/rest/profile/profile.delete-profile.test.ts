import rest from '../../rest';

describe('Delete user profile', () => {
  it('should successfully send email', async () => {
    const testUser = global.testUser;

    await rest
      .delete(`/profiles/${testUser.id}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send({ id: testUser.id })
      .expect(200);
  });

  it('should return error if id is missing in request', async () => {
    const testUser = global.testUser;

    await rest
      .delete(`/profiles/${testUser.id}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send({})
      .expect(404);
  });

  it('should return error for invalid id in request', async () => {
    const testUser = global.testUser;
    await rest
      .delete(`/profiles/${testUser.id}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send({ id: 2 })
      .expect(403);
  });
});
