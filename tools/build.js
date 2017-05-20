const chalk = require('chalk');
const compile = require('./compile');
const webpackConfig = require('../config/webpackProdConfig');

(async function build () {
  try {
    await compile(webpackConfig);
    console.log(chalk.green('Your application has been built for production.'));
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
})();
