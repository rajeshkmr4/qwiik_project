// steps/menu.steps.js
const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const HomePage = require('../pages/HomePage');

When('I open the burger menu', async function () {
  await HomePage.openMenu(this.page);
});

Then('the menu should display the following options:', async function (dataTable) {
  const expectedOptions = dataTable.raw().flat();
  const actualOptions = await HomePage.getMenuOptions(this.page);

  expect(actualOptions).to.deep.equal(expectedOptions);
});

When('I close the burger menu', async function () {
  await HomePage.closeMenu(this.page);
});

Then('the menu should be closed', async function () {
  const isVisible = await HomePage.isMenuVisible(this.page);
  expect(isVisible).to.be.false;
});
