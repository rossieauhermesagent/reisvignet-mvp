import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const kenteken = searchParams.get('kenteken')?.toUpperCase();

  if (!kenteken) {
    return NextResponse.json({ error: 'Geen kenteken opgegeven' }, { status: 400 });
  }

  try {
    // We zoeken in Stripe naar voltooide sessies met dit kenteken in de metadata
    const sessions = await stripe.checkout.sessions.list({
      limit: 5,
      expand: ['data.payment_intent'],
    });

    const order = sessions.data.find(s => s.metadata?.kenteken === kenteken && s.payment_status === 'paid');

    if (!order) {
      return NextResponse.json({ 
        status: 'niet_gevonden', 
        message: 'Geen actieve bestelling gevonden voor dit kenteken.' 
      });
    }

    return NextResponse.json({
      status: 'voltooid',
      kenteken: order.metadata?.kenteken,
      productId: order.metadata?.productId,
      timestamp: order.created,
      message: 'Je vignet is succesvol geactiveerd en gekoppeld aan de officiële instanties.'
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
