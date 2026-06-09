import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { productId, kenteken } = await request.json();

    const prices: Record<string, { price: string, name: string }> = {
      'frankrijk-sticker': { price: 'price_FR_STICKER', name: 'Milieusticker Frankrijk' },
      'zwitserland-vignet': { price: 'price_CH_VIGNET', name: 'E-vignet Zwitserland' },
    };

    const product = prices[productId];

    const session = await stripe.checkout.sessions.create({
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
      },
    });

    return NextResponse.json({ sessionId: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
