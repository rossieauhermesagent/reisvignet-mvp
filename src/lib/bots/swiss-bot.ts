import { chromium } from 'playwright';

/**
 * Automatisering voor het Zwitserse E-vignet via via.admin.ch
 */
export async function orderSwissVignette(orderData: {
  kenteken: string,
  land: string,
  email: string
}) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://via.admin.ch/shop/dashboard');
    await page.click('text=E-vignette');
    await page.selectOption('select[name="category"]', 'MOTOR_VEHICLE');
    await page.selectOption('select[name="country"]', orderData.land);
    await page.fill('input[name="licensePlate"]', orderData.kenteken);
    await page.fill('input[name="licensePlateConfirmation"]', orderData.kenteken);
    await page.click('button:has-text("Next")');
    await page.fill('input[name="email"]', orderData.email);

    console.log(`Bot heeft velden ingevuld voor ${orderData.kenteken}`);
    return { success: true, message: "Aanvraag voorbereid op portaal" };
  } catch (error: any) {
    console.error("Bot Error:", error);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}
