const path = require('path');

// app
const client = 'client';
const sourceDirectory = path.join(client, 'src');
const publicDirectory = path.join(client, 'public');
const distDirectory = path.join('target', 'dist');
const entryHtmlName = 'index.html';
const entryJsName = 'index.jsx';

// output
const staticDirectory = 'static';
const jsDirectory = path.join(staticDirectory, 'js');
const cssDirectory = path.join(staticDirectory, 'css');
const mediaDirectory = path.join(staticDirectory, 'media');
const devBundle = '[name].bundle.js';
const cssFileName = '[name].[contenthash:8].css';
const mediaFileName = '[name].[hash:8].[ext]';
const chunkJsFiles = '[name].[chunkhash:8].js';
const vendorBundleName = 'vendor';

const publicPath = '/';

// root directory
const base = path.resolve(__dirname, '..');

const basePath = (...dirNames) => {
  const dirPath = path.join(base, ...dirNames);

  return (fileName = '') => path.join(dirPath, fileName);
};

// project config
const config = {
  projectDirectory: base,
  publicPath
};

// project directories
config.paths = {
  root: basePath(),
  source: basePath(sourceDirectory),
  dist: basePath(distDirectory),
  public: basePath(publicDirectory)
};

// entry files
config.entry = {
  entryJs: config.paths.source(entryJsName),
  entryHtml: config.paths.source(entryHtmlName)
};

// output files
config.output = {
  cssFiles: path.join(cssDirectory, cssFileName),
  mediaFiles: path.join(mediaDirectory, mediaFileName),
  jsFiles: path.join(jsDirectory, devBundle),
  chunkJsFiles: path.join(jsDirectory, chunkJsFiles),
  vendorBundleName
};

module.exports = config;
