const path = require('path');

module.exports = {
  // Multiple entry points for different pages
  entry: {
    charging: './JS/charging.js',
    goods: './JS/goods.js',
    login: './JS/login.js',
    pos: './JS/pos.js',
    reports: './JS/reports.js',
    sell: './JS/sell.js',
    staff: './JS/staff.js',
    simReg: './JS/simReg.js',
    main: './JS/script.js', // Common JS for the main page if needed
  },

  output: {
    filename: '[name].bundle.js', // This will generate individual bundles for each page
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  mode: 'development',
};
