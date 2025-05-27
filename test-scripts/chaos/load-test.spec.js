const { test } = require('@playwright/test');

test('Chaos: Concurrent Users', async ({ browser }) => {
  const contexts = [];
  const pages = [];
  
  // Simulate 5 concurrent users
  for (let i = 0; i < 5; i++) {
    const context = await browser.newContext();
    const page = await context.newPage();
    contexts.push(context);
    pages.push(page);
  }
  
  // All users login simultaneously
  await Promise.all(pages.map(async (page, i) => {
    await page.goto('http://localhost:8080/RTSservices');
    await page.fill('#username', `user${i}`);
    await page.fill('#password', 'Test@123');
    await page.click('#loginBtn');
  }));
  
  // Cleanup
  for (const context of contexts) {
    await context.close();
  }
});