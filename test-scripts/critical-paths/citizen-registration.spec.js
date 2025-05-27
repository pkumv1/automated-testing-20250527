const { test } = require('@playwright/test');
const { SelfHealingTest } = require('../self-healing-base');

test('Critical Path: Citizen Registration', async ({ page }) => {
  const sh = new SelfHealingTest(page);
  
  await page.goto('http://localhost:8080/RTSservices/pages/citizendocument');
  
  // Registration link
  await sh.click({
    id: 'registerLink',
    css: 'a[href*="register"]',
    text: 'Register',
    role: 'link',
    name: 'Register New Citizen'
  });
  
  // Fill registration form
  await sh.fill({
    id: 'firstName',
    css: 'input[name="firstName"]',
    xpath: '//input[@placeholder="First Name"]',
    nearText: 'First Name',
    tag: 'input'
  }, 'John');
  
  await sh.fill({
    id: 'lastName',
    css: 'input[name="lastName"]',
    nearText: 'Last Name',
    tag: 'input'
  }, 'Doe');
  
  await sh.fill({
    id: 'email',
    css: 'input[type="email"]',
    nearText: 'Email',
    tag: 'input'
  }, 'john.doe@test.com');
  
  await sh.fill({
    id: 'mobile',
    css: 'input[name="mobile"]',
    nearText: 'Mobile',
    tag: 'input'
  }, '9876543210');
  
  // Submit registration
  await sh.click({
    id: 'submitRegistration',
    css: 'button[type="submit"]',
    text: 'Submit',
    role: 'button'
  });
  
  console.log('Healing metrics:', sh.healingMetrics);
});