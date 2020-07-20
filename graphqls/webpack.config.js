const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = {
	resolve: {
		plugins: [
			PnpWebpackPlugin
		]
	},
	resolveLoader: {
		plugins: [
			PnpWebpackPlugin.moduleLoader(module)
		]
	},
	target: 'node',
	externals: [
		nodeExternals(),
		'ws',
		'encoding',
		'sequelize'
	],
	entry: [
		'./graphqls/handler.js'
	],
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, './dist'),
		filename: 'handler.js'
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					keep_fnames: true
				}
			})
		]
	},
	module: {
		rules: [
			// {
				// test: /\.js$/,
				// enforce: 'pre',
				// loader: 'eslint-loader',
				// exclude: /node_modules/,
				// options: {
				// 	fix: false,
				// 	configFile: path.join(__dirname, '')
				// }
			// }
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader'
			},
			{
				type: 'javascript/auto',
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader'
			},
			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				use: []
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin()
	],
	mode: 'development',

}