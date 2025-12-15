
export const metadata = {
    title: 'Free Website Speed Test - Analyze Performance in 30 Seconds | Powered by Google PageSpeed',
    description: 'Check your website speed for free! Get instant performance scores, Core Web Vitals, and optimization tips. Powered by Google PageSpeed Insights API. No signup required.',
    keywords: [
        'website speed test',
        'free speed test',
        'google pagespeed',
        'website performance',
        'core web vitals',
        'lighthouse score',
        'page speed insights',
        'website analyzer',
        'speed optimization',
        'free seo tool'
    ],
    openGraph: {
        title: 'Free Website Speed Test - Instant Performance Analysis',
        description: 'Analyze your website speed in 30 seconds. Get detailed performance metrics, SEO scores, and actionable optimization tips.',
        url: 'https://khateeb.dev/tools/speed-analyzer',
        siteName: 'Khateeb Dev Tools',
        images: [
            {
                url: '/services/og/web-app-development.png', // Fallback or specific OG image
                width: 1200,
                height: 630,
                alt: 'Website Speed Analyzer Tool'
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Website Speed Test Tool',
        description: 'Check your website speed instantly. Powered by Google PageSpeed Insights.',
        images: ['/services/og/web-app-development.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://khateeb.dev/tools/speed-analyzer',
    },
}

export default function SpeedAnalyzerLayout({ children }) {
    return (
        <>
            {/* JSON-LD Structured Data for Rich Results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Website Speed Test Tool",
                        "description": "Free website speed analyzer powered by Google PageSpeed Insights. Get instant performance scores and optimization tips.",
                        "url": "https://khateeb.dev/tools/speed-analyzer",
                        "applicationCategory": "UtilityApplication",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "publisher": {
                            "@type": "Person",
                            "name": "Khateeb",
                            "url": "https://khateeb.dev"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "ratingCount": "150"
                        },
                        "featureList": [
                            "Google PageSpeed Integration",
                            "Core Web Vitals Analysis",
                            "Mobile & Desktop Testing",
                            "Free Unlimited Tests",
                            "No Signup Required"
                        ]
                    })
                }}
            />
            {children}
        </>
    )
}
