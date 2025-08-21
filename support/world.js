const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  page;
  context;
}

setWorldConstructor(CustomWorld);
