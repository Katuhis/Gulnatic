const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * Environment args
 * @typedef {Object} env
 * @property {string} src
 * @property {string} appRoute
 * @property {string} apiRoute
 * @property {string} apiUrl
 */
module.exports = (env) => ({
  target: 'web',
  name: env.src,
  entry: {
    app: `./src/${env.src}/index.tsx`
  },
  output: {
    filename: 'assets/[name].[fullhash].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      common: path.resolve(__dirname, `src/${env.src}/common`),
      components: path.resolve(__dirname, `src/${env.src}/components`),
      hooks: path.resolve(__dirname, `src/${env.src}/hooks`),
      interfaces: path.resolve(__dirname, `src/${env.src}/interfaces`),
      pages: path.resolve(__dirname, `src/${env.src}/pages`),
      store: path.resolve(__dirname, `src/${env.src}/store`)
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'webpack': {
        APP_ROUTE: JSON.stringify(env.appRoute || ''),
        API_ROUTE: JSON.stringify(env.apiRoute || ''),
        API_URL: JSON.stringify(env.apiUrl || '')
      }
    }),
    new HtmlWebpackPlugin({
      template: `./src/${env.src}/index.html`
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `./src/${env.src}/assets`),
          to: 'assets/'
        }
      ]
    })
  ]
})
