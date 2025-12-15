"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react"

export function ShareButtons({ title, text, url }) {
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(text)

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: "hover:text-blue-600"
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            color: "hover:text-sky-500"
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            color: "hover:text-green-500"
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:text-blue-700"
        }
    ]

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
            {shareLinks.map((link) => (
                <Button
                    key={link.name}
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-full ${link.color}`}
                    onClick={() => window.open(link.href, '_blank', 'width=600,height=400')}
                    title={`Share on ${link.name}`}
                >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">Share on {link.name}</span>
                </Button>
            ))}
        </div>
    )
}
