const glob = require('glob');
const path = require('path');

let config = {
  compiledAssetOutputPath: '../public',

  entryPoints: {
    app: path.resolve(__dirname, '../resources/scripts/app.js'),
    // admin: path.resolve(__dirname, '../resources/scripts/admin.js'),
    // editor: path.resolve(__dirname, '../resources/scripts/editor.js')
    // critical: path.resolve(__dirname, '../resources/scripts/app-critical.js'),
    // react: path.resolve(__dirname, '../resources/scripts/react/app.js'),
  },

};

module.exports = config;
