const tailwindcss = require("tailwindcss");
const postcssEnvFunction = require("postcss-env-function");

const SERVER_URL = "http://localhost:5001";

module.exports = {
	plugins: [
		require("postcss-import"),
		require("postcss-nested"),
		tailwindcss("./tailwind.config.js"),
		require("autoprefixer"),
		postcssEnvFunction({
			importFrom: {
				environmentVariables: {
					"--check-icon": `url(${SERVER_URL}/assets/icons/check.svg)`,
				},
			},
		}),
	],
};
