const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');

Given('I am on the login page for invalid test', async function () {
  await LoginPage.navigate(this.page);
});

When('I enter invalid username {string} and password {string}', async function (username, password) {
  await LoginPage.login(this.page, username, password);
});

When('I click the login button for invalid test', async function () {
  await this.page.click(LoginPage.loginButton);
});
