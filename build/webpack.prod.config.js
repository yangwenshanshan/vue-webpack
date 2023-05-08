const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const { styleLoaders } = require('./vue-loader.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(webpackBaseConfig, {
  devtool: false,
  module: {
    rules: styleLoaders({isProduction: true})
  },
  output: {
    publicPath: '/dist/',
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css'
    }),
    new WebpackBar({
      color: '#3064c7',
      name: '易靓好车',
    }),
    new htmlWebpackPlugin({
      title: '易靓好车',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
      template: resolve('index.html'),
      filename: 'index.html',
      favicon: resolve('public/favicon.ico')
    }),
  ]
})