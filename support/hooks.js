const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(90 * 1000);

let browser;
let tc003Context;
let tc003Page;
let tc004Context;
let tc004Page;

BeforeAll(async function () {
  console.log('BeforeAll: launching browser');
  browser = await chromium.launch({ headless: false, slowMo: 50 });
});

Before(async function (scenario) {
  this.scenario = scenario;
  
  if (scenario.pickle.tags.some(tag => tag.name === '@TC003')) {
    if (!tc003Context) {
      console.log('Before: creating new context for TC003');
      tc003Context = await browser.newContext();
      tc003Page = await tc003Context.newPage();
      
      console.log('Logging in for TC_003');
      const LoginPage = require('../pages/LoginPage');
      await LoginPage.navigate(tc003Page);
      await LoginPage.login(tc003Page, 'standard_user', 'secret_sauce');
      console.log('Logged in successfully');
    }
    this.context = tc003Context;
    this.page = tc003Page;
  } else if (scenario.pickle.tags.some(tag => tag.name === '@TC_004')) {
    if (!tc004Context) {
      console.log('Before: creating new context for TC004');
      tc004Context = await browser.newContext();
      tc004Page = await tc004Context.newPage();
      
      console.log('Logging in for TC_004');
      const LoginPage = require('../pages/LoginPage');
      await LoginPage.navigate(tc004Page);
      await LoginPage.login(tc004Page, 'standard_user', 'secret_sauce');
      console.log('Logged in successfully');
    }
    this.context = tc004Context;
    this.page = tc004Page;
  } else {
    console.log('Before: creating new page for scenario');
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
  }
});

After(async function (scenario) {
  if (scenario.pickle.tags.some(tag => tag.name === '@TC_004')) {
    try {
      const HomePage = require('../pages/HomePage');
      const isMenuOpen = await HomePage.isMenuVisible(this.page);
      if (isMenuOpen) {
        await HomePage.closeMenu(this.page);
      }
    } catch (error) {
      console.log('Menu cleanup error:', error.message);
    }
  }
  
  if (!scenario.pickle.tags.some(tag => tag.name === '@TC003') && 
      !scenario.pickle.tags.some(tag => tag.name === '@TC_004')) {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
  }
});

AfterAll(async function () {
  if (tc003Page) await tc003Page.close();
  if (tc003Context) await tc003Context.close();
  if (tc004Page) await tc004Page.close();
  if (tc004Context) await tc004Context.close();
  if (browser) await browser.close();
});
