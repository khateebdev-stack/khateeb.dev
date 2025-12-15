"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, CheckCircle2, XCircle, AlertCircle, ArrowRight, RefreshCw, TrendingUp, Globe } from "lucide-react"
import Link from "next/link"

export default function SEOScorecardPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const [error, setError] = useState("")

    const analyzeSEO = async () => {
        if (!url) {
            setError("Please enter a valid URL")
            return
        }

        let testUrl = url
        if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
            testUrl = 'https://' + testUrl
        }

        setLoading(true)
        setError("")
        setResults(null)

        try {
            // Fetch the page HTML
            const response = await fetch(`/api/seo-check?url=${encodeURIComponent(testUrl)}`)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to analyze page")
            }

            setResults(data)
        } catch (err) {
            console.error(err)
            setError(err.message || "Failed to analyze SEO. Please check the URL and try again.")
        } finally {
            setLoading(false)
        }
    }

    const CheckItem = ({ status, title, description }) => {
        const Icon = status === 'pass' ? CheckCircle2 : status === 'fail' ? XCircle : AlertCircle
        const color = status === 'pass' ? 'text-green-600' : status === 'fail' ? 'text-red-600' : 'text-orange-600'
        const bgColor = status === 'pass' ? 'bg-green-50 dark:bg-green-900/10' : status === 'fail' ? 'bg-red-50 dark:bg-red-900/10' : 'bg-orange-50 dark:bg-orange-900/10'

        return (
            <div className={`${bgColor} rounded-lg p-4 flex items-start gap-3`}>
                <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                <div className="flex-1">
                    <div className="font-semibold mb-1">{title}</div>
                    <div className="text-sm text-muted-foreground">{description}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container px-4 md:px-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
                        <Search className="w-10 h-10 text-primary" />
                        SEO Scorecard
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Get an instant SEO audit of your website. Check meta tags, headings, mobile-friendliness, and more.
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-card border rounded-2xl p-8 shadow-sm mb-8">
                    <div className="max-w-2xl mx-auto">
                        <Label htmlFor="url" className="text-lg font-semibold mb-3 block">
                            Enter Your Website URL
                        </Label>
                        <div className="flex gap-3">
                            <Input
                                id="url"
                                type="text"
                                placeholder="example.com or https://example.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && analyzeSEO()}
                                className="text-lg h-14"
                                disabled={loading}
                            />
                            <Button
                                onClick={analyzeSEO}
                                disabled={loading || !url}
                                size="lg"
                                className="h-14 px-8 font-bold"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="mr-2 w-5 h-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 w-5 h-5" />
                                        Analyze SEO
                                    </>
                                )}
                            </Button>
                        </div>
                        {error && (
                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                            </div>
                        )}
                        <p className="text-sm text-muted-foreground mt-3">
                            💡 Free basic SEO analysis - checks essential on-page factors
                        </p>
                    </div>
                </div>

                {/* Results */}
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Score */}
                        <div className="bg-card border rounded-2xl p-8 shadow-sm text-center">
                            <div className="text-6xl font-bold mb-2" style={{
                                color: results.score >= 8 ? 'rgb(22, 163, 74)' : results.score >= 5 ? 'rgb(234, 88, 12)' : 'rgb(220, 38, 38)'
                            }}>
                                {results.score}/10
                            </div>
                            <div className="text-xl font-semibold mb-4">SEO Score</div>
                            <div className="max-w-2xl mx-auto text-muted-foreground">
                                {results.score >= 8 ? "Great job! Your basic SEO is in good shape." :
                                    results.score >= 5 ? "Room for improvement. Fixing these issues will boost your rankings." :
                                        "Significant SEO issues detected. Your site needs optimization."}
                            </div>
                        </div>

                        {/* Checks */}
                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6">SEO Checklist</h2>
                            <div className="space-y-4">
                                {results.checks.map((check, index) => (
                                    <CheckItem key={index} {...check} />
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        {results.recommendations && results.recommendations.length > 0 && (
                            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6" />
                                    Priority Fixes
                                </h3>
                                <ul className="space-y-2">
                                    {results.recommendations.map((rec, index) => (
                                        <li key={index} className="flex gap-2">
                                            <span className="text-orange-600 font-bold">•</span>
                                            <span>{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
                            <div className="max-w-3xl mx-auto text-center">
                                <h3 className="text-2xl font-bold mb-3">Need Professional SEO Help?</h3>
                                <p className="text-muted-foreground mb-6">
                                    I can provide a comprehensive SEO audit and implement fixes to improve your search rankings.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="font-bold h-12">
                                        <Link href={`/contact?subject=SEO Audit Request&body=${encodeURIComponent(`I ran an SEO check on ${results.url}\n\nCurrent Score: ${results.score}/10\n\nI'd like to discuss improving my website's SEO.`)}`}>
                                            Get Full SEO Audit <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="h-12">
                                        <Link href="/services/seo-marketing">
                                            View SEO Services
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Info */}
                {!results && !loading && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-card border rounded-xl p-6">
                            <CheckCircle2 className="w-8 h-8 text-green-600 mb-3" />
                            <h3 className="font-bold mb-2">Meta Tags</h3>
                            <p className="text-sm text-muted-foreground">Check if your title tags and meta descriptions are properly configured.</p>
                        </div>
                        <div className="bg-card border rounded-xl p-6">
                            <Globe className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-bold mb-2">Mobile Friendly</h3>
                            <p className="text-sm text-muted-foreground">Ensure your site works well on mobile devices for better rankings.</p>
                        </div>
                        <div className="bg-card border rounded-xl p-6">
                            <TrendingUp className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-bold mb-2">Quick Wins</h3>
                            <p className="text-sm text-muted-foreground">Identify easy fixes that can immediately improve your SEO.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
