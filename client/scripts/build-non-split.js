const externals = require("./externals");
const rewire = require("rewire");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defaults = rewire("react-scripts/scripts/build.js");
const config = defaults.__get__("config");

config.externals = {
	...config.externals,
	...externals,
};

config.output.jsonpFunction = "YourReactApp_webpackJsonpjs";

config.optimization.splitChunks = {
	cacheGroups: {
		default: false,
	},
};
config.optimization.runtimeChunk = false;
config.output.filename = "[name].js";
config.output.chunkFilename = "[name].js";

const disabledPlugins = [
	"GenerateSW",
	"ManifestPlugin",
	"InterpolateHtmlPlugin",
	"InlineChunkHtmlPlugin",
	"HtmlWebpackPlugin",
];
config.plugins = config.plugins.reduce((plugins, pluginItem) => {
	if (disabledPlugins.indexOf(pluginItem.constructor.name) >= 0) {
		return plugins;
	}

	if (pluginItem instanceof MiniCssExtractPlugin) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[name].css",
			})
		);
	} else {
		plugins.push(pluginItem);
	}

	return plugins;
}, []);
