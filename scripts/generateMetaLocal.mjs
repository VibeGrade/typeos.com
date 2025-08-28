import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFromLocalSite() {
  let browser;
  
  try {
    console.log('🚀 Starting Puppeteer to capture actual site...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for 1200x630 OG image
    await page.setViewport({ width: 1200, height: 630 });

    // Navigate to your actual local site
    console.log('🌐 Loading your actual TypeOS site...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Inject CSS to create the meta image view
    await page.addStyleTag({
      content: `
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 1200px !important;
          height: 630px !important;
          overflow: hidden !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        /* Hide everything except main content */
        .min-h-screen > main {
          zoom: 0.8;
          transform: translateY(-20px);
        }
        
        /* Hide the YC badge and button */
        .opacity-0.animate-fade-in-up:first-child,
        .opacity-0.animate-fade-in-up:last-child {
          display: none !important;
        }
        
        /* Show only title and description */
        .opacity-0.animate-fade-in-up:nth-child(2),
        .opacity-0.animate-fade-in-up:nth-child(3) {
          opacity: 1 !important;
          animation: none !important;
        }
      `
    });

    // Wait a moment for styles to apply
    await page.waitForTimeout(1000);
    
    console.log('📸 Taking screenshot of actual site...');
    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 }
    });

    // Save both share.png and twitter-image.png
    const publicDir = path.join(__dirname, '..', 'public');
    const sharePath = path.join(publicDir, 'share.png');
    const twitterPath = path.join(publicDir, 'twitter-image.png');
    
    fs.writeFileSync(sharePath, screenshot);
    fs.writeFileSync(twitterPath, screenshot);
    
    console.log('✅ Local site meta images generated successfully!');
    console.log('  📄 /share.png (OpenGraph)');
    console.log('  🐦 /twitter-image.png (Twitter)');
    console.log('  🎨 Features: Direct capture from your actual running site');
    console.log('📏 Dimensions: 1200x630px');

  } catch (error) {
    console.error('❌ Error generating images from local site:', error);
    console.error('💡 Make sure your Next.js dev server is running on localhost:3000');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

generateFromLocalSite();
