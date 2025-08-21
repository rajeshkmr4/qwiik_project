class HomePage {
  static primaryHeaderText = '.app_logo';
  static shoppingCart = '.shopping_cart_link';
  static burgerButton = '#react-burger-menu-btn';
  static inventoryContainer = '.inventory_item';
  static addToCartButton = '.inventory_item button.btn_inventory';
  static priceElement = '.inventory_item_price';
  static inventoryList = '.inventory_list';
  static footer = '.footer_copy';

  static burgerMenuButton = '#react-burger-menu-btn';
  static menuWrap = '.bm-menu-wrap';
  static menuOptions = '.bm-item-list .bm-item';
  static closeButton = '#react-burger-cross-btn';

  static filterContainer = 'select.product_sort_container';
  static filterOptions = 'select.product_sort_container option';
  static inventoryItemName = 'div.inventory_item_name';
  static inventoryItemPrice = 'div.inventory_item_price';

  static async getHeaderText(page) {
    return await page.textContent(this.primaryHeaderText);
  }

  static async isShoppingCartVisible(page) {
    return await page.isVisible(this.shoppingCart);
  }

  static async isBurgerButtonVisible(page) {
    return await page.isVisible(this.burgerButton);
  }

  static async getInventoryItems(page) {
    return await page.$$(this.inventoryContainer);
  }

  static async getAddToCartButtons(page) {
    return await page.$$(this.addToCartButton);
  }

  static async getPriceTexts(page) {
    const prices = await page.$$(this.priceElement);
    const priceTexts = [];
    for (const p of prices) {
      priceTexts.push(await p.textContent());
    }
    return priceTexts;
  }

  static async getFooterText(page) {
    return await page.textContent(this.footer);
  }

  static async openMenu(page) {
    try {
      const isMenuOpen = await page.isVisible(this.menuWrap);
      if (!isMenuOpen) {
        await page.click(this.burgerMenuButton);
        await page.waitForSelector(this.menuWrap, { state: 'visible', timeout: 5000 });
      }
    } catch (error) {
      console.log('Error opening menu:', error.message);
      throw error;
    }
  }

  static async getMenuOptions(page) {
    try {
      await page.waitForSelector(this.menuOptions, { timeout: 5000 });
      const elements = await page.$$(this.menuOptions);
      const options = [];
      for (const el of elements) {
        const text = await el.textContent();
        if (text && text.trim()) {
          options.push(text.trim());
        }
      }
      return options;
    } catch (error) {
      console.log('Error getting menu options:', error.message);
      throw error;
    }
  }

  static async closeMenu(page) {
    try {
      const isMenuOpen = await page.isVisible(this.menuWrap);
      if (isMenuOpen) {
        try {
          await page.click(this.closeButton, { timeout: 2000 });
        } catch {
          try {
            await page.click('body', { position: { x: 100, y: 100 } });
          } catch {
            await page.keyboard.press('Escape');
          }
        }
        await page.waitForSelector(this.menuWrap, { state: 'hidden', timeout: 5000 });
      }
    } catch (error) {
      console.log('Error closing menu:', error.message);
      throw error;
    }
  }

  static async isMenuVisible(page) {
    try {
      return await page.isVisible(this.menuWrap);
    } catch (error) {
      console.log('Error checking menu visibility:', error.message);
      return false;
    }
  }
  static async isFilterContainerVisible(page) {
    return await page.isVisible(this.filterContainer);
  }

  static async getFilterOptions(page) {
    const options = await page.$$(this.filterOptions);
    const optionTexts = [];
    for (const option of options) {
      const text = await option.textContent();
      if (text && text.trim()) {
        optionTexts.push(text.trim());
      }
    }
    return optionTexts;
  }

  static async selectFilterOption(page, optionText) {
    await page.selectOption(this.filterContainer, { label: optionText });
    await page.waitForTimeout(500);
  }

  static async getInventoryItemNames(page) {
    const elements = await page.$$(this.inventoryItemName);
    const names = [];
    for (const el of elements) {
      const text = await el.textContent();
      if (text && text.trim()) {
        names.push(text.trim());
      }
    }
    return names;
  }

  static async getInventoryItemPrices(page) {
    const elements = await page.$$(this.inventoryItemPrice);
    const prices = [];
    for (const el of elements) {
      const text = (await el.textContent()).trim();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }
}

module.exports = HomePage;
