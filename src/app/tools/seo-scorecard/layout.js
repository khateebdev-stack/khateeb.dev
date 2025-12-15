
export const metadata = {
    title: 'Free SEO Scorecard - Instant Website SEO Audit & Checker',
    description: 'Get a free instant SEO audit for your website. Check meta tags, mobile friendliness, headings, and more. Improve your Google ranking with actionable tips.',
    keywords: [
        'seo scorecard',
        'free seo audit',
        'seo checker',
        'website seo analysis',
        'on-page seo checker',
        'free seo tool',
        'meta tag checker',
        'mobile friendly test'
    ],
    openGraph: {
        title: 'Free SEO Audit Tool - Check Your Website Ranking',
        description: 'Instant SEO analysis for your website. Find errors preventing you from ranking #1 on Google.',
        url: 'https://khateeb.dev/tools/seo-scorecard',
        siteName: 'Khateeb Dev Tools',
        images: [
            {
                url: '/services/og/seo-optimization.png',
                width: 1200,
                height: 630,
                alt: 'SEO Scorecard Tool'
            }
        ],
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://khateeb.dev/tools/seo-scorecard',
    },
}

export default function SEOScorecardLayout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Free SEO Scorecard",
                        "description": "Instant SEO audit tool to check website rankings factors.",
                        "url": "https://khateeb.dev/tools/seo-scorecard",
                        "applicationCategory": "UtilityApplication",
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
