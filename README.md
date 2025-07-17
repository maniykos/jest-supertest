# API Integration Tests with Jest

## Running individual tests
```
npx jest auth.login.test.ts
```

### Running tests in strict order
```
npm run test:sequential_rest   - run rest tests
npm run test:sequential_api    - run api tests
```

This script runs tests one by one in the order specified in run-sequential-rest-tests.js.

## How it works
    The order of test execution is ensured by run-sequential-rest-tests.js.
1. In auth.auth.register.test.ts we save registration data (email, password) in the global testUser object.
2. In auth.auth.login.test.ts we use this data to check authorization.
3. In profile.get-profile.test.ts we save the user id in the global testUser object.
4. All other tests are executed

## Important files
- `run-sequential-rest-tests.js` - script for manual test run in a given order
- `run-sequential-api-tests.js` - script for manual test run in a given order
- `tests/integration/setup.ts` - global variables for tests
- 
## Installation
Before running the tests, you need to install the dependencies:

```bash
npm install
```

## Environment setup
Before running the tests, create a `.env` file in the project root and set up environment variables:

## Project structure
```
├── tests/
│   ├── integration/
│   │   ├── api.ts - API client based on SuperTest
│   │   ├── setup.ts - test setup
│   │   ├── types.ts - API types
│   │   └── rest/ - rest tests
│   │   └── api/ - api tests
│   │   └── baseUrl/ - baseUrl tests
│   ├── state/
│   │   └── global.json - file that stores user information
│   ├── types/ - global variables
│   ├── utils/ - helper classes
├── types/
```

## Error checking example
```
 const response = await rest
      .post('/test/block')
      .set('User-Agent', 'Integration-Test-Agent/1.0')
      .set('Key', `${testUser.token}`)
      .send(blockData)
      .expect(422);

    expectValidationErrorsFor(response, [
      'donate_id',
      'name',
      'url'
    ]);
```


