const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: path.resolve(__dirname, './client/src/Index.jsx'),
	watch: true,
	output: {
		path: path.resolve(__dirname, './client/public'),
		filename: "bundle.js"
	},

	devtool: 'source-map',

	devServer: {
		contentBase: path.join(__dirname, "./client/public"),
		compress: true,
		// progress: true,
		inline: true,
		port: 3000
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.css'
		})
	]
};