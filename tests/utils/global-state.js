const fs = require('fs');
const path = require('path');

// Determine the path to the state file
// New path to the state file
const STATE_DIR = path.join(process.cwd(), 'tests', 'state');
const STATE_FILE = path.join(STATE_DIR, 'global.json');

// Create the directory if it does not exist
if (!fs.existsSync(STATE_DIR)) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
}

// console.log(`📝 State file will be located at: ${STATE_FILE}`);

/**
 * Checks if the directory exists, if not - creates it
 * @param {string} dirPath - path to the directory
 */
function ensureDirectoryExists(dirPath) {
  const dirname = path.dirname(dirPath);
  if (fs.existsSync(dirname)) {
    return;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

/**
 * Saves the global state to a file
 * @param {Object} state - object to save
 */
exports.saveState = (state) => {
  try {
    // Make sure the directory exists
    ensureDirectoryExists(STATE_FILE);

    // Save the file
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

    // Check that the file was created
    if (fs.existsSync(STATE_FILE)) {
      // console.log(`✅ State saved to file: ${STATE_FILE}`);
      // console.log('📄 Saved data:', JSON.stringify(state, null, 2));
    } else {
      console.error(`❌ File was not created: ${STATE_FILE}`);
    }
  } catch (err) {
    console.error('❌ Error saving state:', err);
    console.error('Current directory:', process.cwd());
    console.error('File path:', STATE_FILE);
  }
};

/**
 * Loads the global state from a file
 * @returns {Object} loaded state or an empty object in case of error
 */
exports.loadState = () => {
  try {
    // console.log(`🔍 Looking for state file: ${STATE_FILE}`);

    if (fs.existsSync(STATE_FILE)) {
      // const fileStats = fs.statSync(STATE_FILE);
      // console.log(`📊 File size: ${fileStats.size} bytes, created: ${fileStats.birthtime}`);

      const data = fs.readFileSync(STATE_FILE, 'utf8');

      if (!data || data.trim() === '') {
        console.warn(`⚠️ State file is empty: ${STATE_FILE}`);
        return {};
      }

      try {
        return JSON.parse(data);
      } catch (parseErr) {
        console.error(`❌ JSON parse error in file: ${parseErr.message}`);
        console.error('File contents:', data);
        return {};
      }
    } else {
      console.log(`⚠️ State file not found: ${STATE_FILE}`);
      // Output the list of files in the current directory for debugging
      const files = fs.readdirSync(process.cwd());
      console.log('📁 Files in current directory:', files);
    }
  } catch (err) {
    console.error('❌ Error loading state:', err);
    console.error('Current directory:', process.cwd());
  }
  return {};
};
