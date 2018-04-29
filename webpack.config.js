const path = require('path');

module.exports = {
   entry: {
    index: './js/index.js',
    restaurant: './js/restaurant_info.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};