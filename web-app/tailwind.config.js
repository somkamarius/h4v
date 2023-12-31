/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            backgroundImage:
                'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100',
        },
    },

    plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
}
