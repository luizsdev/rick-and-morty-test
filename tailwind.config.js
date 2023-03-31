/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			minWidth: {
				32: '32px',
			},
			dropShadow: {
				background: '    --tw-drop-shadow: drop-shadow(4px 4px 0px #08bae3);',
			},
			animation: {
				'fade-in-left': 'fadeInLeft 0.5s ease-out',
				'fade-in-left-slow': 'fadeInLeft 1s ease-out',
				'fade-in-left-fast': 'fadeInLeft 0.2s ease-out',
			},
			keyframes: {
				fadeInLeft: {
					'0%': {
						transform: 'translateX(-5%)',
						opacity: '0',
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1',
					},
				},
			},
		},
	},
	plugins: [require('daisyui')],
};
