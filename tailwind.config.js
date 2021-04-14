const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false,
	theme: {
		extend: {
			fontFamily: {
				moleskine: ["Moleskine"],
				heading: ["Copper_Penny"],
				"body-light": ["brandon_light"],
				"body-regular": ["brandon_regular"],
				"body-medium": ["brandon_medium"],
				icon: ["moleskine_icons"],
				caly: ["signpainter_medium"],
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
				},
			},
			boxShadow: {
				card:
					"0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(0, 0, 0, 0.06)",
				"input-focus": "0 0 4px 0 rgba(255, 255, 255, 0.25)",
			},
			opacity: {
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
