/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs-extra');
const { paths } = require('../config/projectConfig');

const copy = () => fs.copy(paths.public(), paths.dist());

module.exports = copy;
