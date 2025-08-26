import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTypeOSImage() {
  try {
    const imageResponse = new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            gap: 60,
            padding: 80,
          },
          children: [
            // TypeOS SVG as simplified elements (since complex SVG paths are hard to render)
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 400,
                  height: 140,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 20,
                  border: '2px solid #e9ecef',
                  marginBottom: 20,
                },
                children: {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 64,
                      fontWeight: 'bold',
                      color: '#000000',
                      letterSpacing: '3px',
                    },
                    children: 'TypeOS'
                  }
                }
              }
            },
            // TypeOS.com Text
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 52,
                  fontWeight: '600',
                  color: '#333333',
                  textAlign: 'center',
                  letterSpacing: '2px',
                },
                children: 'typeos.com'
              }
            },
            // Subtitle
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 24,
                  fontWeight: 'normal',
                  color: '#666666',
                  textAlign: 'center',
                  marginTop: 20,
                },
                children: 'Work with AI directly in Google Docs and your Browser'
              }
            }
          ]
        }
      },
      {
        width: 1200,
        height: 630, // Standard OG image dimensions
      }
    );

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save the image
    const outputPath = path.join(__dirname, '..', 'public', 'typeos-card.png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ TypeOS social media image generated successfully at:', outputPath);
    console.log('📏 Dimensions: 1200x630px (perfect for social media)');
  } catch (error) {
    console.error('❌ Error generating image:', error);
  }
}

generateTypeOSImage();