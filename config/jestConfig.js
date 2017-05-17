const projectConfig = require('./projectConfig');

const config = {
  rootDir: projectConfig.path.root(),
  coverageReporters: ['lcov', 'json', 'text'],
  coverageDirectory: '<rootDir>/target/coverage',
  collectCoverageFrom: ['client/src/**/*.{js,jsx}'],
  testMatch: ['<rootDir>/client/src/**/(*.)(spec).js?(x)'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': 'config/mock/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};

module.exports = config;
