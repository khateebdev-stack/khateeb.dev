"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * SafeAdContainer - Universal wrapper for ANY ad network (Monetag, Google, etc.)
 * 
 * Usage:
 * <SafeAdContainer>
 *    {/* Paste your script tag logic here /}
 *    <div id="ad-container-id"></div>
 * </SafeAdContainer>
 * 
 * OR easier usage for scripts:
 * 
 * <SafeAdContainer 
 *    scriptSrc="https://url.com/tag.js" 
 *    scriptId="monetag-main"
 *    attributes={{ 'data-zone': '123456' }} 
 * />
 */
export function SafeAdContainer({ children, scriptSrc, scriptId, attributes = {}, className = "" }) {
    const pathname = usePathname()
    const containerRef = useRef(null)

    // STRICT RULE: Only allow ads on paths starting with /tools/
    // This protects homepage, services, and portfolio from ever showing ads
    const isToolPage = pathname?.startsWith('/tools/')

    useEffect(() => {
        // If it's not a tool page, do cleanup if needed and exit
        if (!isToolPage) {
            if (scriptId && typeof document !== 'undefined') {
                const existingScript = document.getElementById(scriptId)
                if (existingScript) existingScript.remove()
            }
            return
        }

        // It IS a tool page, load the external script if provided
        if (isToolPage && scriptSrc && scriptId) {
            // Check if script already exists to avoid duplicates
            if (document.getElementById(scriptId)) return

            const script = document.createElement('script')
            script.src = scriptSrc
            script.id = scriptId
            script.async = true

            // Default attribute for some networks
            script.setAttribute('data-cfasync', 'false') 
            
            // Add custom attributes (e.g. data-zone for Monetag)
            Object.entries(attributes).forEach(([key, value]) => {
                script.setAttribute(key, value)
            })

            document.body.appendChild(script)

            // Debug log for testing (User requested how to test)
            console.log(`✅ Ad Network Script Loaded: ${scriptId} on page: ${pathname}`)

            return () => {
                // Optional: Cleanup script on unmount/navigation
                // Some networks prefer persistent scripts, remove if issues arise
                // const s = document.getElementById(scriptId)
                // if (s) s.remove()
            }
        }
    }, [isToolPage, pathname, scriptSrc, scriptId, JSON.stringify(attributes)])

    // If not a tool page, render NOTHING (null)
    if (!isToolPage) return null

    return (
        <div ref={containerRef} className={`ad-safe-wrapper ${className}`}>
            {/* If children provided (like banner divs), render them */}
            {children}

            {/* Visual indicator for localhost testing only */}
            {process.env.NODE_ENV === 'development' && (
                <div className="text-[10px] text-gray-400 text-center border border-dashed border-gray-300 p-1 mt-2 mb-2">
                    Ads Allowed Zone (Only visible on /tools/)
                </div>
            )}
        </div>
    )
}
