const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class",
	theme: {
		extend: {
			spacing: {
				13: "3.25rem",
			},
			container: {
				center: true,
				padding: "1rem",
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
				"body-light": [
					"brandon_light",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				"body-regular": [
					"brandon_regular",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				"body-medium": [
					"brandon_medium",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				icon: ["moleskine_icons", "ui-sans-serif", "system-ui", "sans-serif"],
				caly: [
					"signpainter_medium",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
			},
			colors: {
				orange: colors.orange,
				teal: colors.teal,
				app: {
					accent: {
						red: "#DB2A34",
						green: "#2D8515",
						blue: "#2276FF",
					},
					light: {
						100: "#F4F4F5",
						150: "#D4D4D8",
						200: "#C1C3CF",
						300: "#A5A7B8",
						400: "#6C6F89",
						500: "#3F4150",
					},
					dark: {
						100: "#474D84",
						200: "#333867",
						300: "#17193B",
						400: "#040620",
						500: "#00000B",
					},
				},
			},
			boxShadow: (theme) => ({
				card:
					"0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(0, 0, 0, 0.06)",
				"gradient-focus": "0 0 4px 0 rgba(255, 255, 255, 0.25)",
				"solid-focus": `0 0 0 1px ${theme(`colors.app.accent.blue`)}`,
				"solid-error": `0 0 0 1px ${theme(`colors.app.accent.red`)}`,
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
