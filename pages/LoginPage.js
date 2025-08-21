class LoginPage {
  static usernameField = 'input[placeholder="Username"]';
  static passwordField = 'input[placeholder="Password"]';
  static loginButton = 'input.submit-button.btn_action';
  static loginErrorContainer = 'div.error-message-container.error';

  static async navigate(page) {
    await page.goto('https://www.saucedemo.com/');
  }

  static async login(page, username, password) {
    await page.fill(this.usernameField, username);
    await page.fill(this.passwordField, password);
    await page.click(this.loginButton);
  }

  static async getErrorMessage(page) {
    return await page.textContent(this.loginErrorContainer);
  }
}

module.exports = LoginPage;
