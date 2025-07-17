import rest from '../../rest';

describe('Change user password', () => {
  const testUser = global.testUser;

  it('should change password to new one', async () => {
    const changePasswordData = {
      old_password: testUser.password,
      password: testUser.password,
      password_repeat: testUser.password
    };

    await rest
      .post('/profiles/change-password')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(changePasswordData)
      .expect(200);
  });

  it('should return error for wrong old password', async () => {
    const changePasswordData = {
      old_password: 'wrong_password',
      password: testUser.password,
      password_repeat: testUser.password
    };

    await rest
      .post('/profiles/change-password')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(changePasswordData)
      .expect(422);
  });

  it('should return error for password mismatch', async () => {
    const changePasswordData = {
      old_password: testUser.password,
      password: 'new_password123',
      password_repeat: 'different_password123'
    };

    await rest
      .post('/profiles/change-password')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(changePasswordData)
      .expect(422);
  });

  it('should return error for weak password', async () => {
    const changePasswordData = {
      old_password: testUser.password,
      password: 'test123',
      password_repeat: 'test123'
    };

    await rest
      .post('/profiles/change-password')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(changePasswordData)
      .expect(422);
  });
});
