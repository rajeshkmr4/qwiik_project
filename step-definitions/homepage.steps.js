const { Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const HomePage = require('../pages/HomePage');

Then('header should display {string}', async function (expectedText) {
  const headerText = await HomePage.getHeaderText(this.page);
  expect(headerText.trim()).to.equal(expectedText);
});

Then('primary container should display shopping cart and burger menu', async function () {
  const cartVisible = await HomePage.isShoppingCartVisible(this.page);
  const burgerVisible = await HomePage.isBurgerButtonVisible(this.page);
  expect(cartVisible).to.be.true;
  expect(burgerVisible).to.be.true;
});

Then('six inventory items should be displayed with add to cart button and price format', async function () {
  const items = await HomePage.getInventoryItems(this.page);
  expect(items.length).to.equal(6);

  const addButtons = await HomePage.getAddToCartButtons(this.page);
  expect(addButtons.length).to.equal(items.length);

  const prices = await HomePage.getPriceTexts(this.page);
  const priceRegex = /^\$\d+(\.\d{2})?$/;
  for (const price of prices) {
    expect(priceRegex.test(price.trim())).to.be.true;
  }
});

Then('footer should display {string}', async function (expectedFooter) {
  const footerText = await HomePage.getFooterText(this.page);
  expect(footerText.trim()).to.equal(expectedFooter);
});
