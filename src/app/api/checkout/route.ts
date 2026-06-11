import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { productId, kenteken, vin, frontImage, backImage } = await request.json();

    const prices: Record<string, { price: string, name: string }> = {
      'frankrijk-sticker': { price: 'price_FR_STICKER', name: 'Milieusticker Frankrijk' },
      'zwitserland-vignet': { price: 'price_CH_VIGNET', name: 'E-vignet Zwitserland' },
    };

    const product = prices[productId];

    // Bij Frankrijk voegen we de extra documenten toe in metadata
    // Let op: Stripe metadata heeft limiet van 500 chars per value. 
    // Voor echte grote images gebruiken we normaal Cloudinary/S3, 
    // maar voor dit stadium markeren we aanwezigheid of gebruiken we Stripe Files API indien nodig.
    // Voor nu sturen we VIN mee en zetten we een flag voor images.
    
    const sessionConfig: any = {
      payment_method_types: ['ideal', 'card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${product.name} (${kenteken})`,
            },
            unit_amount: productId === 'frankrijk-sticker' ? 1995 : 4995,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/`,
      metadata: {
        kenteken,
        productId,
        vin: vin || '',
        hasImages: frontImage ? 'true' : 'false'
      },
    };

    // Als we images hebben, kunnen we die niet direct in metadata proppen (te groot).
    // In een serieuzere setup zouden we ze hier uploaden naar een storage bucket 
    // en de URL in metadata zetten.
    
    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log(`Checkout Session created: ${session.id} for ${kenteken}`);

    return NextResponse.json({ sessionId: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
