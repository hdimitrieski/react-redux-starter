const chalk = require('chalk');
const webpack = require('webpack');

module.exports = (webpackConfig) => {
  console.log(chalk.blue(`Generating webpack bundle in ${process.env.NODE_ENV} mode...`));

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.run((err, stats) => {
      console.log(chalk.blue('Webpack compiler completed.'));

      if (err) {
        console.log(chalk.red('Fatal error'));
        return reject(err);
      }

      const jsonStats = stats.toJson();

      if (jsonStats.hasErrors) {
        console.log(chalk.red('Webpack compiler encountered errors'));
        return reject(new Error(jsonStats.errors.join('\n')));
      } else if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack warnings'));
        console.log(chalk.yellow(jsonStats.warnings.join('\n')));
      }

      return resolve(jsonStats);
    });
  });
};
