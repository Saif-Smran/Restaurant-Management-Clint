/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
                'quicksand': ['Quicksand', 'sans-serif'],
                'raleway': ['Raleway', 'sans-serif'],
                'nunito': ['Nunito', 'sans-serif'],
                'caveat': ['Caveat', 'cursive'],
            },
            colors: {
                primary: '#FF6B6B',
                secondary: '#4ECDC4',
                dark: '#2D3436',
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "cupcake"], // your desired themes
    },
}
