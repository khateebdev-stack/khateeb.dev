"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Search, AlertCircle, CheckCircle2, TrendingDown, TrendingUp, Smartphone, Monitor, ArrowRight, RefreshCw, Clock } from "lucide-react"
import Link from "next/link"

export default function SpeedAnalyzerPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const [error, setError] = useState("")

    const analyzeSpeed = async () => {
        if (!url) {
            setError("Please enter a valid URL")
            return
        }

        // Basic URL validation
        let testUrl = url
        if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
            testUrl = 'https://' + testUrl
        }

        setLoading(true)
        setError("")
        setResults(null)

        try {
            // Using Google PageSpeed Insights API
            const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY

            console.log('🔑 API Key exists:', !!apiKey)
            console.log('🌐 Testing URL:', testUrl)

            if (!apiKey) {
                throw new Error('PageSpeed API key not configured. Please add NEXT_PUBLIC_PAGESPEED_API_KEY to .env.local')
            }

            const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&key=${apiKey}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`
            
            console.log('📡 Calling PageSpeed API...')
            const response = await fetch(apiUrl)
            const data = await response.json()

            console.log('📊 Full API Response:', data)

            if (data.error) {
                console.error('❌ API Error:', data.error)
                throw new Error(data.error.message || "Failed to analyze website")
            }

            // Check if we have the required data
            if (!data.lighthouseResult) {
                console.error('❌ Missing lighthouseResult in response')
                throw new Error('Invalid API response - missing lighthouse data')
            }

            // Extract key metrics
            const lighthouseResult = data.lighthouseResult
            const categories = lighthouseResult.categories
            const audits = lighthouseResult.audits

            console.log('📈 Categories:', categories)
            console.log('🔍 Audits available:', Object.keys(audits).slice(0, 10))

            // Safely extract scores with fallbacks
            const results = {
                url: testUrl,
                scores: {
                    performance: categories?.performance?.score ? Math.round(categories.performance.score * 100) : 0,
                    accessibility: categories?.accessibility?.score ? Math.round(categories.accessibility.score * 100) : 0,
                    bestPractices: categories?.['best-practices']?.score ? Math.round(categories['best-practices'].score * 100) : 0,
                    seo: categories?.seo?.score ? Math.round(categories.seo.score * 100) : 0
                },
                metrics: {
                    fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
                    lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
                    tbt: audits['total-blocking-time']?.displayValue || 'N/A',
                    cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
                    speedIndex: audits['speed-index']?.displayValue || 'N/A'
                },
                opportunities: Object.values(audits)
                    .filter(audit =>
                        audit.score !== null &&
                        audit.score !== undefined &&
                        audit.score < 0.9 &&
                        audit.title &&
                        audit.description
                    )
                    .slice(0, 5)
                    .map(audit => ({
                        title: audit.title,
                        description: audit.description,
                        score: Math.round((audit.score || 0) * 100)
                    }))
            }

            console.log('✅ Processed Results:', results)
            setResults(results)

        } catch (err) {
            console.error('💥 Analysis Error:', err)
            setError(err.message || "Failed to analyze website. Please check the URL and try again.")
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score) => {
        if (score >= 90) return "text-green-600 dark:text-green-400"
        if (score >= 50) return "text-orange-600 dark:text-orange-400"
        return "text-red-600 dark:text-red-400"
    }

    const getScoreBgColor = (score) => {
        if (score >= 90) return "bg-green-100 dark:bg-green-900/20"
        if (score >= 50) return "bg-orange-100 dark:bg-orange-900/20"
        return "bg-red-100 dark:bg-red-900/20"
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container px-4 md:px-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
                        <Zap className="w-10 h-10 text-primary" />
                        Website Speed Analyzer
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Discover how fast your website really is. Get instant insights and recommendations to boost performance.
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
                                onKeyPress={(e) => e.key === 'Enter' && analyzeSpeed()}
                                className="text-lg h-14"
                                disabled={loading}
                            />
                            <Button
                                onClick={analyzeSpeed}
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
                                        Analyze
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
                            💡 Free analysis powered by Google PageSpeed Insights
                        </p>
                    </div>
                </div>

                {/* Results Section */}
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Overall Scores */}
                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-primary" />
                                Performance Scores
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {Object.entries(results.scores).map(([key, score]) => (
                                    <div key={key} className={`${getScoreBgColor(score)} rounded-xl p-6 text-center`}>
                                        <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
                                            {score}
                                        </div>
                                        <div className="text-sm font-medium capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Overall Assessment */}
                            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                                {results.scores.performance >= 90 ? (
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-green-700 dark:text-green-400">Excellent Performance!</p>
                                            <p className="text-sm text-muted-foreground">Your website is fast and optimized.</p>
                                        </div>
                                    </div>
                                ) : results.scores.performance >= 50 ? (
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-orange-700 dark:text-orange-400">Needs Improvement</p>
                                            <p className="text-sm text-muted-foreground">There's room for optimization to improve user experience.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-3">
                                        <TrendingDown className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-red-700 dark:text-red-400">Poor Performance</p>
                                            <p className="text-sm text-muted-foreground">Your website is significantly slower than it should be. This affects user experience and SEO.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-primary" />
                                Core Metrics
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-muted/30 rounded-lg">
                                    <div className="font-semibold mb-1">First Contentful Paint</div>
                                    <div className="text-2xl font-bold text-primary">{results.metrics.fcp}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Time until first content appears</div>
                                </div>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                    <div className="font-semibold mb-1">Largest Contentful Paint</div>
                                    <div className="text-2xl font-bold text-primary">{results.metrics.lcp}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Main content load time</div>
                                </div>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                    <div className="font-semibold mb-1">Total Blocking Time</div>
                                    <div className="text-2xl font-bold text-primary">{results.metrics.tbt}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Time page is unresponsive</div>
                                </div>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                    <div className="font-semibold mb-1">Cumulative Layout Shift</div>
                                    <div className="text-2xl font-bold text-primary">{results.metrics.cls}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Visual stability score</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
                            <div className="max-w-3xl mx-auto text-center">
                                <h3 className="text-2xl font-bold mb-3">Want a Faster Website?</h3>
                                <p className="text-muted-foreground mb-6">
                                    I can optimize your website for speed, improve user experience, and boost your SEO rankings.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="font-bold h-12">
                                        <Link href={`/contact?subject=Speed Optimization Request&body=${encodeURIComponent(`I ran a speed test on ${results.url}\n\nCurrent Performance Score: ${results.scores.performance}/100\n\nI'd like to discuss optimizing my website for better performance.`)}`}>
                                            Get Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="h-12">
                                        <Link href="/services/web-app-development">
                                            View Web Development Services
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Info Section (shown when no results) */}
                {!results && !loading && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-card border rounded-xl p-6">
                            <Zap className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-bold mb-2">Lightning Fast Analysis</h3>
                            <p className="text-sm text-muted-foreground">Get comprehensive performance metrics in seconds using Google's PageSpeed Insights.</p>
                        </div>
                        <div className="bg-card border rounded-xl p-6">
                            <Monitor className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-bold mb-2">Desktop & Mobile</h3>
                            <p className="text-sm text-muted-foreground">See how your site performs across all devices and identify mobile-specific issues.</p>
                        </div>
                        <div className="bg-card border rounded-xl p-6">
                            <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-bold mb-2">Actionable Insights</h3>
                            <p className="text-sm text-muted-foreground">Receive specific recommendations to improve load times and user experience.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
