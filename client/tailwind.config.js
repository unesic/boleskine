const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false,
	theme: {
		extend: {
			spacing: {
				13: "3.25rem",
			},
			maxHeight: {
				"fit-content": "fit-content",
				"min-content": "min-content",
				"max-content": "max-content",
			},
			height: {
				min: "min-content",
				max: "max-content",
			},
			fontFamily: {
				moleskine: ["Moleskine", "ui-sans-serif", "system-ui", "sans-serif"],
				heading: ["Copper_Penny", "ui-sans-serif", "system-ui", "sans-serif"],
				"body-light": ["brandon_light", "ui-sans-serif", "system-ui", "sans-serif"],
				"body-regular": ["brandon_regular", "ui-sans-serif", "system-ui", "sans-serif"],
				"body-medium": ["brandon_medium", "ui-sans-serif", "system-ui", "sans-serif"],
				icon: ["moleskine_icons", "ui-sans-serif", "system-ui", "sans-serif"],
				caly: ["signpainter_medium", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			colors: {
				orange: colors.orange,
				teal: colors.teal,
				app: {
					"accent-red": "#DB2A34",
					"accent-green": "#2D8515",
					"accent-blue": "#2276FF",
					"light-primary": "#F4F4F5",
					"light-secondary": "#C1C3CF",
					"light-tertiary": "#A5A7B8",
					"dark-primary": "#474D84",
					"dark-secondary": "#333867",
					"dark-tertiary": "#17193B",
					"dark-quaternary": "#040620",
					"dark-quinternary": "#00000B",
					"social-github": "#24292e",
					"social-google": "#DB4437",
					"social-facebook": "#4267B2",
					"social-linkedin": "#0072b1",
				},
			},
			boxShadow: (theme) => ({
				card:
					"0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(0, 0, 0, 0.06)",
				"gradient-focus": "0 0 4px 0 rgba(255, 255, 255, 0.25)",
				"solid-focus": `0 0 0 1px ${theme(`colors.app["accent-blue"]`)}`,
				"solid-error": `0 0 0 1px ${theme(`colors.app["accent-red"]`)}`,
			}),
			opacity: {
				1: "1%",
				80: "80%",
			},
		},
	},
	variants: {
		extend: {
			brightness: ["hover", "focus"],
		},
	},
	plugins: [],
};
