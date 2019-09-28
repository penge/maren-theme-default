const path = require('path');
const pug = require('pug');

const file = path.resolve(__dirname, 'template.pug');
const fn = pug.compileFile(file);

module.exports = fn;
