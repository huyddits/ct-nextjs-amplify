import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define file paths
const rootDir = path.resolve(__dirname, '..');
const swCustomPath = path.join(rootDir, 'public', 'sw-custom.js');
const swPath = path.join(rootDir, 'public', 'sw.js');

// Read the contents of both files
try {
  console.log('Reading custom service worker file...');
  const customSwContent = fs.readFileSync(swCustomPath, 'utf8');

  console.log('Reading main service worker file...');
  const swContent = fs.readFileSync(swPath, 'utf8');

  // Append the custom SW content to the end of the main SW file
  console.log('Appending custom service worker to main service worker...');
  const newContent = swContent + '\n\n// Custom service worker code\n' + customSwContent;

  // Write the combined content back to the main SW file
  fs.writeFileSync(swPath, newContent);

  console.log('Successfully appended custom service worker to main service worker!');
} catch (error) {
  console.error('Error appending custom service worker:', error);
  process.exit(1);
}
