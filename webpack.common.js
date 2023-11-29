import { resolve } from 'path';
const __dirname = process.cwd()
export default {
  entry: './src/main.js',
  output: {
    filename: 'templater.min.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
      extensions: ['.js'],
      alias: {
        '@': resolve(__dirname, './src')
      }
  }
};