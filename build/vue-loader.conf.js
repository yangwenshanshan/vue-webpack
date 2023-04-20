const miniCssExtractPlugin = require('mini-css-extract-plugin')
const defaultRules = [
  {
    test: /\.css$/,
    use: ['css-loader', 'postcss-loader']
  },
  {
    test: /\.less$/,
    use: ['css-loader', 'postcss-loader', 'less-loader']
  },
  {
    test: /\.scss$/,
    use: ['css-loader', 'postcss-loader', 'sass-loader']
  },
  {
    test: /\.sass$/,
    use: ['css-loader', 'postcss-loader', 'sass-loader']
  }
]

exports.styleLoaders = function (options) {
  defaultRules.forEach(el => {
    let loader = 'vue-style-loader'
    if (options.isProduction) {
      loader = miniCssExtractPlugin.loader
    }
    el.use.unshift(loader)
  })
  return defaultRules
}