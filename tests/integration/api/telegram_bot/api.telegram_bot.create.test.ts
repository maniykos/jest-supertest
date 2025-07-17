import baseUrl from '../../baseUrl';

describe('API Telegram Bot - Create Webhook', () => {
  const secretToken = process.env.TELEGRAM_SECRET_TOKEN || '';

  it('should successfully create a webhook for telegram bot', async () => {

    const requestBody = {
      message: {
        from: {
          id:  Date.now(),
          username: `test_user_${Date.now()}`
        }
      }
    };

     await baseUrl
      .post('/api/telegram-bot/new')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('x-telegram-bot-api-secret-token', secretToken)
      .send(requestBody)
      .expect(200);
  });

  it('should return error if required secret token header is missing', async () => {
    const requestBody = {
      message: {
        from: {
          id:  Date.now(),
          username: `test_user_${Date.now()}`
        }
      }
    };

    await baseUrl
      .post('/api/telegram-bot/new')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .send(requestBody)
      .expect(422);
  });


  it('should return error for invalid request structure', async () => {

    const requestBody = {
      message: {}
    };

     await baseUrl
      .post('/api/telegram-bot/new')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('x-telegram-bot-api-secret-token', secretToken)
      .send(requestBody)
      .expect(422);
  });

  it('should return error for invalid data', async () => {

    const requestBody = {
      message: {
        from: {
          id: 'invalid',
          username: 'invalid<script>'
        }
      }
    };

     await baseUrl
      .post('/api/telegram-bot/new')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('x-telegram-bot-api-secret-token', secretToken)
      .send(requestBody)
      .expect(422);
  });

});
