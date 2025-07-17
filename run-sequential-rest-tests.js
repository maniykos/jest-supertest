/**
 * Script for sequentially running tests with context preservation
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// File for storing state between test runs
// New path to the state file
const STATE_DIR = path.join(__dirname, 'tests', 'state');
const STATE_FILE = path.join(STATE_DIR, 'global.json');

// Create the directory if it does not exist
if (!fs.existsSync(STATE_DIR)) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
}

// Initial state
let state = {
  email: null,
  password: null,
  token: null,
};

// Test order
const testFiles = [
  'tests/integration/rest/auth/auth.register.test.ts',
  'tests/integration/rest/auth/auth.login.test.ts',
  'tests/integration/rest/profile/profile.get-profile.test.ts',
  'tests/integration/rest/profile/index.test.ts',                                   //profiles
  'tests/integration/baseUrl/payment_button/baseUrl.payment.button.creat.test.ts',  // create payment_button invoice
  'tests/integration/rest/donates/index.test.ts',                                   //donates
  'tests/integration/rest/shop/index.test.ts',                                      //shops
    
  'tests/integration/rest/auth/auth.logout.test.ts',
];

console.log('🚀 Running tests in strict order');

// Try to load saved state
try {
  if (fs.existsSync(STATE_FILE)) {
    const savedState = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    state = { ...state, ...savedState };
    // console.log('Loaded state from previous run:', state);
  }
} catch (error) {
  console.error('Error reading state:', error);
}

// Run tests one by one
let allPassed = true;

for (const testFile of testFiles) {
  console.log(`\n📋 Running test: ${testFile}\n`);

  try {
    // Set environment variables from current state
    const env = { ...process.env };
    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        env[`TEST_${key.toUpperCase()}`] = value;
      }
    });

    // Run the test
    execSync(`npx jest ${testFile} --runInBand --silent=false`, { 
      stdio: 'inherit',
      env
    });

  } catch (error) {
    console.error(`\n❌ Error running test ${testFile}:\n`, error.message);
    allPassed = false;
    break;
  }
}

if (allPassed) {
  console.log('\n✅ All tests passed successfully!\n');
} else {
  console.log('\n❌ Test run completed with errors\n');
  process.exit(1);
}
