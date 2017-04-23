const chalk = require('chalk');
const express = require('express');
const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../config/webpackDevConfig');
const {
  host,
  port,
  entryHtml,
  assetsPath,
  serverOptions
} = require('../config/serverConfig');

console.log(chalk.green('Starting app in dev mode...'));

const app = express();
const compiler = webpack(webpackConfig);
const publicPath = webpackConfig.output.publicPath;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: publicPath,
    ...serverOptions
  })
);

app.use(webpackHotMiddleware(compiler, {
  path: `${publicPath}__webpack_hmr`
}));

// Serve static assets from /assets since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into /dist
// when the application is compiled.
app.use(express.static(assetsPath));

// This rewrites all routes requests to the root /index.html file
app.get('*', (req, res) => {
  res.sendFile(entryHtml);
});

//TODO proxy

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  } else {
    console.log(chalk.blue(`Listening at http://${host}:${port}`));
    open(`http://${host}:${port}`);
  }
});
