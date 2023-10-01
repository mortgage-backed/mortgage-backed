const path = require('path');

module.exports = {
  mode: 'development',  
  entry: './src/client/App.js',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.cjs'),
          },
        },
      },
    ],
  },
};