const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');

Given('I am on the login page', async function () {
  if (this.scenario && this.scenario.pickle.tags.some(tag => tag.name === '@TC_004')) {
    const currentUrl = this.page.url();
    if (currentUrl.includes('inventory.html')) {
      return;
    }
  }
  await LoginPage.navigate(this.page);
});

When('I enter username {string} and password {string}', async function (username, password) {
  if (this.scenario && this.scenario.pickle.tags.some(tag => tag.name === '@TC_004')) {
    const currentUrl = this.page.url();
    if (currentUrl.includes('inventory.html')) {
      return;
    }
  }
  await LoginPage.login(this.page, username, password);
});

Then('I should see the home page', async function () {
  if (this.scenario && this.scenario.pickle.tags.some(tag => tag.name === '@TC_004')) {
    const currentUrl = this.page.url();
    expect(currentUrl).to.include('inventory.html');
    return;
  }
  const headerText = await this.page.textContent('.app_logo');
  expect(headerText.trim()).to.equal('Swag Labs');
});

Then('I should see the error message {string}', async function (expectedMessage) {
  const actualMessage = await LoginPage.getErrorMessage(this.page);
  expect(actualMessage.trim()).to.equal(expectedMessage);
});
