import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCleanTypeOSImage() {
  try {
    // Read the SVG file
    const svgPath = path.join(__dirname, '..', 'public', 'typeos.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf-8');
    
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
            gap: 50,
            padding: 60,
          },
          children: [
            // TypeOS SVG
            {
              type: 'div',
              props: {
                style: {
                  width: '400px',
                  height: '144px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                dangerouslySetInnerHTML: {
                  __html: svgContent
                }
              }
            },
            // Description text
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 36,
                  fontWeight: '500',
                  color: '#333333',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: 900,
                  marginTop: 20,
                },
                children: 'Work with AI directly in your Google Docs and Browser'
              }
            }
          ]
        }
      },
      {
        width: 1200,
        height: 630,
      }
    );

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save both share.png and twitter-image.png (same image for both)
    const publicDir = path.join(__dirname, '..', 'public');
    const sharePath = path.join(publicDir, 'share.png');
    const twitterPath = path.join(publicDir, 'twitter-image.png');
    
    fs.writeFileSync(sharePath, buffer);
    fs.writeFileSync(twitterPath, buffer);
    
    console.log('✅ Clean meta images generated successfully:');
    console.log('  📄 /share.png (OpenGraph)');
    console.log('  🐦 /twitter-image.png (Twitter)');
    console.log('  🎨 Features: TypeOS SVG + clean description');
    console.log('📏 Dimensions: 1200x630px');
  } catch (error) {
    console.error('❌ Error generating meta images:', error);
    
    // Fallback to text-only version if SVG fails
    console.log('🔄 Falling back to text-only version...');
    await generateTextOnlyVersion();
  }
}

async function generateTextOnlyVersion() {
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
          // TypeOS text
          {
            type: 'div',
            props: {
              style: {
                fontSize: 84,
                fontWeight: 'bold',
                color: '#000000',
                letterSpacing: '2px',
                textAlign: 'center',
                marginBottom: 20,
              },
              children: 'TypeOS'
            }
          },
          // Description text
          {
            type: 'div',
            props: {
              style: {
                fontSize: 36,
                fontWeight: '500',
                color: '#333333',
                textAlign: 'center',
                lineHeight: 1.4,
                maxWidth: 900,
              },
              children: 'Work with AI directly in your Google Docs and Browser'
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
    }
  );

  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const publicDir = path.join(__dirname, '..', 'public');
  const sharePath = path.join(publicDir, 'share.png');
  const twitterPath = path.join(publicDir, 'twitter-image.png');
  
  fs.writeFileSync(sharePath, buffer);
  fs.writeFileSync(twitterPath, buffer);
  
  console.log('✅ Fallback meta images generated successfully');
}

generateCleanTypeOSImage();