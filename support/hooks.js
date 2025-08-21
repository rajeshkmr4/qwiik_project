const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

setDefaultTimeout(90 * 1000);

let browser;
const sharedContexts = new Map();

BeforeAll(async function () {
  try {
    console.log('BeforeAll: launching browser');
    browser = await chromium.launch({ headless: false, slowMo: 50 });
  } catch (error) {
    console.error('Failed to launch browser:', error.message);
    throw error;
  }
});

async function createSharedContext(tagName) {
  try {
    console.log(`Creating new context for ${tagName}`);
    const context = await browser.newContext();
    const page = await context.newPage();
    
    console.log(`Logging in for ${tagName}`);
    await LoginPage.navigate(page);
    await LoginPage.login(page, 'standard_user', 'secret_sauce');
    console.log('Logged in successfully');
    
    return { context, page };
  } catch (error) {
    console.error(`Failed to create context for ${tagName}:`, error.message);
    throw error;
  }
}

Before(async function (scenario) {
  try {
    this.scenario = scenario;
    
    const SHARED_KEY = 'SHARED_CONTEXT';
    
    if (!sharedContexts.has(SHARED_KEY)) {
      const contextData = await createSharedContext('ALL_TESTS');
      sharedContexts.set(SHARED_KEY, contextData);
    }
    
    const { context, page } = sharedContexts.get(SHARED_KEY);
    this.context = context;
    this.page = page;
  } catch (error) {
    console.error('Failed to setup scenario context:', error.message);
    throw error;
  }
});

After(async function (scenario) {
  try {
    if (scenario.pickle.tags.some(tag => tag.name === '@TC_004')) {
      const isMenuOpen = await HomePage.isMenuVisible(this.page);
      if (isMenuOpen) {
        await HomePage.closeMenu(this.page);
      }
    }
    
  } catch (error) {
    console.error('Cleanup error:', error.message);
  }
});

AfterAll(async function () {
  try {
    for (const [tagName, { context, page }] of sharedContexts) {
      console.log(`Closing context for ${tagName}`);
      if (page) await page.close();
      if (context) await context.close();
    }
    sharedContexts.clear();
    
    if (browser) await browser.close();
    console.log('Browser closed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error.message);
  }
});
