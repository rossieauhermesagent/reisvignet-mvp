import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { orderSwissVignette } from '@/lib/bots/swiss-bot';
import { sendOrderConfirmation } from '@/lib/email';

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
    const vin = session.metadata?.vin;
    const email = session.customer_details?.email;
    const hasImages = session.metadata?.hasImages === 'true';

    const countryMap: { [key: string]: string } = {
      'zwitserland-vignet': 'Zwitserland',
      'frankrijk-sticker': 'Frankrijk',
      'oostenrijk-vignet': 'Oostenrijk',
      'duitsland-sticker': 'Duitsland'
    };

    const country = countryMap[productId] || 'Europa';

    // 1. Stuur bevestiging naar klant én admin (Quincy)
    if (email && kenteken) {
      await sendOrderConfirmation(email, {
        kenteken,
        country,
        orderNumber: session.id.slice(-8).toUpperCase(),
        vin,
        hasImages
      });
    }

    // 2. Als het een Zwitsers vignet is, start de bot
    if (productId === 'zwitserland-vignet' && kenteken) {
      try {
        const result = await orderSwissVignette({
          kenteken: kenteken,
          land: 'NL',
          email: email || 'info@reisvignet.nl'
        });
        console.log(`Bot resultaat voor ${kenteken}:`, result);
      } catch (botError) {
        console.error(`Bot fail voor ${kenteken}:`, botError);
      }
    }
    
    // Voor Frankrijk is er momenteel nog geen bot, 
    // dus de fallback mail naar Quincy is hier de primaire 'verwerking'.
  }

  return NextResponse.json({ received: true });
}
