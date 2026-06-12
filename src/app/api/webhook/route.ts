import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  console.log('--- Webhook Request Received ---');

  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Destructure metadata
    const { kenteken, productId, vin, images } = session.metadata || {};
    const email = session.customer_details?.email;
    const hasImages = !!(images && images !== '[]');
    const imageHashes = hasImages ? JSON.parse(images) : [];

    const countryMap: { [key: string]: string } = {
      'zwitserland-vignet': 'Zwitserland',
      'frankrijk-sticker': 'Frankrijk',
      'oostenrijk-vignet': 'Oostenrijk',
      'duitsland-sticker': 'Duitsland'
    };

    const country = countryMap[productId] || 'Europa';

    if (email && kenteken) {
      try {
        await sendOrderConfirmation(email, {
          kenteken,
          country,
          orderNumber: session.id.slice(-8).toUpperCase(),
          vin,
          hasImages,
          imageHashes, 
          customerDetails: session.customer_details 
        });
      } catch (emailError: any) {
        console.error('Email error:', emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
