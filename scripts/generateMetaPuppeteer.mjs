import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTypeOSImageWithPuppeteer() {
  let browser;
  
  try {
    console.log('🚀 Starting Puppeteer browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for 1200x630 OG image
    await page.setViewport({ width: 1200, height: 630 });

    // Create HTML with exact same styling as your page
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            @font-face {
              font-display: swap;
              font-family: Geist;
              font-style: normal;
              font-weight: 100 900;
              src: url(https://www.plun.ai/_next/static/media/569ce4b8f30dc480-s.p.woff2) format("woff2");
              unicode-range: u+00??, u+0131, u+0152-0153, u+02bb-02bc, u+02c6, u+02da, u+02dc, u+0304, u+0308, u+0329, u+2000-206f, u+20ac, u+2122, u+2191, u+2193, u+2212, u+2215, u+feff, u+fffd;
            }
            @font-face {
              ascent-override: 95.94%;
              descent-override: 28.16%;
              font-family: Geist Fallback;
              line-gap-override: 0%;
              size-adjust: 104.76%;
              src: local("Arial");
            }
          </style>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              width: 1200px;
              height: 630px;
              background: white;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: Geist, Geist Fallback, system-ui, -apple-system, sans-serif;
              overflow: hidden;
            }
            
            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 30px;
              text-align: center;
            }
            
            .title {
              font-size: 120px;
              font-weight: 600;
              color: #000000;
              line-height: 1;
              letter-spacing: -0.025em;
              font-family: Geist, Geist Fallback, system-ui, -apple-system, sans-serif;
            }
            
            .description {
              font-size: 36px;
              font-weight: 400;
              color: #666666;
              max-width: 800px;
              line-height: 1.4;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title">TypeOS</div>
            <div class="description">Work with AI directly in Google Docs and your Browser</div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(html);
    
    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    console.log('📸 Taking screenshot...');
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
    
    console.log('✅ Puppeteer meta images generated successfully!');
    console.log('  📄 /share.png (OpenGraph)');
    console.log('  🐦 /twitter-image.png (Twitter)');
    console.log('  🎨 Features: Exact browser font rendering with Geist font');
    console.log('📏 Dimensions: 1200x630px');

  } catch (error) {
    console.error('❌ Error generating images with Puppeteer:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

generateTypeOSImageWithPuppeteer();
