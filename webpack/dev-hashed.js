const appConfig = require('./_config.js');

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Webpack Plugins
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


let plugins = [];

// Add plugins to main plugins array

// plugins.push(
//   new StylelintPlugin({
//   })
// );

// plugins.push(
//   new ESLintPlugin({
//     // overrideConfigFile: path.resolve(__dirname, 'eslint.config.cjs'),
//     configType: 'flat',
//   })
// );

plugins.push(
  new PurgeCSSPlugin(appConfig.plugins.purgeCSS)
);

plugins.push(
  new MiniCssExtractPlugin({
    // filename: '[contenthash].css',
    filename: (pathData) => {
      return '[name].[contenthash].css';
    },
    // chunkFilename: '[id].css',
  })
);

// plugins.push(
//   new CopyWebpackPlugin({
//     patterns: [
//       {
//         from: path.resolve(__dirname, '../resources/images'),
//         to: path.resolve(__dirname, appConfig.compiledAssetOutputPath + '/images'),
//       },
//     ],
//   })
// );

// plugins.push(
//   new ExtraWatchWebpackPlugin({
//     dirs: path.resolve(__dirname, '../../static'),
//   })
// );

plugins.push(
  new WebpackManifestPlugin()
);

module.exports = {
  mode: 'development', // Leave this as development to ensure external source maps work as expected

  stats: {
    children: true
  },

  watch: true,

  entry: appConfig.entryPoints,

  output: {
    // filename: '[name].[contenthash].js',
    filename: (pathData) => {
      return '[name].[contenthash].js';
    },
    path: path.resolve(__dirname, appConfig.compiledAssetOutputPath),
    clean: true,
  },

  devtool: 'inline-source-map',

  // devServer: {
  //   // contentBase: './',
  //   contentBase: __dirname,
  // },

  plugins: plugins,

  module: {
    rules: [
      // Process SASS/SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Output to .css file
          'css-loader', // Convert CSS to a string
          'postcss-loader', // Post-process CSS (Autoprefix, Tree-shake, etc.)
          'sass-loader', // Compile Sass to CSS
        ],
      },

      // Process JS, TS, TSX
      // {
      //   test: /\.ts?$/,
      //   // exclude: /node_modules/,
      //   resolve: {
      //     extensions: ['.js', '.ts', '.tsx']
      //   },
      //   use: 'ts-loader',
      // },

      // Process JS, JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      // Process Images
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          // keep original filenames and copy to `dist/images/`
          filename: 'images/[name][ext]',
        },
      },

      // Process Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          // keep original filenames and copy to `dist/fonts/`
          filename: 'fonts/[name][ext]',
        },
      },

      // Process CSV / TSV
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },

      // Process XML
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
};
