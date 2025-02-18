const appConfig = require('./_config.js');

// const fs = require('fs');
// const glob = require('glob');
const path = require('path');
const zlib = require('zlib');

const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


module.exports = (env) => {
  return {
    mode: 'development', // Leave this as development to ensure external source maps work as expected
    devtool: 'source-map',
    entry: appConfig.entryPoints,

    output: {
      filename: (_pathData) => {
        return (env.hashFilenames) ? '[name].[contenthash].js' : '[name].js';
      },
      path: path.resolve(__dirname, appConfig.compiledAssetOutputPath),
      clean: true,
    },

    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false })], // Prevents creation on the .LICENSE.txt file
    },

    plugins: [
        new CompressionPlugin({
          algorithm: 'gzip',
          filename: '[path][base].gz',
          test: /\.(js|css)$/,
        }),
        new CompressionPlugin({
          algorithm: 'brotliCompress',
          filename: '[path][base].br',
          test: /\.(js|css)$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          },
        }),
        new MiniCssExtractPlugin({
          filename: (_pathData) => {
            return (env.hashFilenames) ? '[name].[contenthash].css' : '[name].css';
          }
        }),
        new WebpackManifestPlugin(),
    ],

    module: {
      rules: [
        // Process Styles (.sass, .scss)
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader, // Output to .css file
            'css-loader', // Convert CSS to a string
            'postcss-loader', // Post-process CSS (Autoprefix, PurgeCSS, etc.)
            'sass-loader', // Compile Sass to CSS
          ],
        },

        // Process Javascript (.js, .jsx)
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
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

        // Process TypeScript (.ts, .tsx)
        {
          test: /\.(ts|tsx)$/,
          // exclude: /node_modules/,
          resolve: {
            extensions: ['.tsx', '.ts']
          },
          use: 'ts-loader',
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
  }
};
