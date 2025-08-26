import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if --meta flag is passed
const hasMetaFlag = process.argv.includes('--meta');

async function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function build() {
  try {
    console.log('🚀 Starting TypeOS build...');
    
    // Generate meta images if --meta flag is provided
    if (hasMetaFlag) {
      console.log('🎨 Generating meta images...');
      await runCommand('node', ['scripts/generateMetaImages.mjs']);
    }
    
    // Run Next.js build
    console.log('📦 Building Next.js application...');
    await runCommand('next', ['build']);
    
    console.log('✅ Build completed successfully!');
    
    if (hasMetaFlag) {
      console.log('🎯 Meta images updated for social sharing');
    }
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
