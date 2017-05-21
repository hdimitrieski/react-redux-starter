/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const chalk = require('chalk');
const compile = require('./compile');
const copy = require('./copy');
const webpackConfig = require('../config/webpackProdConfig');

((async function build() {
  try {
    await compile(webpackConfig);
    await copy();
    console.info('Public directory is copied successfully.');
    console.log(chalk.green('Your application has been built for production.'));
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
})());
