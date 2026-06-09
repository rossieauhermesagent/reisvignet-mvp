import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

/**
 * Verbeterde automatisering voor het Zwitserse E-vignet met error handling en logging
 */
export async function orderSwissVignette(orderData: {
  kenteken: string,
  land: string,
  email: string
}) {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotDir = path.join(process.cwd(), 'screenshots', orderData.kenteken);

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    console.log(`[Bot] Start aanvraag voor ${orderData.kenteken}...`);
    
    // Stap 1: Dashboard
    await page.goto('https://via.admin.ch/shop/dashboard', { waitUntil: 'networkidle' });
    
    // Check of we op de juiste pagina zijn
    if (await page.getByText('E-vignette').isVisible()) {
      await page.click('text=E-vignette');
    } else {
      throw new Error("Kon E-vignette knop niet vinden op dashboard");
    }

    // Stap 2: Voertuiggegevens
    await page.waitForSelector('select[name="category"]');
    await page.selectOption('select[name="category"]', 'MOTOR_VEHICLE');
    await page.selectOption('select[name="country"]', 'NL'); // Altijd NL voor jouw doelgroep
    
    await page.fill('input[name="licensePlate"]', orderData.kenteken);
    await page.fill('input[name="licensePlateConfirmation"]', orderData.kenteken);
    
    // Screenshot na invullen
    await page.screenshot({ path: path.join(screenshotDir, `${timestamp}-step1-filled.png`) });

    // Check op foutmeldingen (bijv. al geregistreerd)
    await page.click('button:has-text("Next"), button:has-text("Suivant"), button:has-text("Weiter")');
    
    // Wacht op eventuele validatiefouten
    await page.waitForTimeout(2000); 
    const errorExists = await page.locator('.error-message, .alert-danger').isVisible();
    if (errorExists) {
      const errorText = await page.locator('.error-message, .alert-danger').innerText();
      await page.screenshot({ path: path.join(screenshotDir, `${timestamp}-error.png`) });
      return { success: false, error: `Portaal fout: ${errorText}` };
    }

    // Stap 3: Email
    await page.waitForSelector('input[name="email"]');
    await page.fill('input[name="email"]', orderData.email);
    
    await page.screenshot({ path: path.join(screenshotDir, `${timestamp}-step2-complete.png`) });

    console.log(`[Bot] Succesvol velden klaargezet voor ${orderData.kenteken}`);
    return { 
      success: true, 
      message: "Order succesvol voorbereid op het officiële portaal.",
      screenshotPath: screenshotDir
    };

  } catch (error: any) {
    console.error(`[Bot Error] ${orderData.kenteken}:`, error.message);
    await page.screenshot({ path: path.join(screenshotDir, `${timestamp}-crash.png`) });
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}
