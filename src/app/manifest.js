export default function manifest() {
    return {
        name: 'Khateeb | Full Stack Developer',
        short_name: 'Khateeb',
        description: 'Full Stack Developer & Digital Strategist Portfolio',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
