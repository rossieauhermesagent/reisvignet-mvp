import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // Forceer SSL voor poort 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  timeout: 10000, // 10 seconden timeout
});

export async function sendOrderConfirmation(email: string, orderDetails: {
  kenteken: string,
  country: string,
  orderNumber: string,
  vin?: string,
  hasImages?: boolean
}) {
  console.log(`Paging SMTP: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} as ${process.env.SMTP_USER}`);
  const customerMailOptions = {
    from: `"Reisvignet.nl" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `🚗 Bevestiging: Je aanvraag voor ${orderDetails.country} is ontvangen!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #222222;">
        <h1 style="color: #ff385c; font-size: 24px; font-weight: 900;">REISVIGNET.NL</h1>
        <p style="font-size: 18px; font-weight: 700;">Bedankt voor je bestelling!</p>
        <p>Je aanvraag voor <strong>${orderDetails.country}</strong> is in goede orde ontvangen. We gaan direct voor je aan de slag.</p>
        
        <div style="background-color: #f7f7f7; padding: 30px; border-radius: 24px; margin: 30px 0;">
          <table style="width: 100%;">
            <tr>
              <td style="color: #717171; font-size: 12px; text-transform: uppercase; font-weight: 800;">Kenteken</td>
              <td style="font-weight: 900; font-size: 18px;">${orderDetails.kenteken}</td>
            </tr>
            <tr>
              <td style="color: #717171; font-size: 12px; text-transform: uppercase; font-weight: 800; padding-top: 10px;">Land</td>
              <td style="font-weight: 900; font-size: 18px; padding-top: 10px;">${orderDetails.country}</td>
            </tr>
             <tr>
              <td style="color: #717171; font-size: 12px; text-transform: uppercase; font-weight: 800; padding-top: 10px;">Bestelnummer</td>
              <td style="font-weight: 700; font-size: 14px; padding-top: 10px;">#${orderDetails.orderNumber}</td>
            </tr>
          </table>
        </div>

        <p style="color: #717171; font-size: 14px; line-height: 1.6;">
          Zodra de registratie volledig is voltooid, ontvang je van ons een definitieve bevestiging. Heb je voor Frankrijk besteld? Dan versturen we de sticker per post naar je huisadres.
        </p>

        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />
        
        <p style="font-size: 12px; color: #999999; text-align: center;">
          Reisvignet.nl | Onderdeel van Rossieau Agent Network<br />
          Zorgeloos op reis door Europa.
        </p>
      </div>
    `,
  };

  // 2. Fallback mail naar Quincy/Admin
  const adminMailOptions = {
    from: `"Systeem" <${process.env.SMTP_USER}>`,
    to: "info@reisvignet.nl",
    subject: `🚨 NIEUWE BESTELLING: ${orderDetails.kenteken} (${orderDetails.country})`,
    html: `
      <h2>Nieuwe order binnengekomen</h2>
      <p><strong>Land:</strong> ${orderDetails.country}</p>
      <p><strong>Kenteken:</strong> ${orderDetails.kenteken}</p>
      <p><strong>Bestelnummer:</strong> ${orderDetails.orderNumber}</p>
      <p><strong>Klant e-mail:</strong> ${email}</p>
      ${orderDetails.vin ? `<p><strong>VIN:</strong> ${orderDetails.vin}</p>` : ''}
      ${orderDetails.hasImages ? `<p><strong>Documenten:</strong> Klant heeft foto's van kentekenbewijs geüpload (check Stripe Dashboard voor metadata indien geimplementeerd of later in DB).</p>` : ''}
      <hr />
      <p>Mocht de automatisering falen, verwerk dit dan handmatig.</p>
    `
  };

  await transporter.sendMail(customerMailOptions);
  return transporter.sendMail(adminMailOptions);
}
