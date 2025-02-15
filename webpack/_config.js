const glob = require('glob');
const path = require('path');

let config = {
  compiledAssetOutputPath: '../public',

  entryPoints: {
    // critical: path.resolve(__dirname, '../resources/js/app-critical.js'),
    app: path.resolve(__dirname, '../resources/js/app.js'),
    // admin: path.resolve(__dirname, '../resources/js/admin.js'),
    // editor: path.resolve(__dirname, '../resources/js/editor.js')
    // react: path.resolve(__dirname, '../resources/js/react/app.js'),
  },

  plugins: {
    purgeCSS: {
      paths: glob.sync(`${path.resolve(__dirname, '../resources/views')}/**/*`, { nodir: true }),
      fontFace: true,
      keyframes: true,
      variables: true,
      safelist: {
        standard: [/^has-/, /^is-/],
        deep: [/^modal-/, /^page-/],
        greedy: []
      }
    }
  }
};

module.exports = config;
