const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const HomePage = require('../pages/HomePage');

class ShoppingCartPage {
  static shoppingCartLink = 'div#shopping_cart_container';
  static cartContentsContainer = 'div#cart_contents_container';
  static cartItemNames = 'div.cart_list div.inventory_item_name';
  static removeButtons = 'button.cart_button';
  static checkoutButton = 'div.cart_footer button.checkout_button';

  static async goToCart(page) {
    await page.click(this.shoppingCartLink);
    await page.waitForSelector(this.cartContentsContainer, { state: 'visible' });
  }

  static async getCartItemNames(page) {
    const elements = await page.$$(this.cartItemNames);
    const names = [];
    for (const el of elements) {
      names.push((await el.textContent()).trim());
    }
    return names;
  }

  static async removeItemByIndex(page, index) {
    const buttons = await page.$$(this.removeButtons);
    if (buttons.length > index) {
      await buttons[index].click();
      await page.waitForTimeout(500);
    }
  }

  static async clickCheckout(page) {
    await page.click(this.checkoutButton);
    await page.waitForSelector('div#checkout_info_container', { state: 'visible' });
  }
}

class CheckoutPage {
  static checkoutInfoContainer = 'div#checkout_info_container';
  static formInputs = 'div.form_group input.input_error.form_input';
  static submitButton = 'div.checkout_buttons input.submit-button';

  static async fillCheckoutForm(page, firstName, lastName, postalCode) {
    const inputs = await page.$$(this.formInputs);
    if (inputs.length >= 3) {
      await inputs[0].fill(firstName);
      await inputs[1].fill(lastName);
      await inputs[2].fill(postalCode);
    }
  }

  static async submitCheckout(page) {
    await page.click(this.submitButton);
  }
}

class CheckoutOverviewPage {
  static checkoutSummaryContainer = 'div#checkout_summary_container';
  static cartItemNames = 'div.cart_list div.inventory_item_name';
  static finishButton = 'div.cart_footer button#finish';

  static async isVisible(page) {
    return await page.isVisible(this.checkoutSummaryContainer);
  }

  static async getCartItemNames(page) {
    const elements = await page.$$(this.cartItemNames);
    const names = [];
    for (const el of elements) {
      names.push((await el.textContent()).trim());
    }
    return names;
  }

  static async clickFinish(page) {
    await page.click(this.finishButton);
  }
}

class CheckoutCompletePage {
  static header = 'div#checkout_complete_container h2';
  static completeText = 'div#checkout_complete_container div.complete-text';

  static async getHeaderText(page) {
    return (await page.textContent(this.header)).trim();
  }

  static async getCompleteText(page) {
    return (await page.textContent(this.completeText)).trim();
  }
}

When('I add the first two inventory items to the cart', async function () {
  const buttons = await this.page.$$('.inventory_item button.btn_inventory');
  expect(buttons.length).to.be.at.least(2);
  await buttons[0].click();
  await buttons[1].click();
});

When('I go to the shopping cart container', async function () {
  await ShoppingCartPage.goToCart(this.page);
});

Then('I should see the first two added items in the cart', async function () {
  const cartItems = await ShoppingCartPage.getCartItemNames(this.page);
  expect(cartItems.length).to.equal(2);

  const inventoryNames = await this.page.$$eval('div.inventory_item_name', els => els.slice(0, 2).map(e => e.textContent.trim()));
  expect(cartItems).to.deep.equal(inventoryNames);
});

When('I remove the second item from the cart', async function () {
  await ShoppingCartPage.removeItemByIndex(this.page, 1);
});

Then('only the first item should remain in the cart', async function () {
  const cartItems = await ShoppingCartPage.getCartItemNames(this.page);
  expect(cartItems.length).to.equal(1);

  const firstInventoryName = await this.page.$eval('div.inventory_item_name', el => el.textContent.trim());
  expect(cartItems[0]).to.equal(firstInventoryName);
});

When('I proceed to checkout with details:', async function (dataTable) {
  const data = dataTable.rowsHash();
  await ShoppingCartPage.clickCheckout(this.page);

  await this.page.waitForSelector(CheckoutPage.checkoutInfoContainer, { state: 'visible' });
  await CheckoutPage.fillCheckoutForm(this.page, data.FirstName, data.LastName, data.PostalCode);
  await CheckoutPage.submitCheckout(this.page);
});

Then('I should see the checkout overview page with added item', async function () {
  const isVisible = await CheckoutOverviewPage.isVisible(this.page);
  expect(isVisible).to.be.true;

  const overviewItems = await CheckoutOverviewPage.getCartItemNames(this.page);

  const inventoryNames = await this.page.$$eval('div.inventory_item_name', els => els.map(e => e.textContent.trim()));
  expect(overviewItems.length).to.be.above(0);
  expect(overviewItems).to.deep.equal(inventoryNames);
});

When('I finish the checkout process', async function () {
  await CheckoutOverviewPage.clickFinish(this.page);
});

Then('I should see the order completion message', async function () {
  await this.page.waitForSelector(CheckoutCompletePage.header);
  const headerText = await CheckoutCompletePage.getHeaderText(this.page);
  expect(headerText).to.equal('Thank you for your order!');

  const completeText = await CheckoutCompletePage.getCompleteText(this.page);
  expect(completeText).to.equal('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});
