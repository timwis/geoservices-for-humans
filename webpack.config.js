/* global __dirname */
module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html$/, loader: 'handlebars-loader' },
      { test: /node_modules\/bootstrap/, loader: 'imports?jQuery=jquery'}
    ]
  }
}
