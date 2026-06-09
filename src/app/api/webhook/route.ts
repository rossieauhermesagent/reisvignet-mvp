import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { orderSwissVignette } from '@/lib/bots/swiss-bot';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    const kenteken = session.metadata?.kenteken;
    const productId = session.metadata?.productId;
    const email = session.customer_details?.email;

    console.log(`Betaling ontvangen voor ${kenteken} (${productId}) door ${email}`);

    // Als het een Zwitsers vignet is, start de bot
    if (productId === 'zwitserland-vignet' && kenteken) {
      // We draaien dit "fire and forget" op de achtergrond of awaiten het
      // Op Vercel moet je rekening houden met de 10s-30s timeout voor serverless functions
      try {
        const result = await orderSwissVignette({
          kenteken: kenteken,
          land: 'NL', // Standaard voor jouw NL klanten
          email: email || 'info@reisvignet.nl'
        });
        
        console.log(`Bot resultaat voor ${kenteken}:`, result);
      } catch (botError) {
        console.error(`Bot fail voor ${kenteken}:`, botError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
