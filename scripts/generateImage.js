import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';

// Read the SVG content
const svgPath = path.join(process.cwd(), 'public', 'typeos.svg');
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Extract the path data from SVG (simplified for this example)
const typeosLogo = svgContent;

async function generateTypeOSImage() {
  try {
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            gap: '40px',
            padding: '60px',
          }}
        >
          {/* TypeOS SVG */}
          <div
            style={{
              width: '300px',
              height: '108px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            dangerouslySetInnerHTML={{ __html: typeosLogo }}
          />
          
          {/* TypeOS.com Text */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#000000',
              textAlign: 'center',
              letterSpacing: '2px',
            }}
          >
            typeos.com
          </div>
        </div>
      ),
      {
        width: 800,
        height: 600,
      }
    );

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save the image
    const outputPath = path.join(process.cwd(), 'public', 'typeos-card.png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ TypeOS image generated successfully at:', outputPath);
  } catch (error) {
    console.error('❌ Error generating image:', error);
  }
}

generateTypeOSImage();
