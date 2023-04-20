const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const { styleLoaders } = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: styleLoaders({isProduction: false})
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new htmlWebpackPlugin({
      title: '易靓好车',
      template: resolve('public/index.html'),
      filename: 'index.html'
    }),
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'static'),
    port: 3000,
    hot: true,
    open: false,
    client: {
      progress: true,
      overlay: true,
    }
    // historyApiFallback: {
    //   // HTML5 history模式
    //   rewrites: [{ from: /.*/, to: '/index.html' }]
    // }
  },
})