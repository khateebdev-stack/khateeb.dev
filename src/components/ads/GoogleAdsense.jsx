"use client"

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function GoogleAdsense({ adClient }) {
    const pathname = usePathname()

    // Only show ads on tools pages
    const showAds = pathname?.startsWith('/tools/')

    useEffect(() => {
        if (showAds && typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({})
            } catch (err) {
                console.error('AdSense error:', err)
            }
        }
    }, [showAds, pathname])

    if (!showAds) {
        return null // No ads on portfolio, services, or contact pages
    }

    return (
        <div className="my-8 flex justify-center">
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={adClient}
                data-ad-slot="YOUR_AD_SLOT_ID"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    )
}

// Display Ad Component (for tool results)
export function GoogleAdsenseDisplayAd({ adClient, adSlot }) {
    const pathname = usePathname()
    const showAds = pathname?.startsWith('/tools/')

    useEffect(() => {
        if (showAds && typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({})
            } catch (err) {
                console.error('AdSense error:', err)
            }
        }
    }, [showAds])

    if (!showAds) return null

    return (
        <div className="my-6">
            <p className="text-xs text-muted-foreground text-center mb-2">Advertisement</p>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format="horizontal"
                data-full-width-responsive="true"
            />
        </div>
    )
}

// In-Article Ad (Between results sections)
export function GoogleAdsenseInArticle({ adClient, adSlot }) {
    const pathname = usePathname()
    const showAds = pathname?.startsWith('/tools/')

    useEffect(() => {
        if (showAds && typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({})
            } catch (err) {
                console.error('AdSense error:', err)
            }
        }
    }, [showAds])

    if (!showAds) return null

    return (
        <div className="my-8 p-4 border rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground text-center mb-3">Sponsored Content</p>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-layout="in-article"
                data-ad-format="fluid"
            />
        </div>
    )
}
