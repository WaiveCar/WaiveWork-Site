const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const config = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    //new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
    // The line below makes webpack skip importing moment locales, though they may be needed later
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  devServer: {
    inline: true,
    port: 8081,
    historyApiFallback: {
      index: '/',
    },
  },
};

module.exports = config;
