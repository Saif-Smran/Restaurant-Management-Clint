/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // adjust if your paths differ
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                quicksand: ['Quicksand', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
                nunito: ['Nunito', 'sans-serif'],
                caveat: ['Caveat', 'cursive'],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "cupcake"], // your desired themes
    },
}
