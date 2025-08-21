// pages/HomePage.js

class HomePage {
  // Existing selectors...
  static primaryHeaderText = '.app_logo';
  static shoppingCart = '.shopping_cart_link';
  static burgerButton = '#react-burger-menu-btn';
  static inventoryContainer = '.inventory_item';
  static addToCartButton = '.inventory_item button.btn_inventory';
  static priceElement = '.inventory_item_price';
  static inventoryList = '.inventory_list';
  static footer = '.footer_copy';

  // NEW selectors for Menu/Burger
  static burgerMenuButton = '#react-burger-menu-btn';
  static menuWrap = '.bm-menu-wrap';
  static menuOptions = '.bm-item-list .bm-item';
  static closeButton = '#react-burger-cross-btn';

  // Existing methods ...
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

  // NEW: burger menu methods
  static async openMenu(page) {
    try {
      // Check if menu is already open
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
      // Check if menu is open before trying to close
      const isMenuOpen = await page.isVisible(this.menuWrap);
      if (isMenuOpen) {
        // Try multiple methods to close the menu
        try {
          // Method 1: Click close button
          await page.click(this.closeButton, { timeout: 2000 });
        } catch {
          try {
            // Method 2: Click outside the menu
            await page.click('body', { position: { x: 100, y: 100 } });
          } catch {
            // Method 3: Press Escape key
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
}

module.exports = HomePage;
