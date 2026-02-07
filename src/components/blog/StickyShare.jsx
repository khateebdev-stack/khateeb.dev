"use client"

import { Twitter, Facebook, Github, MessageCircle, Link2, Check, Linkedin } from "lucide-react"
import { useState } from "react"

export function StickyShare({ config, title, url }) {
    const [copied, setCopied] = useState(false)
    if (!config?.sticky_bar) return null

    // Safe URL
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(title || '')

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="fixed z-50 bottom-6 left-6 right-6 xl:left-8 xl:right-auto xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 flex flex-row xl:flex-col items-center justify-around xl:justify-start gap-3 p-3 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-2xl transition-all">
            {config.show_twitter && (
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Twitter"
                    className="p-3 bg-muted/50 hover:bg-sky-500 hover:text-white rounded-full transition-all duration-300"
                >
                    <Twitter className="w-5 h-5" />
                </a>
            )}
            {config.show_facebook && (
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Facebook"
                    className="p-3 bg-muted/50 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300"
                >
                    <Facebook className="w-5 h-5" />
                </a>
            )}
            {config.show_github && (
                <a
                    href="https://github.com/khateebdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View My GitHub"
                    className="p-3 bg-muted/50 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-all duration-300"
                >
                    <Github className="w-5 h-5" />
                </a>
            )}
            {config.show_whatsapp && (
                <a
                    href={`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on WhatsApp"
                    className="p-3 bg-muted/50 hover:bg-green-500 hover:text-white rounded-full transition-all duration-300"
                >
                    <MessageCircle className="w-5 h-5" />
                </a>
            )}
            {config.show_copy_link && (
                <button
                    onClick={handleCopy}
                    title="Copy Link"
                    className="p-3 bg-muted/50 hover:bg-yellow-500 hover:text-white rounded-full transition-all duration-300"
                >
                    {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
                </button>
            )}
        </div>
    )
}
