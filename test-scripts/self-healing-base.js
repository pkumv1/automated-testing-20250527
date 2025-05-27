// Core self-healing implementation
class SelfHealingTest {
  constructor(page) {
    this.page = page;
    this.healingMetrics = { attempts: 0, healed: 0, failed: 0 };
  }

  async findElement(selectors) {
    this.healingMetrics.attempts++;
    
    // Tier 1: ID/data-testid
    if (selectors.id) {
      try {
        const el = await this.page.locator(`#${selectors.id}`).first();
        if (await el.count() > 0) return el;
      } catch (e) {}
    }
    
    if (selectors.testId) {
      try {
        const el = await this.page.locator(`[data-testid="${selectors.testId}"]`).first();
        if (await el.count() > 0) return el;
      } catch (e) {}
    }
    
    // Tier 2: CSS with context
    if (selectors.css) {
      try {
        const el = await this.page.locator(selectors.css).first();
        if (await el.count() > 0) {
          this.healingMetrics.healed++;
          return el;
        }
      } catch (e) {}
    }
    
    // Tier 3: XPath relative
    if (selectors.xpath) {
      try {
        const el = await this.page.locator(`xpath=${selectors.xpath}`).first();
        if (await el.count() > 0) {
          this.healingMetrics.healed++;
          return el;
        }
      } catch (e) {}
    }
    
    // Tier 4: Text matching
    if (selectors.text) {
      try {
        const el = await this.page.locator(`text=${selectors.text}`).first();
        if (await el.count() > 0) {
          this.healingMetrics.healed++;
          return el;
        }
      } catch (e) {}
    }
    
    // Tier 5: Visual pattern (minimal)
    if (selectors.role && selectors.name) {
      try {
        const el = await this.page.getByRole(selectors.role, { name: selectors.name }).first();
        if (await el.count() > 0) {
          this.healingMetrics.healed++;
          return el;
        }
      } catch (e) {}
    }
    
    // Tier 6: AI detection (fallback)
    if (selectors.nearText) {
      try {
        const nearEl = await this.page.locator(`text=${selectors.nearText}`).first();
        if (await nearEl.count() > 0) {
          const parent = await nearEl.locator('..');
          const el = await parent.locator(selectors.tag || '*').first();
          if (await el.count() > 0) {
            this.healingMetrics.healed++;
            return el;
          }
        }
      } catch (e) {}
    }
    
    this.healingMetrics.failed++;
    throw new Error(`Element not found: ${JSON.stringify(selectors)}`);
  }
  
  async click(selectors) {
    const element = await this.findElement(selectors);
    await element.click();
  }
  
  async fill(selectors, value) {
    const element = await this.findElement(selectors);
    await element.fill(value);
  }
  
  async waitAndClick(selectors, timeout = 5000) {
    const element = await this.findElement(selectors);
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
  }
}

module.exports = { SelfHealingTest };