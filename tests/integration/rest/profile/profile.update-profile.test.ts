import rest from '../../rest';
import { expectValidationErrorsFor } from '../../../utils/validation-helpers';

describe('Обновление профиля пользователя', () => {
  const testUser = global.testUser;

  it('должен успешно обновить профиль пользователя', async () => {
    const updateData = {
      name: 'Тестовое имя',
      alternative_contact: 'https://t.me/test_user',
      timezone: 'Europe/Moscow',
      fiat_currency: 'USD',
      phone: `+7${new Date().getTime().toString().slice(-10)}`,
      telegram_username: 'telegram',
      disable_fingerprint: 1,
      using: 1,
      notify_last_viewed: 1,
      hasLoggedIn: 1,
      subscriptions: {
        email_news: 0,
        email_promotions: 0,
        email_security: 0,
        email_transactions: 0,
        email_guides: 0,
        push_news: 0,
        push_promotions: 0,
        push_security: 0,
        push_transactions: 0,
        push_guides: 0,
        telegram_transactions : 0
      }
    };

    const response = await rest
      .put(`/profiles/${testUser.id}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toHaveProperty('name', updateData.name);
    expect(response.body).toHaveProperty('fiat_currency', updateData.fiat_currency);
    expect(response.body).toHaveProperty('timezone', updateData.timezone);
    expect(response.body).toHaveProperty('alternative_contact', updateData.alternative_contact);
  });

  it('должен проверить валидацию полей профиля', async () => {
    // Подготовка некорректных данных для обновления
    const invalidProfileData = {
      name: '<script>',
      timezone: 'Invalid/Timezone',
      fiat_currency: 'INVALID',
      alternative_contact: '<script>',  // email, site, telegram
      telegram_username: '<script>',  // email, site, telegram
      hasLoggedIn: 'not-a-number',       // hasLoggedIn должен быть числом
      using: 'not-a-number',
      notify_last_viewed: 'not-a-number',
      subscriptions: {
        email_news: 'not-a-number',
      }
    };

    // Выполнение запроса
    const response = await rest
      .put(`/profiles/${testUser.id}`)
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(invalidProfileData)
      .expect(422);

    // Проверка ошибок валидации для указанных полей
    expectValidationErrorsFor(response, [
      'name', 
      'timezone', 
      'fiat_currency', 
      'alternative_contact', 
      'telegram_username',
      'hasLoggedIn',
      'using',
      'notify_last_viewed',
      'subscriptions',
    ]);
  });
});
