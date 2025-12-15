"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowRight, RefreshCw, Calculator } from "lucide-react"
import Link from "next/link"

export default function ROICalculatorPage() {
    const [formData, setFormData] = useState({
        monthlyVisitors: "",
        currentConversion: "",
        averageOrderValue: "",
        websiteInvestment: ""
    })

    const [results, setResults] = useState(null)

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const calculateROI = () => {
        const visitors = parseFloat(formData.monthlyVisitors) || 0
        const conversion = parseFloat(formData.currentConversion) || 0
        const orderValue = parseFloat(formData.averageOrderValue) || 0
        const investment = parseFloat(formData.websiteInvestment) || 2999

        // Current revenue
        const currentRevenue = visitors * (conversion / 100) * orderValue

        // Conservative improvement estimates (industry standard)
        const improvedConversion = conversion * 2.5 // 2.5x conversion improvement
        const improvedRevenue = visitors * (improvedConversion / 100) * orderValue

        // Calculate gains
        const monthlyGain = improvedRevenue - currentRevenue
        const yearlyGain = monthlyGain * 12
        const roi = ((yearlyGain - investment) / investment) * 100
        const paybackMonths = Math.ceil(investment / monthlyGain)

        setResults({
            current: {
                revenue: currentRevenue,
                conversion: conversion,
                orders: visitors * (conversion / 100)
            },
            improved: {
                revenue: improvedRevenue,
                conversion: improvedConversion,
                orders: visitors * (improvedConversion / 100)
            },
            gains: {
                monthly: monthlyGain,
                yearly: yearlyGain,
                roi: roi,
                payback: paybackMonths
            },
            investment: investment
        })
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    const resetCalculator = () => {
        setFormData({
            monthlyVisitors: "",
            currentConversion: "",
            averageOrderValue: "",
            websiteInvestment: ""
        })
        setResults(null)
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
                        <DollarSign className="w-10 h-10 text-green-600" />
                        ROI Calculator
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Calculate how much additional revenue a better website could generate for your business
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr,400px] gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div className="bg-card border rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Enter Your Current Metrics
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="monthlyVisitors">Monthly Website Visitors</Label>
                                    <Input
                                        id="monthlyVisitors"
                                        type="number"
                                        placeholder="e.g., 10000"
                                        value={formData.monthlyVisitors}
                                        onChange={handleInputChange}
                                        className="mt-2"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Check Google Analytics for this number</p>
                                </div>

                                <div>
                                    <Label htmlFor="currentConversion">Current Conversion Rate (%)</Label>
                                    <Input
                                        id="currentConversion"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 2.0"
                                        value={formData.currentConversion}
                                        onChange={handleInputChange}
                                        className="mt-2"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Industry average is 2-3%</p>
                                </div>

                                <div>
                                    <Label htmlFor="averageOrderValue">Average Order Value ($)</Label>
                                    <Input
                                        id="averageOrderValue"
                                        type="number"
                                        placeholder="e.g., 100"
                                        value={formData.averageOrderValue}
                                        onChange={handleInputChange}
                                        className="mt-2"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Average amount per purchase</p>
                                </div>

                                <div>
                                    <Label htmlFor="websiteInvestment">Website Investment ($)</Label>
                                    <Input
                                        id="websiteInvestment"
                                        type="number"
                                        placeholder="2999"
                                        value={formData.websiteInvestment}
                                        onChange={handleInputChange}
                                        className="mt-2"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Estimated cost for a new optimized website</p>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={calculateROI}
                                    disabled={!formData.monthlyVisitors || !formData.currentConversion || !formData.averageOrderValue}
                                    className="flex-1 font-bold"
                                    size="lg"
                                >
                                    <Calculator className="mr-2 w-4 h-4" />
                                    Calculate ROI
                                </Button>
                                {results && (
                                    <Button
                                        onClick={resetCalculator}
                                        variant="outline"
                                        size="lg"
                                    >
                                        <RefreshCw className="mr-2 w-4 h-4" />
                                        Reset
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Conservative Estimates</h3>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                This calculator uses industry-standard conversion improvements (2.5x) based on optimized website design, faster load times, and better UX. Your actual results may vary.
                            </p>
                        </div>
                    </div>

                    {/* Results Sidebar */}
                    <div>
                        {results ? (
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Current vs Improved */}
                                <div className="bg-card border rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold mb-6">Your Potential</h3>

                                    {/* Current State */}
                                    <div className="mb-6 pb-6 border-b">
                                        <div className="text-sm text-muted-foreground mb-2">Current Monthly Revenue</div>
                                        <div className="text-3xl font-bold text-muted-foreground/70">
                                            {formatCurrency(results.current.revenue)}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {results.current.orders.toFixed(0)} orders/month
                                        </div>
                                    </div>

                                    {/* Improved State */}
                                    <div className="mb-6 pb-6 border-b">
                                        <div className="text-sm text-muted-foreground mb-2">With Optimized Website</div>
                                        <div className="text-3xl font-bold text-green-600">
                                            {formatCurrency(results.improved.revenue)}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {results.improved.orders.toFixed(0)} orders/month ({results.improved.conversion.toFixed(1)}% conversion)
                                        </div>
                                    </div>

                                    {/* Monthly Gain */}
                                    <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4 mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold">Monthly Gain</span>
                                            <TrendingUp className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-green-600">
                                            +{formatCurrency(results.gains.monthly)}
                                        </div>
                                    </div>

                                    {/* Yearly Projection */}
                                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                                        <div className="text-sm text-muted-foreground mb-1">Yearly Additional Revenue</div>
                                        <div className="text-2xl font-bold text-primary">
                                            {formatCurrency(results.gains.yearly)}
                                        </div>
                                    </div>
                                </div>

                                {/* ROI Metrics */}
                                <div className="bg-card border rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold mb-4">Investment Analysis</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Initial Investment</span>
                                            <span className="font-bold">{formatCurrency(results.investment)}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Payback Period</span>
                                            <span className="font-bold text-primary">
                                                {results.gains.payback} month{results.gains.payback !== 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <div className="text-sm text-muted-foreground mb-1">Return on Investment</div>
                                            <div className="text-4xl font-bold text-green-600">
                                                {results.gains.roi.toFixed(0)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full font-bold h-12"
                                >
                                    <Link href={`/contact?subject=ROI-Driven Website Project&body=${encodeURIComponent(
                                        `I used your ROI calculator and here are my results:\n\n` +
                                        `Current Monthly Revenue: ${formatCurrency(results.current.revenue)}\n` +
                                        `Potential Monthly Revenue: ${formatCurrency(results.improved.revenue)}\n` +
                                        `Monthly Gain: ${formatCurrency(results.gains.monthly)}\n` +
                                        `ROI: ${results.gains.roi.toFixed(0)}%\n\n` +
                                        `I'd like to discuss building an optimized website to achieve these results.`
                                    )}`}>
                                        Let's Make This Happen <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="lg:sticky lg:top-24 bg-card border rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold mb-4">Why Optimize Your Website?</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex gap-3">
                                        <ShoppingCart className="w-5 h-5 text-primary shrink-0" />
                                        <div>
                                            <div className="font-semibold">Higher Conversions</div>
                                            <div className="text-muted-foreground">Fast, user-friendly sites convert 2-3x better</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Users className="w-5 h-5 text-primary shrink-0" />
                                        <div>
                                            <div className="font-semibold">Better User Experience</div>
                                            <div className="text-muted-foreground">Keep visitors engaged and reduce bounce rate</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <TrendingUp className="w-5 h-5 text-primary shrink-0" />
                                        <div>
                                            <div className="font-semibold">Increased Revenue</div>
                                            <div className="text-muted-foreground">More sales without spending more on ads</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
