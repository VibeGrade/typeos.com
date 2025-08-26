import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateEnhancedTypeOSImage() {
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
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
          },
          children: [
            // Background decoration
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 30% 20%, rgba(255, 107, 0, 0.1) 0%, transparent 50%)',
                }
              }
            },
            // Main content card
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: 24,
                  padding: 80,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  gap: 40,
                  position: 'relative',
                  zIndex: 1,
                },
                children: [
                  // Y Combinator badge
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        backgroundColor: 'rgba(255, 107, 0, 0.1)',
                        padding: '12px 24px',
                        borderRadius: 50,
                        marginBottom: 20,
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: 24,
                              height: 24,
                              backgroundColor: '#ff6b00',
                              borderRadius: 4,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: 14,
                              fontWeight: 'bold',
                            },
                            children: 'Y'
                          }
                        },
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontSize: 18,
                              color: '#666',
                              fontWeight: '600',
                            },
                            children: 'Backed by Y Combinator'
                          }
                        }
                      ]
                    }
                  },
                  // TypeOS Title
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: 84,
                        fontWeight: 'bold',
                        color: '#000000',
                        letterSpacing: '2px',
                        textAlign: 'center',
                        lineHeight: 1.1,
                      },
                      children: 'TypeOS'
                    }
                  },
                  // Description
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: 28,
                        fontWeight: 'normal',
                        color: '#666666',
                        textAlign: 'center',
                        lineHeight: 1.4,
                        maxWidth: 600,
                      },
                      children: 'Work with AI directly in Google Docs and your Browser'
                    }
                  },
                  // Website URL
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: 36,
                        fontWeight: '600',
                        color: '#000000',
                        textAlign: 'center',
                        letterSpacing: '1px',
                        marginTop: 20,
                      },
                      children: 'typeos.com'
                    }
                  }
                ]
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
    
    // Save the enhanced image
    const outputPath = path.join(__dirname, '..', 'public', 'typeos-enhanced.png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ Enhanced TypeOS image generated successfully at:', outputPath);
    console.log('🎨 Features: Y Combinator badge, gradient background, card design');
    console.log('📏 Dimensions: 1200x630px (social media ready)');
  } catch (error) {
    console.error('❌ Error generating enhanced image:', error);
  }
}

generateEnhancedTypeOSImage();
