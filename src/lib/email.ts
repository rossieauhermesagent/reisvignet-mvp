import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderConfirmation(email: string, orderDetails: {
  kenteken: string,
  country: string,
  orderNumber: string
}) {
  const mailOptions = {
    from: `"Reisvignet.nl" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `🚗 Bevestiging: Je vignet voor ${orderDetails.country} is actief!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #222222;">
        <h1 style="color: #ff385c; font-size: 24px; font-weight: 900;">REISVIGNET.NL</h1>
        <p style="font-size: 18px; font-weight: 700;">Bedankt voor je bestelling!</p>
        <p>Goed nieuws: je vignet is succesvol geactiveerd en gekoppeld aan de officiële instanties.</p>
        
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
          Je kunt vanaf nu zorgeloos gebruik maken van de snelwegen in ${orderDetails.country}. Er is geen fysieke sticker meer nodig op de ruit; de controle vindt plaats op basis van je kenteken.
        </p>

        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />
        
        <p style="font-size: 12px; color: #999999; text-align: center;">
          Reisvignet.nl | Onderdeel van Rossieau Agent Network<br />
          Zorgeloos op reis door Europa.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
