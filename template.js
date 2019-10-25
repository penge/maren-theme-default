const path = require('path');
const pug = require('pug');
const tocToHtml = require('toc-to-html');

const file = path.resolve(__dirname, 'template.pug');
const fn = pug.compileFile(file);

function template(data) {
  const { meta, html, options } = data;

  const toc = tocToHtml(meta.toc, {
    id: 'toc',
    clazz: 'hidden'
  });

  return fn({
    meta: {
      ...meta,
      toc
    },
    html,
    options
  });
}

module.exports = template;
