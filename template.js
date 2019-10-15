const path = require('path');
const pug = require('pug');
const tocToHtml = require('toc-to-html');

const file = path.resolve(__dirname, 'template.pug');
const fn = pug.compileFile(file);

module.exports = data => {
  const toc = tocToHtml(data.toc, {
    id: 'toc',
    clazz: 'hidden'
  });

  return fn({ ...data, toc });
};
