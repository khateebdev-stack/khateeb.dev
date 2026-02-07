import { SafeAdContainer } from "@/components/ads/SafeAdContainer"

export const metadata = {
    title: {
        template: '%s | Khateeb.dev Blog',
        default: 'Expert Web Development & SEO Blog | Khateeb.dev'
    },
    description: 'Insights on Full Stack Development, SEO, Performance Optimization, and System Architecture.',
}

export default function BlogLayout({ children }) {
    return (
        <div className="relative min-h-screen">
            {children}

            <div className="mt-20 border-t border-border/40 py-10 bg-muted/20">
                <div className="container max-w-4xl mx-auto">
                    {/* AdSense Logic (Bottom of Blog) */}
                    <div className="flex justify-center my-8">
                        <SafeAdContainer
                            adNetwork="adsense"
                            slotId="8932742938" // Use a real slot if available or generic
                            format="auto"
                            responsive="true"
                            style={{ display: 'block' }}
                        />
                    </div>

                    {/* Monetag Vignette/Multi-tag for Blog Section */}
                    <SafeAdContainer
                        adNetwork="monetag"
                        tagType="vignette"
                    />
                </div>
            </div>
        </div>
    )
}
