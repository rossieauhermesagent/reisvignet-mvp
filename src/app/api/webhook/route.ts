import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { orderSwissVignette } from '@/lib/bots/swiss-bot';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  console.log('--- Webhook Request Received ---');
  console.log('Signature:', signature ? 'Present' : 'MISSING');

  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      console.error('CRITICAL: STRIPE_WEBHOOK_SECRET is not defined in environment variables');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      secret
    );
    console.log('Event Type Verified:', event.type);
  } catch (err: any) {
    console.error('Webhook Verification Failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    console.log('Processing Session:', session.id);
    
    const kenteken = session.metadata?.kenteken;
    const productId = session.metadata?.productId;
    const vin = session.metadata?.vin;
    const email = session.customer_details?.email;
    const hasImages = session.metadata?.hasImages === 'true';

    console.log('Order Details:', { kenteken, productId, email });

    const countryMap: { [key: string]: string } = {
      'zwitserland-vignet': 'Zwitserland',
      'frankrijk-sticker': 'Frankrijk',
      'oostenrijk-vignet': 'Oostenrijk',
      'duitsland-sticker': 'Duitsland'
    };

    const country = countryMap[productId] || 'Europa';

    // 1. Stuur bevestiging naar klant én admin (Quincy)
    if (email && kenteken) {
      try {
        console.log(`Sending confirmation for order ${session.id} to ${email}`);
        await sendOrderConfirmation(email, {
          kenteken,
          country,
          orderNumber: session.id.slice(-8).toUpperCase(),
          vin,
          hasImages
        });
        console.log('Confirmation emails sent successfully');
      } catch (emailError: any) {
        console.error('Email Sending Error:', emailError.message || emailError);
      }
    }

    // 2. Als het een Zwitsers vignet is, start de bot (GEÏSOLEERD)
    if (productId === 'zwitserland-vignet' && kenteken) {
      // We gebruiken IIFE om de bot flow te isoleren van de hoofd-webhook respons
      (async () => {
        try {
          console.log(`Starting Swiss Automation Bot for ${kenteken}...`);
          const { orderSwissVignette: orderFn } = await import('@/lib/bots/swiss-bot');
          const result = await orderFn({
            kenteken: kenteken,
            land: 'NL',
            email: email || 'info@reisvignet.nl'
          });
          console.log(`Swiss Bot Result for ${kenteken}:`, result);
        } catch (botError: any) {
          console.error(`Swiss Bot Execution Error (Isolated):`, botError.message || botError);
        }
      })();
    }
  }

  return NextResponse.json({ received: true });
}
