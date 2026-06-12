import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
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
    const { kenteken, productId, email, vin, images } = session.metadata || {};
    const hasImages = !!(images && images !== '[]');
    const imageHashes = hasImages ? JSON.parse(images) : [];

    console.log('Order Details:', { kenteken, productId, email });

    const countryMap: { [key: string]: string } = {
      'zwitserland-vignet': 'Zwitserland',
      'frankrijk-sticker': 'Frankrijk',
      'oostenrijk-vignet': 'Oostenrijk',
      'duitsland-sticker': 'Duitsland'
    };

    const country = countryMap[productId] || 'Europa';

    // 1. Stuur data naar n8n
    if (email && kenteken) {
      try {
        console.log(`Sending confirmation for order ${session.id} to ${email}`);
        await sendOrderConfirmation(email, {
          kenteken,
          country,
          orderNumber: session.id.slice(-8).toUpperCase(),
          vin,
          hasImages,
          imageHashes, // Nieuw: stuur hashes mee voor n8n
          customerDetails: session.customer_details // Nieuw: stuur adresgegevens van Stripe mee
        });
        console.log('Forwarded to n8n successfully');
      } catch (emailError: any) {
        console.error('n8n Forwarding Error:', emailError.message || emailError);
      }
    }


  return NextResponse.json({ received: true });
}
