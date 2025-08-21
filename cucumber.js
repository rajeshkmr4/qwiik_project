module.exports = {
  default: `--require-module @babel/register \
            --require ./step-definitions/*.js \
            --require ./support/*.js \
            --format progress-bar \
            --format @cucumber/pretty-formatter`
};