/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
    ],
    theme: {
        colors: {
            blue: {
                100: '#1fb6ff',
                700: 'blue',
            },
        },
        spacing: {
            1: '8px',
            //
            2: '15px',
            3: '18px',
            4: '20px',
            5: '25px',
            6: '35px',
            //
            7: '48px',
        },
        extend: {},
    },
    plugins: [],
};
