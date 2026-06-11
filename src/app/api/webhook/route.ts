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
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
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
        console.log(`Attempting to send email to customer (${email}) and admin...`);
        await sendOrderConfirmation(email, {
          kenteken,
          country,
          orderNumber: session.id.slice(-8).toUpperCase(),
          vin,
          hasImages
        });
        console.log('Emails successfully queued/sent');
      } catch (emailError: any) {
        console.error('CRITICAL: Email Sending Failed:', emailError.message);
      }
    }

    // 2. Als het een Zwitsers vignet is, start de bot
    if (productId === 'zwitserland-vignet' && kenteken) {
      try {
        console.log(`Starting Swiss Automation Bot for ${kenteken}...`);
        const result = await orderSwissVignette({
          kenteken: kenteken,
          land: 'NL',
          email: email || 'info@reisvignet.nl'
        });
        console.log(`Swiss Bot Result for ${kenteken}:`, result);
      } catch (botError: any) {
        console.error(`Swiss Bot Error for ${kenteken}:`, botError.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
