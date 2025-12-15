
export const metadata = {
    title: 'Website Project Cost Estimator - Get Instant Web Development Quote',
    description: 'Calculate the cost of your web development project instantly. Select features for E-commerce, SaaS, or Business websites and get a detailed breakdown.',
    keywords: [
        'website cost estimator',
        'web development cost',
        'app development cost calculator',
        'website pricing calculator',
        'web design quote',
        'software development cost',
        'freelance web developer rates'
    ],
    openGraph: {
        title: 'Project Cost Estimator - Instant Web Development Quote',
        description: 'Get a transparent cost estimate for your next web or mobile project in seconds.',
        url: 'https://khateeb.dev/tools/project-estimator',
        siteName: 'Khateeb Dev Tools',
        images: [
            {
                url: '/services/og/web-app-development.png',
                width: 1200,
                height: 630,
                alt: 'Project Cost Estimator'
            }
        ],
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://khateeb.dev/tools/project-estimator',
    },
}

export default function ProjectEstimatorLayout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Project Cost Estimator",
                        "description": "Calculate web and mobile app development costs instantly.",
                        "url": "https://khateeb.dev/tools/project-estimator",
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
