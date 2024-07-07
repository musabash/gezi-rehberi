// const path = require('path');

// module.exports = {
//   entry: 'index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   mode: 'production'
// };

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  mode: 'production',
  plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      filename: './src/index.html'
    })],
};