"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export function AdSanitizer() {
    const pathname = usePathname()
    // We use a ref to store the previous path so we can detect "transitions"
    const prevPathRef = useRef(pathname)

    useEffect(() => {
        const prevPath = prevPathRef.current
        const currentPath = pathname
        const isToolPage = currentPath?.startsWith('/tools/')

        // Detect if we just LEFT the tools section
        // (Previously we were on /tools/..., now we are NOT)
        const justLeftTools = prevPath?.startsWith('/tools/') && !isToolPage

        if (justLeftTools) {
            console.log("⚠️ Leaving Tools Zone - Forcing Hard Reload to Wipe Ad Scripts...")

            // 1. Unregister Service Workers FIRST (Critical for Push Ads)
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function (registrations) {
                    for (let registration of registrations) {
                        if (registration.scope.includes(window.location.origin)) {
                            registration.unregister()
                        }
                    }
                })
            }

            // 2. FORCE RELOAD to kill all global event listeners (Popunders, etc.)
            // This is the only 100% cure for Monetag sticky behavior in SPA
            window.location.reload()
            return
        }

        // Just update ref for next route change
        prevPathRef.current = currentPath

    }, [pathname])

    // Keep this secondary cleanup just in case (runs on mount of non-tool pages)
    useEffect(() => {
        const isToolPage = pathname?.startsWith('/tools/')

        if (!isToolPage) {
            // Cleanup visual clutter immediately while reload might be pending
            const googleOverlays = document.querySelectorAll('.google-auto-placed, .adsbygoogle-noablate')
            googleOverlays.forEach(el => el.remove())
        }
    }, [pathname])

    return null
}
