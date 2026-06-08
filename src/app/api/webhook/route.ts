import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: any;

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
    const session = event.data.object;
    const { kenteken, productId } = session.metadata;

    console.log(`ORDER ONTVANGEN: Kenteken: ${kenteken}, Product: ${productId}`);
    
    // Hier triggeren we later de Playwright bot
  }

  return NextResponse.json({ received: true });
}
