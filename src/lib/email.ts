import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: (process.env.SMTP_HOST as string) || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
} as any);

export async function sendOrderConfirmation(email: string, orderDetails: {
  kenteken: string,
  country: string,
  orderNumber: string,
  vin?: string,
  hasImages?: boolean
}) {
  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.reisvignet.nl/webhook/order-confirmation';

  try {
    console.log(`Forwarding order to n8n webhook: ${N8N_WEBHOOK_URL}`);
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        ...orderDetails,
        timestamp: new Date().toISOString(),
        source: 'reisvignet-nextjs-webhook'
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    console.log('Successfully forwarded to n8n');
    return { success: true };
  } catch (error: any) {
    console.error('n8n Webhook Error:', error.message || error);
    // Behoud nodemailer als fallback of log het enkel
    return { success: false, error: error.message };
  }
}
