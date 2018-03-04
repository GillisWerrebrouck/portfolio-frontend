const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// constant with our paths
const paths = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src'),
  js: path.resolve(__dirname, 'src/app'),
  sass: path.resolve(__dirname, 'src/sass'),
  images: path.resolve(__dirname, 'src/assets/images'),
};

module.exports = {
  context: paths.src,
  entry: {
    // 'react-hot-loader/patch',
    'app.bundle.js': path.join(paths.js, 'index.js'),
    'app.css': path.join(paths.sass, 'app.scss'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: paths.dist,
    publicPath: '/',
    filename: '[name]'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      API_BASE_URL: JSON.stringify('https://198.211.120.202:3000/api'), // 198.211.120.202
      IMAGES_BASE_URL: JSON.stringify('https://198.211.120.202:3000/images'), // 198.211.120.202
      FILES_BASE_URL: JSON.stringify('https://198.211.120.202:3000/files'), // 198.211.120.202
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.src, 'index.html'),
    }),
    new ExtractTextPlugin('style.bundle.css', {
      allChunks: true
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
    port: 80,
    historyApiFallback: true,
  },
};