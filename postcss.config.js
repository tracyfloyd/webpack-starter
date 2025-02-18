const glob = require('glob');
const path = require('path');
// Must do this to avoid haviung to use import instead of require:
// https://github.com/FullHuman/purgecss/issues/1295#issuecomment-2531048218
const purgeImport = require('@fullhuman/postcss-purgecss');
const purgecss = purgeImport.purgeCSSPlugin || purgeImport.default || purgeImport;

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: glob.sync(`${path.resolve(__dirname, './resources/views')}/**/*`, { nodir: true }),
      safelist: {
        standard: [/^has-/, /^is-/],
        deep: [/^modal-/, /^page-/],
        greedy: []
      }
    }),
  ]
}
