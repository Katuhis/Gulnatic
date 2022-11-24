const path = require('path')
const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = (env) => merge(config({
  ...env,
  apiRoute: '/api'
}), {
  mode: 'production',
  output: {
    clean: true,
    path: path.resolve(__dirname, `../public/${env.src}`)
  },
  optimization: {
    minimize: true
  },
  performance: {
    maxAssetSize: 20 * 1024 * 1024,
    maxEntrypointSize: 20 * 1024 * 1024
  }
})
