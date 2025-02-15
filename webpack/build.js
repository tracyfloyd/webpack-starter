const appConfig = require('./_config.js');

const fs = require("fs");
const glob = require("glob");
const path = require("path");
const zlib = require("zlib");

const CompressionPlugin = require("compression-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

let plugins = [];

// Add plugins to main plugins array
plugins.push(
  new CompressionPlugin({
    algorithm: "gzip",
    filename: "[path][base].gz",
    test: /\.(js|css)$/,
  })
);

plugins.push(
  new CompressionPlugin({
    algorithm: "brotliCompress",
    filename: "[path][base].br",
    test: /\.(js|css)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
  })
);

plugins.push(
  new PurgeCSSPlugin(appConfig.plugins.purgeCSS)
);

plugins.push(
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css",
  })
);

// plugins.push(
//   new CopyWebpackPlugin({
//     patterns: [
//       {
//         from: path.resolve(__dirname, "../resources/images"),
//         to: path.resolve(__dirname, appConfig.compiledAssetOutputPath + "/images"),
//       },
//     ],
//   })
// );

plugins.push(
  new WebpackManifestPlugin()
);

module.exports = {
  mode: "development", // Leave this as development to ensure external source maps work as expected

  entry: appConfig.entryPoints,

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, appConfig.compiledAssetOutputPath),
    clean: true,
  },

  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })], // Prevents creation on the .LICENSE.txt file
  },

  devtool: "source-map",

  plugins: plugins,

  module: {
    rules: [
      // Process SASS/SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Output to .css file
          "css-loader", // Convert CSS to a string
          "postcss-loader", // Post-process CSS (Autoprefix, Tree-shake, etc.)
          "sass-loader", // Compile Sass to CSS
        ],
      },

      // Process JS & TypeScript
      {
        test: /\.ts?$/,
        // exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.js']
        },
        use: 'ts-loader',
      },

      // Process JS
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /(node_modules|bower_components)/,
      //   resolve: {
      //     extensions: [".js", ".jsx"],
      //   },
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      // },

      // Process Images
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          // keep original filenames and copy to `dist/images/`
          filename: 'images/[name][ext]',
        },
      },

      // Process Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          // keep original filenames and copy to `dist/fonts/`
          filename: 'fonts/[name][ext]',
        },
      },

      // Process CSV / TSV
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },

      // Process XML
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
};
