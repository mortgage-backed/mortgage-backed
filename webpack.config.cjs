const path = require('path');

module.exports = {
  mode: 'development',  
  entry: './public/index.js',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/images/',
                publicPath: 'dist/assets/images/'
            }
        }]
    }    
    ],
  },
  resolve: {
    alias: {
      'boardgame.io/react$': path.resolve(__dirname, 'node_modules/boardgame.io/dist/cjs/react.js'),
      'boardgame.io/multiplayer$': path.resolve(__dirname, 'node_modules/boardgame.io/dist/cjs/multiplayer.js')
    }
  },
};