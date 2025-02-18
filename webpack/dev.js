const appConfig = require('./_config.js');

// const fs = require('fs');
// const glob = require('glob');
const path = require('path');

// const webpack = require('webpack'); // to access built-in plugins

// Webpack Plugins
// const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = (env) => {
  return {
    mode: 'development', // Leave this as development to ensure external source maps work as expected
    devtool: 'inline-source-map',
    watch: true,
    entry: appConfig.entryPoints,

    output: {
      filename: (_pathData) => {
        return (env.hashFilenames) ? '[name].[contenthash].js' : '[name].js';
      },
      path: path.resolve(__dirname, appConfig.compiledAssetOutputPath),
      clean: true
    },

    stats: {
      children: true
    },

    // devServer: {
    //   // contentBase: './',
    //   contentBase: __dirname,
    // },

    plugins: [
      new MiniCssExtractPlugin({
        filename: (_pathData) => {
          return (env.hashFilenames) ? '[name].[contenthash].css' : '[name].css';
        }
      }),
      new WebpackManifestPlugin(),
      // new StylelintPlugin({}), // Always run style linting
      // new ESLintPlugin({configType: 'flat'}), // Always run js linting
      // new ExtraWatchWebpackPlugin({dirs: path.resolve(__dirname, '../../static')}), // Set additional watch dirs
    ],

    module: {
      // Note: Loaders are evaluated/executed from right to left (or from bottom to top)
      rules: [
        // Process Styles (.sass, .scss)
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader, // Output to .css file
            'css-loader', // Convert CSS to a string
            'postcss-loader', // Post-process CSS (Autoprefix, PurgeCSS, etc.)
            'sass-loader' // Compile Sass to CSS
          ]
        },

        // Process Javascript (.js, .jsx)
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          resolve: {
            extensions: ['.js', '.jsx']
          },
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },

        // Process TypeScript (.ts, .tsx)
        {
          test: /\.(ts|tsx)$/,
          // exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx']
          },
          use: 'ts-loader',
        },

        // Process Images
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            // keep original filenames and copy to `dist/images/`
            filename: 'images/[name][ext]'
          }
        },

        // Process Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            // keep original filenames and copy to `dist/fonts/`
            filename: 'fonts/[name][ext]'
          }
        },

        // Process CSV / TSV
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader']
        },

        // Process XML
        {
          test: /\.xml$/i,
          use: ['xml-loader']
        }
      ]
    }
  }
};
