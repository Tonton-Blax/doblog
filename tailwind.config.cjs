const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			fontFamily: { 
				sans: ["Poppins"] 
			}
		},
	},
	plugins: [],
};

module.exports = config;
