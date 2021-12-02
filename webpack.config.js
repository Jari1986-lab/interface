var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './client/app.jsx',
  mode: 'development',
  output: { path: __dirname+'/wwwroot/app', filename: 'app.bundle.js' },
  module: {
    rules: [
      {
        test: /.jsx?$/,
		exclude: /node_modules/,
		use:{
			loader: 'babel-loader',
			options:{
				presets:["@babel/env","@babel/react"]
			}
		}
      }
    ]
  },
  resolve:{
    extensions: ['.js','.jsx']
  }
};