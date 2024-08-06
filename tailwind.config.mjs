/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', "./views/editNews.ejs"], 
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#497275',
					200: '#063692',
				},
				light: {
					100: '#f4f4f4',
					200: '#fbfbfb',
				},
			}
		},
	},
	plugins: [],
}
