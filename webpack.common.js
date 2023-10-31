const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'otorp.min.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
  }
};