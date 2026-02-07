"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

export function CodeSnippet({ data }) {
    const [copied, setCopied] = useState(false)
    const { language, code, show_line_numbers } = data

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="my-8 rounded-lg overflow-hidden border border-border bg-slate-950 text-slate-50 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <span className="text-xs font-mono uppercase text-slate-400">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className={`font-mono text-sm leading-relaxed ${show_line_numbers ? 'pl-2' : ''}`}>
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    )
}
