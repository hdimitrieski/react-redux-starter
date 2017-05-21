/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');
const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackConfig = require('../config/webpackDevConfig');
const {
  host,
  port,
  entryHtml,
  publicPath,
  serverOptions
} = require('../config/serverConfig');

console.log(chalk.green('Starting app in dev mode...'));

const app = express();
const compiler = webpack(webpackConfig);
const dashboard = new Dashboard();
compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath,
    ...serverOptions
  })
);

app.use(webpackHotMiddleware(compiler, {
  path: `${publicPath}__webpack_hmr`
}));

// serve static files
app.use(express.static(publicPath));

// This rewrites all routes requests to the root /index.html file
app.get('*', (req, res) => {
  res.sendFile(entryHtml);
});

// TODO proxy

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  } else {
    console.log(chalk.blue(`Listening at http://${host}:${port}`));
    open(`http://${host}:${port}`);
  }
});
