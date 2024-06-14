/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            container: {
                screens: {
                    xs: '320px',
                    sm: '450px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1440px',
                },
            },
        },
    },
    plugins: [],
}
