
export const metadata = {
    title: 'Free ROI Calculator - Website Investment Return Calculator | Calculate Revenue Potential',
    description: 'Calculate ROI from your website investment. See potential revenue increase, payback period, and conversion improvements. Free online business calculator.',
    keywords: [
        'roi calculator',
        'return on investment calculator',
        'website roi calculator',
        'business calculator',
        'revenue calculator',
        'investment calculator',
        'conversion rate calculator',
        'website investment',
        'ecommerce roi',
        'free roi tool'
    ],
    openGraph: {
        title: 'Free ROI Calculator - Calculate Website Investment Returns',
        description: 'Calculate how much additional revenue your website could generate. Get instant ROI projections and payback timeline.',
        url: 'https://khateeb.dev/tools/roi-calculator',
        siteName: 'Khateeb Dev Tools',
        images: [
            {
                url: '/services/og/ecommerce-solution.png',
                width: 1200,
                height: 630,
                alt: 'ROI Calculator Tool'
            }
        ],
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://khateeb.dev/tools/roi-calculator',
    },
}

export default function ROICalculatorLayout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Website ROI Calculator",
                        "description": "Calculate return on investment for website projects. Free business calculator for revenue projections.",
                        "url": "https://khateeb.dev/tools/roi-calculator",
                        "applicationCategory": "BusinessApplication",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />
            {children}
        </>
    )
}
