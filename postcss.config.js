const tailwindcss = require("tailwindcss");

module.exports = {
	plugins: [
		require("postcss-import"),
		require("postcss-nested"),
		require("autoprefixer"),
		tailwindcss("./tailwind.config.js"),
	],
};
