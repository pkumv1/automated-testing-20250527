const { test } = require('@playwright/test');
const { SelfHealingTest } = require('../self-healing-base');

test('Critical Path: User Login', async ({ page }) => {
  const sh = new SelfHealingTest(page);
  
  await page.goto('http://localhost:8080/RTSservices');
  
  // Username field with multi-tier selectors
  await sh.fill({
    id: 'username',
    css: 'input[name="username"]',
    xpath: '//input[@placeholder="Username"]',
    text: 'Username',
    role: 'textbox',
    name: 'Username',
    nearText: 'Login ID',
    tag: 'input'
  }, 'testuser');
  
  // Password field
  await sh.fill({
    id: 'password',
    css: 'input[type="password"]',
    xpath: '//input[@placeholder="Password"]',
    role: 'textbox',
    name: 'Password',
    nearText: 'Password',
    tag: 'input'
  }, 'Test@123');
  
  // Login button
  await sh.click({
    id: 'loginBtn',
    css: 'button[type="submit"]',
    xpath: '//button[contains(text(), "Login")]',
    text: 'Login',
    role: 'button',
    name: 'Login',
    nearText: 'Password',
    tag: 'button'
  });
  
  // Verify dashboard
  await page.waitForURL('**/dashboard');
  console.log('Healing metrics:', sh.healingMetrics);
});