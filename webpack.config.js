// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
// 	template: __dirname + '/public/index.html',
// 	filename: 'index.html',
// 	inject: 'body'
// })
//const webpack = require('webpack');

const webpack = require('webpack');

const path = require('path');

module.exports = {
	entry: [
		// 'webpack-hot-middleware/client',
		'./client/index.js'
	],
	output: {
		path: __dirname + '/server/js',
		filename: 'bundle.js'
	},
	// plugins: [
	//   new webpack.optimize.OccurrenceOrderPlugin(),
	//   new webpack.HotModuleReplacementPlugin()
	// ],
	resolve: {
	  extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{test: /\.(js|jsx)$/, include: [path.join(__dirname, 'client'), path.join(__dirname, 'server/shared')], exclude: /node_modules/, loader: 'babel-loader', query:{
		          presets: ['react', 'es2015', 'stage-0']
			}},
			{test: /\.scss$/, exclude: /node_modules/, loader: "style-loader!css-loader!sass-loader"},
            {test: /\.(png|jpe?g|gif|svg)$/, exclude: /node_modules/, loaders: 'url-loader'}
		]
	},
	  plugins:[
	    new webpack.DefinePlugin({
	      'process.env':{
	        'NODE_ENV': JSON.stringify('production')
	      }
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      compress:{
	        warnings: true
	      }
	    })
	  ]


}





// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
// 	template: __dirname + '/app/index.html',
// 	filename: 'index.html',
// 	inject: 'body'
// })

// module.exports = {
// 	entry: [
// 		'./app/index.jsx'
// 	],
// 	output: {
// 		path: __dirname + '/dist',
// 		filename: 'index_bundle.js'
// 	},
// 	module: {
// 		loaders: [
// 			{test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
// 			{test: /\.scss$/, exclude: /node_modules/, loader: "style-loader!css-loader!sass-loader"},
//             {test: /\.(png|jpe?g|gif|svg)$/, exclude: /node_modules/, loaders: 'url-loader'}
// 		]
// 	},
// 	plugins: [HtmlWebpackPluginConfig]
// }