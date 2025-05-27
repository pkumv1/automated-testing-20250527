const { test } = require('@playwright/test');

test('Chaos: Network Latency', async ({ page, context }) => {
  // Inject 500ms latency
  await context.route('**/*', route => {
    setTimeout(() => route.continue(), 500);
  });
  
  await page.goto('http://localhost:8080/RTSservices');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'Test@123');
  await page.click('#loginBtn');
  
  // Verify still works under latency
  await page.waitForURL('**/dashboard', { timeout: 10000 });
});