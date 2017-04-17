const path = require('path');

const base = path.resolve(__dirname, '..');
const basePath = (...dirNames) => {
  let dirPath = path.join(base, ...dirNames);

  return (fileName = '') => path.join(dirPath, fileName);
};

const config = {
  projectDirectory: base,
  sourceDirectory: 'client/src',
  distDirectory: 'target/dist',
  publicDirectory: 'client/assets'
};

config.path = {
  root: basePath(),
  source: basePath(config.sourceDirectory),
  dist: basePath(config.distDirectory),
  public: basePath(config.publicDirectory)
};

module.exports = config;
