module.exports = {
content: [
"./app/**/*.{js,jsx}",
"./components/**/*.{js,jsx}",
],
theme: {
extend: {
colors: {
gold: {
50: '#FFF9E6',
100: '#FFF2CC',
200: '#FFE699',
300: '#FFD966',
400: '#FFC933',
500: '#E6B400', // primary accent
600: '#CC9F00',
700: '#A68000',
800: '#806200',
900: '#594400'
}
},
boxShadow: {
'gold': '0 1px 2px rgba(0,0,0,0.12), 0 6px 20px rgba(230,180,0,0.25)'
},
fontFamily: {
display: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
sans: ["Inter", "ui-sans-serif", "system-ui"],
},
},
},
plugins: [],
};