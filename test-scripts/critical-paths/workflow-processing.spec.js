const { test } = require('@playwright/test');
const { SelfHealingTest } = require('../self-healing-base');

test('Critical Path: Workflow Processing', async ({ page }) => {
  const sh = new SelfHealingTest(page);
  
  // Officer login
  await page.goto('http://localhost:8080/RTSservices');
  await sh.fill({ id: 'username', css: 'input[name="username"]' }, 'officer1');
  await sh.fill({ id: 'password', css: 'input[type="password"]' }, 'Officer@123');
  await sh.click({ id: 'loginBtn', css: 'button[type="submit"]' });
  
  // Navigate to workflow
  await sh.click({
    text: 'Pending Tasks',
    css: 'a[href*="workflow"]',
    role: 'link'
  });
  
  // Select first task
  await sh.click({
    css: 'tr.task-row:first-child',
    xpath: '//table[@id="taskList"]//tr[2]',
    nearText: 'Task ID'
  });
  
  // Assign to self
  await sh.click({
    id: 'assignToMe',
    text: 'Assign to Me',
    css: 'button[name="assign"]'
  });
  
  // Add comments
  await sh.fill({
    id: 'comments',
    css: 'textarea[name="comments"]',
    nearText: 'Comments'
  }, 'Processing application');
  
  // Approve
  await sh.click({
    id: 'approveBtn',
    text: 'Approve',
    css: 'button[name="approve"]',
    role: 'button'
  });
  
  console.log('Healing metrics:', sh.healingMetrics);
});