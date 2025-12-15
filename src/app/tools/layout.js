export const metadata = {
    title: 'Free Web Development Tools - Speed, SEO, ROI & Cost Calculator',
    description: 'A suite of free professional tools for web developers and business owners. Check website speed, calculate ROI, estimate project costs, and audit SEO.',
    keywords: [
        'web development tools',
        'free seo tools',
        'website speed test',
        'roi calculator',
        'project cost estimator',
        'developer tools'
    ],
    openGraph: {
        title: 'Free Web Development Tools - Khateeb Dev',
        description: 'Professional tools to analyze and improve your digital presence.',
        url: 'https://khateeb.dev/tools',
        type: 'website',
    }
}

import { SafeAdContainer } from "@/components/ads/SafeAdContainer";

export default function ToolsLayout({ children }) {
    return (
        <>
            {children}

            {/* --- AD NETWORK INTEGRATION (Strictly Scoped to /tools/) --- */}

            {/* 1. Google AdSense */}
            <SafeAdContainer
                scriptSrc="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5348419488742899"
                scriptId="google-adsense"
            />

            {/* 2. Monetag (Push/Multi-Tag) */}
            <SafeAdContainer
                scriptSrc="https://al5sm.com/tag.min.js"
                scriptId="monetag-multitag"
                attributes={{ 'data-zone': '10327103' }}
            />

            {/* 3. Monetag (Vignette) */}
            <SafeAdContainer
                scriptSrc="https://gizokraijaw.net/vignette.min.js"
                scriptId="monetag-vignette"
                attributes={{ 'data-zone': '10327118' }}
            />

            {/* 4. Monetag (Service Worker Registration) */}
            <SafeAdContainer>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                                    console.log('✅ Monetag Service Worker Registered for scope:', registration.scope);
                                }).catch(function(err) {
                                    console.log('❌ Monetag Service Worker failed:', err);
                                });
                            }
                        `
                    }}
                />
            </SafeAdContainer>
        </>
    )
}
