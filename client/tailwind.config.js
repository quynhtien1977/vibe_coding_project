/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'premium-gold': '#D4AF37',
                'deep-red': '#8B0000',
                'cream': '#FFFDD0',
                // Light mode colors
                'light-bg-start': '#FFF9F0',
                'light-bg-end': '#FFE4D6',
                'light-text': '#2C2C2C',
                'light-text-secondary': '#5A5A5A',
                'light-card': '#FFFFFF',
                'light-border': '#E5D4B8',
                'light-accent-red': '#C41E3A',
                // Dark mode colors
                'dark-bg-start': '#1A1A1A',
                'dark-bg-end': '#2D2D2D',
                'dark-text': '#FFFFFF',
                'dark-text-secondary': '#B0B0B0',
                'dark-card': '#FFFFFF0D',
                'dark-border': '#FFFFFF1A',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
