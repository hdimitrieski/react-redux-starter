const {
  paths,
  entry: {
    entryHtml
  }
} = require('./projectConfig');

// TODO proxy configuration

module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  entryHtml,
  publicPath: paths.public(),
  serverOptions: {
    contentBase: paths.source(),
    hot: true,
    noInfo: false,
    quiet: true,
    stats: {
      colors: true
    },
    lazy: false
  }
};
