const { test } = require('@playwright/test');
const { SelfHealingTest } = require('../self-healing-base');

test('Critical Path: Document Submission', async ({ page }) => {
  const sh = new SelfHealingTest(page);
  
  // Login first
  await page.goto('http://localhost:8080/RTSservices');
  await sh.fill({ id: 'username', css: 'input[name="username"]' }, 'testuser');
  await sh.fill({ id: 'password', css: 'input[type="password"]' }, 'Test@123');
  await sh.click({ id: 'loginBtn', css: 'button[type="submit"]' });
  
  // Navigate to document submission
  await sh.click({
    text: 'Submit Document',
    css: 'a[href*="document"]',
    role: 'link'
  });
  
  // Document type selection
  await sh.click({
    id: 'documentType',
    css: 'select[name="documentType"]',
    nearText: 'Document Type'
  });
  
  await sh.click({
    text: 'RTI Application',
    css: 'option[value="rti"]'
  });
  
  // File upload
  const fileInput = await sh.findElement({
    css: 'input[type="file"]',
    xpath: '//input[@accept=".pdf,.doc,.docx"]',
    nearText: 'Upload Document'
  });
  
  await fileInput.setInputFiles('test-data/sample.pdf');
  
  // Metadata
  await sh.fill({
    id: 'subject',
    css: 'input[name="subject"]',
    nearText: 'Subject'
  }, 'Test RTI Application');
  
  // Submit
  await sh.click({
    id: 'submitDocument',
    css: 'button[type="submit"]',
    text: 'Submit',
    role: 'button'
  });
  
  console.log('Healing metrics:', sh.healingMetrics);
});