import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { orderSwissVignette } from '@/lib/bots/swiss-bot';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(req: Request) {
...[truncated]
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

    // Als de betaling is gelukt, stuur bevestiging en start eventuele bot
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const kenteken = session.metadata?.kenteken;
      const productId = session.metadata?.productId;
      const email = session.customer_details?.email;

      const countryMap: { [key: string]: string } = {
        'zwitserland-vignet': 'Zwitserland',
        'frankrijk-sticker': 'Frankrijk',
        'oostenrijk-vignet': 'Oostenrijk',
        'duitsland-sticker': 'Duitsland'
      };

      const country = countryMap[productId] || 'Europa';

      // 1. Stuur direct de e-mail bevestiging
      if (email && kenteken) {
        await sendOrderConfirmation(email, {
          kenteken,
          country,
          orderNumber: session.id.slice(-8).toUpperCase()
        });
      }

      // 2. Als het een Zwitsers vignet is, start de bot
      if (productId === 'zwitserland-vignet' && kenteken) {
...[truncated]
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
