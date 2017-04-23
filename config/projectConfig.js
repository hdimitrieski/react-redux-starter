const path = require('path');

// app
const sourceDirectory = 'client/src';
const distDirectory = 'target/dist';
const publicDirectory = 'client/assets';
const entryHtmlName = 'index.html';
const entryJsName = 'index.jsx';
const manifestFile = 'asset-manifest.json';

// output
const jsDirectory = 'static/js';
const cssDirectory = 'static/css';
const mediaDirectory = 'static/media';
const devBundle = '[name].bundle.js';
const cssFileName = '[name].[contenthash:8].css';
const mediaFileName = '[name].[hash:8].[ext]';

const publicPath = '/';

// root directory
const base = path.resolve(__dirname, '..');

const basePath = (...dirNames) => {
  let dirPath = path.join(base, ...dirNames);

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
  cssFiles: `${cssDirectory}/${cssFileName}`,
  mediaFiles: `${mediaDirectory}/${mediaFileName}`,
  jsFiles: `${jsDirectory}/${devBundle}`,
  manifestFile
};

module.exports = config;
