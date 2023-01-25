const path = require('path')
const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = (env) => merge(config({
  ...env,
  apiUrl: `http://localhost:5000${env.apiRoute}/`
}), {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    open: true,
    port: 3000
  }
})
