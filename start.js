// Simple development server using Vite
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start Vite dev server from the client directory
const viteProcess = spawn('npx', ['vite'], {
  cwd: resolve(__dirname, 'client'),
  stdio: 'inherit',
  shell: true
});

viteProcess.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  viteProcess.kill('SIGINT');
  process.exit();
});

process.on('SIGTERM', () => {
  viteProcess.kill('SIGTERM');
  process.exit();
});