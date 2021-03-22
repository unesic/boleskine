module.exports = {
	extends: ["stylelint-config-standard"],
	ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [
					"tailwind",
					"apply",
					"variants",
					"responsive",
					"screen",
				],
			},
		],
		"declaration-block-trailing-semicolon": null,
		"no-descending-specificity": null,
		indentation: "tab",
		"at-rule-empty-line-before": [
			"always",
			{
				except: ["after-same-name", "inside-block"],
				ignoreAtRules: [
					"import",
					"apply",
					"media",
					"keyframes",
					"screen",
				],
			},
		],
	},
};
