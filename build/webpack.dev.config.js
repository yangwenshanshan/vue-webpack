const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar');
const webpackBaseConfig = require('./webpack.base.config')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder')
const os = require('os');
const { merge } = require('webpack-merge')
const { styleLoaders } = require('./vue-loader.conf')

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  const wlan = interfaces.WLAN.find(wlan => wlan.family === 'IPv4' && !wlan.internal)
  if (wlan) {
    return wlan.address;
  } else {
    return '0.0.0.0';
  }
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const devWebpackConfig = merge(webpackBaseConfig, {
  devtool: 'source-map',
  stats: 'errors-only',
  module: {
    rules: styleLoaders({isProduction: false})
  },
  plugins: [
    // new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new htmlWebpackPlugin({
      title: '易靓好车',
      template: resolve('index.html'),
      filename: 'index.html',
      favicon: resolve('public/favicon.ico')
    }),
    new WebpackBar({
      color: '#3064c7',
      name: '易靓好车',
    }),
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'static'),
    port: 3000,
    hot: true,
    open: false,
    client: {
      logging: 'error',
      progress: false,
      overlay: true,
    },
    proxy: {
      '/api': {
        target: require('../config/yb-' + process.env.WEB_ENV + '.config.js').api + '/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{ from: /.*/, to: '/index.html' }]
    }
  },
})

module.exports = new Promise((resolve, reject) => {
  const ip = getIPAddress()
  portfinder.basePort = process.env.PORT || 3000
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`您得项目运行在: http://localhost:${port}`, `您得项目运行在: http://${ip}:${port}`],
          // notes: ['易靓好车PC端项目为您服务'],
        },
        clearConsole: true,
      }),)

      resolve(devWebpackConfig)
    }
  })
})
