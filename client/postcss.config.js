const tailwindcss = require("tailwindcss");

module.exports = ({ env }) => ({
	plugins: [
		require("postcss-import"),
		require("postcss-nested"),
		require("autoprefixer"),
		tailwindcss("./tailwind.config.js"),
		env === "production"
			? require("cssnano")({
					preset: ["default"],
			  })
			: false,
	],
});
