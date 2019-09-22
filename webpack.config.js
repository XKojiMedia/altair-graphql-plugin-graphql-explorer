const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry : [
    './src/index.js',
    './src/wrapper.css',
  ],
  output : {
      filename : 'main.js',
      path : path.resolve(__dirname, 'dist')
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  plugins: [
    /*process.env.NODE_ENV === 'production' && */new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      allChunks: true,
      // publicPath: 'dist',
    }),
  ],//.filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          /** process.env.NODE_ENV === 'production' && **/ MiniCssExtractPlugin.loader,
          // 'style-loader',
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // you can specify a publicPath here
          //     // by default it uses publicPath in webpackOptions.output
          //     // publicPath: 'dist',
          //   },
          // },
          'css-loader'
        ]//.filter(Boolean),
      }
    ]
  },
};

