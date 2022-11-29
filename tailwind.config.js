/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	plugins: [],
	theme: {
		screens: {
			"max-screen": "1700px",
		},
		borderRadius: {
			md: "8px",
			full: "100%",
		},
		colors: {
			status: {
				in_progress_text: "#293057",
				in_progress_bg: "#BEBEC1",
			},
			transparent: "transparent",
			green: "#295E00",
			yellow: "#E4BF5E",
			white: "#FFFFFF",
			red: "#D94B4B",
			black: "#000000",
			blue: {
				900: "#0F141E",
				800: "#0F141F",
				700: "#131925",
				600: "#181F2D",
				500: "#232835",
				400: "#1B2A48",
				300: "#2E64CF",
			},
			grey: {
				text: {
					inactive: "#A5A8B2",
					active: "#DADAE2",
					placeholder: "#737681",
				},
			},
			stroke: {
				grey: "#252525",
				blue: "#2D343F",
			},
		},
		fontFamily: {
			black: ["BRHendrix-Black", "sans-serif"],
			bold: ["BR Hendrix Bold", "sans-serif"],
			sb: ["BRHendrix-SemiBold", "sans-serif"],
			medium: ["BRHendrix-Medium", "sans-serif"],
			medium_italic: ["BRHendrix-MediumItalic", "sans-serif"],
			regular: ["BRHendrix-Regular", "sans-serif"],
		},
		fontSize: {
			12: "0.75rem",
			13: "0.813rem",
			14: "0.875rem",
			16: "1rem",
			18: "1.125rem",
			20: "1.25rem",
			24: "1.50rem",
			28: "1.75rem",
		},
		// fontWeight: {
		//   light: "300",
		//   semi_normal: "400",
		//   normal: "500",
		//   semi_bold: "600",
		//   bold: "700",
		// },
	},
};
