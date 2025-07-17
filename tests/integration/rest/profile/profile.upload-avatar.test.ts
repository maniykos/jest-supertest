import rest from '../../rest';

describe('Upload user avatar', () => {
  const testUser = global.testUser;

  it('should successfully upload user avatar', async () => {
    const avatarData = {
      secure_url: 'https://res.cloudinary.com/dwsaccvec/image/upload/v1750166673/yqjtmvbwkylczgoovztz.jpg',
      public_id: 'yqjtmvbwkylczgoovztz'
    };

    await rest
      .post('/profiles/upload-avatar')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(avatarData)
      .expect(201);
  });

  it('should return error if cloudinary data is missing', async () => {
    const avatarData = {
      secure_url: 'https://example.com/avatar.jpg',
      public_id: 'avatar_123'
    };
    await rest
      .post('/profiles/upload-avatar')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(avatarData)
      .expect(422);
  });
});
