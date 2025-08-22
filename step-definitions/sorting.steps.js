const { Then, When } = require('@cucumber/cucumber');
const { expect } = require('chai');
const HomePage = require('../pages/HomePage');

When('I check if the filter container is visible', async function () {
  const visible = await HomePage.isFilterContainerVisible(this.page);
  expect(visible).to.be.true;
});

Then('the filter container should have options:', async function (dataTable) {
  const expectedOptions = dataTable.raw().flat();
  const actualOptions = await HomePage.getFilterOptions(this.page);
  expect(actualOptions).to.deep.equal(expectedOptions);
});

When('I select the filter option {string}', async function (optionText) {
  await HomePage.selectFilterOption(this.page, optionText);
});

Then('the inventory items should be sorted by name descending \\(Z to A\\)', async function () {
  const names = await HomePage.getInventoryItemNames(this.page);
  const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
  console.log('Actual names:', names);
  console.log('Expected sorted names:', sortedNames);
  expect(names).to.deep.equal(sortedNames);
});

Then('the inventory item prices should be sorted ascending', async function () {
  const prices = await HomePage.getInventoryItemPrices(this.page);
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).to.deep.equal(sortedPrices);
});

Then('the inventory item prices should be sorted descending', async function () {
  const prices = await HomePage.getInventoryItemPrices(this.page);
  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).to.deep.equal(sortedPrices);
});

Then('the inventory item names and prices after sorting by price high to low are not equal to those after sorting by name descending', async function () {
  const highToLowPrices = await HomePage.getInventoryItemPrices(this.page);
  const highToLowNames = await HomePage.getInventoryItemNames(this.page);
  this.highToLowNames = highToLowNames;
  this.highToLowPrices = highToLowPrices;

  expect(highToLowNames).to.not.deep.equal(this.zToANames);
  expect(highToLowPrices).to.not.deep.equal(this.zToAPrices);
});

Then('the inventory item names and prices after sorting by name descending are saved', async function () {
  const zToANames = await HomePage.getInventoryItemNames(this.page);
  const zToAPrices = await HomePage.getInventoryItemPrices(this.page);
  this.zToANames = zToANames;
  this.zToAPrices = zToAPrices;

  expect(zToANames).to.have.length.greaterThan(0);
  expect(zToAPrices).to.have.length.greaterThan(0);

});

Then('the inventory item names should not be equal before and after sorting by price high to low', function () {
  expect(this.highToLowNames).to.not.deep.equal(this.zToANames);
});

Then('the inventory item prices should not be equal before and after sorting by price high to low', function () {
  expect(this.highToLowPrices).to.not.deep.equal(this.zToAPrices);
});
