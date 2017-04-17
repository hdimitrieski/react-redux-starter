const jest = require('jest');
const jestConfig = require('../config/jestConfig');

const argv = process.argv.slice(2);

argv.push(
  '--config',
  JSON.stringify(jestConfig)
);

jest.run(argv);
