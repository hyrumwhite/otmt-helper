let env = process.env.BABEL_ENV;
const path = require('path');

let config = {
  resolve: {
    alias: {
      'app-components': path.join(__dirname, '/src/components'),
      'app-store': path.join(__dirname, '/src/store'),
      'app-api': path.join(__dirname, '/src/api'),
      'app-services': path.join(__dirname, '/src/services'),
      'app-defaults': path.join(__dirname, '/src/components/workbench/common/defaults'),
      'app-images': path.join(__dirname, '/src/img'),
    }
  },
  entry: {
    // main: ['babel-polyfill', './src/main/main.js'],
    content: ['./src/main/content.js'],
  },
  output: {
      path: __dirname + '/dist',
      filename: '[name].module.js',
      chunkFilename: '[name].bundle.js'
  },
  performance: {
    maxAssetSize: 500000
  },
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.jpg$/, use: "file-loader" },
      { test: /\.png$/, use: "url-loader?mimetype=image/png"},
      { test: /\.gif$/, use: "url-loader?mimetype=image/gif"},
      { test: /\.html$/, use: "html-loader"},
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.styl$/, use: ['style-loader','css-loader', 'stylus-loader']},
      {
        test: /\.svg$/, loader: 'vue-svg-loader', options:{
        svgo:{
          plugins:[
            {
              removeDoctype:true,
              removeComments:true
            }]
          }
        }
      },
      { test: /\.js$/, include: [/src/, /node_modules\/ltk-components/, /extension/], use: ['babel-loader']}
    ]
  }
};
module.exports = config;
