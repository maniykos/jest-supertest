/**
 * Script to delete the test state file
 * Compatible with Windows, Linux, and macOS
 */

const fs = require('fs');
const path = require('path');

// Determine the path to the state file
// New path to the state file
const STATE_DIR = path.join(process.cwd(), 'tests', 'state');
const STATE_FILE = path.join(STATE_DIR, 'global.json');

console.log(`🧹 Preparing to clean state file: ${STATE_FILE}`);
console.log(`📂 Current directory: ${process.cwd()}`);

if (fs.existsSync(STATE_FILE)) {
  try {
    // File info before deletion
    const stats = fs.statSync(STATE_FILE);
    console.log(`📊 File info: size ${stats.size} bytes, created at: ${stats.birthtime}`);

    // Delete the file
    fs.unlinkSync(STATE_FILE);

    // Check that the file is actually deleted
    if (!fs.existsSync(STATE_FILE)) {
      console.log(`✅ State file successfully deleted: ${STATE_FILE}`);
    } else {
      console.error(`❌ File was not deleted despite no errors: ${STATE_FILE}`);
    }
  } catch (err) {
    console.error(`❌ Failed to delete state file: ${err.message}`);
    console.error('Error stack:', err.stack);
  }
} else {
  console.log(`ℹ️ State file not found: ${STATE_FILE}`);

  // Show files in the current directory for debugging
  try {
    const files = fs.readdirSync(process.cwd());
    console.log('📁 Files in current directory:', files);
  } catch (err) {
    console.error('❌ Failed to read directory contents:', err.message);
  }
}

console.log('✨ Cleanup script finished');
