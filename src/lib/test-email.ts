import nodemailer from 'nodemailer';

async function testConnection() {
  console.log('--- SMTP DEBUG START ---');
  console.log('HOST:', process.env.SMTP_HOST);
  console.log('PORT:', process.env.SMTP_PORT);
  console.log('USER:', process.env.SMTP_USER);
  // We loggen niet het hele wachtwoord, maar wel de lengte om te zien of het matches
  console.log('PASS LENGTH:', process.env.SMTP_PASS?.length);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true, // Belangrijk voor uitvoerige logs
    logger: true,
  });

  try {
    console.log('Verbinding aan het testen...');
    await transporter.verify();
    console.log('✅ SMTP VERBINDING SUCCESVOL!');
    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'quincy@rossieau.com',
      subject: 'Debug Test',
      text: 'Als je dit leest werkt de SMTP verbinding.'
    });
    console.log('✅ TEST MAIL VERSTUURD!');
  } catch (error: any) {
    console.error('❌ FOUT BIJ VERBINDING:', error.message);
    if (error.response) console.error('SERVER RESPONSE:', error.response);
  }
}

testConnection();
