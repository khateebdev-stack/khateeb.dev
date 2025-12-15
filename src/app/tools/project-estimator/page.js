"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calculator, Check, X, Smartphone, Globe, ShoppingCart, Paintbrush, Search, TrendingUp, Wrench, GraduationCap, ArrowRight, RefreshCw, HelpCircle, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { content } from "@/lib/content"

export default function ProjectEstimatorPage() {
    // Get actual prices from services.json
    const servicesData = useMemo(() => {
        const servicesList = content.services.services_list
        return {
            "web-app": {
                label: "Web Development",
                base: 299,
                icon: Globe,
                desc: "Custom website or web application",
                features: [
                    { id: "responsive", label: "Mobile Responsive Design", price: 0, included: true },
                    { id: "pages", label: "Additional Pages (per 5)", price: 150, included: false },
                    { id: "auth", label: "User Authentication & Profiles", price: 400, included: false },
                    { id: "database", label: "Custom Database Integration", price: 350, included: false },
                    { id: "api", label: "Third-party API Integration", price: 300, included: false },
                ]
            },
            "mobile": {
                label: "Mobile App Development",
                base: 1499,
                icon: Smartphone,
                desc: "iOS & Android app (React Native)",
                features: [
                    { id: "crossplatform", label: "iOS + Android", price: 0, included: true },
                    { id: "push", label: "Push Notifications", price: 400, included: false },
                    { id: "auth", label: "User Login & Profiles", price: 500, included: false },
                    { id: "maps", label: "Maps & Location Services", price: 450, included: false },
                    { id: "camera", label: "Camera & Media Upload", price: 350, included: false },
                ]
            },
            "ecommerce": {
                label: "E-commerce Store",
                base: 999,
                icon: ShoppingCart,
                desc: "Online store with cart and checkout",
                features: [
                    { id: "products", label: "Up to 50 Products", price: 0, included: true },
                    { id: "unlimited", label: "Unlimited Products", price: 400, included: false },
                    { id: "payment", label: "Stripe/PayPal Integration", price: 500, included: false },
                    { id: "inventory", label: "Inventory Management", price: 350, included: false },
                    { id: "shipping", label: "Shipping Calculator", price: 300, included: false },
                ]
            },
            "seo": {
                label: "SEO & Marketing",
                base: 299,
                icon: TrendingUp,
                desc: "Search engine optimization package",
                features: [
                    { id: "audit", label: "SEO Audit & Strategy", price: 0, included: true },
                    { id: "content", label: "Content Optimization", price: 200, included: false },
                    { id: "schema", label: "Schema Markup Implementation", price: 150, included: false },
                    { id: "analytics", label: "Analytics Setup & Tracking", price: 200, included: false },
                ]
            },
            "design": {
                label: "UI/UX Design",
                base: 399,
                icon: Paintbrush,
                desc: "Design system and prototypes",
                features: [
                    { id: "wireframes", label: "Wireframes & User Flows", price: 0, included: true },
                    { id: "prototype", label: "Interactive Prototype", price: 300, included: false },
                    { id: "branding", label: "Logo & Brand Identity", price: 400, included: false },
                    { id: "animations", label: "Micro-animations", price: 250, included: false },
                ]
            },
            "maintenance": {
                label: "Website Maintenance",
                base: 99,
                icon: Wrench,
                desc: "Monthly maintenance package",
                isMonthly: true,
                features: [
                    { id: "updates", label: "Security & Plugin Updates", price: 0, included: true },
                    { id: "backup", label: "Daily Backups", price: 30, included: false },
                    { id: "support", label: "Priority Support (24/7)", price: 50, included: false },
                    { id: "monitoring", label: "Uptime Monitoring", price: 20, included: false },
                ]
            },
            "education": {
                label: "Coding Tutoring",
                base: 25,
                icon: GraduationCap,
                desc: "1-on-1 coding lessons & mentorship",
                isHourly: true,
                features: [
                    { id: "beginner", label: "Beginner-Friendly", price: 0, included: true },
                    { id: "custom", label: "Custom Curriculum", price: 5, included: false },
                    { id: "projects", label: "Real Project Guidance", price: 10, included: false },
                    { id: "career", label: "Career Advice & Resume Review", price: 15, included: false },
                ]
            }
        }
    }, [])

    const [selectedServices, setSelectedServices] = useState(["web-app"])
    const [serviceFeatures, setServiceFeatures] = useState({
        "web-app": {},
        "mobile": {},
        "ecommerce": {},
        "seo": {},
        "design": {},
        "maintenance": {},
        "education": {}
    })

    const toggleService = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(prev => prev.filter(id => id !== serviceId))
        } else {
            setSelectedServices(prev => [...prev, serviceId])
        }
    }

    const toggleFeature = (serviceId, featureId) => {
        setServiceFeatures(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                [featureId]: !prev[serviceId]?.[featureId]
            }
        }))
    }

    const calculateTotal = useMemo(() => {
        let oneTime = 0
        let monthly = 0
        let hourly = 0

        selectedServices.forEach(serviceId => {
            const service = servicesData[serviceId]
            if (!service) return

            if (service.isMonthly) {
                monthly += service.base
                service.features.forEach(feature => {
                    if (serviceFeatures[serviceId]?.[feature.id]) {
                        monthly += feature.price
                    }
                })
            } else if (service.isHourly) {
                hourly += service.base
                service.features.forEach(feature => {
                    if (serviceFeatures[serviceId]?.[feature.id]) {
                        hourly += feature.price
                    }
                })
            } else {
                oneTime += service.base
                service.features.forEach(feature => {
                    if (serviceFeatures[serviceId]?.[feature.id]) {
                        oneTime += feature.price
                    }
                })
            }
        })

        return { oneTime, monthly, hourly }
    }, [selectedServices, serviceFeatures, servicesData])

    const resetCalculator = () => {
        setSelectedServices(["web-app"])
        setServiceFeatures({
            "web-app": {},
            "mobile": {},
            "ecommerce": {},
            "seo": {},
            "design": {},
            "maintenance": {},
            "education": {}
        })
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Project Cost Estimator</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Build your custom package by selecting services and features. Get instant pricing with full transparency—no hidden fees.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr,400px] gap-8">
                    {/* Left Column: Service Selection */}
                    <div className="space-y-8">

                        {/* Service Cards */}
                        <section className="bg-card border rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Select Services
                            </h2>
                            <p className="text-sm text-muted-foreground mb-6">Choose one or more services that match your needs</p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {Object.entries(servicesData).map(([key, data]) => {
                                    const Icon = data.icon
                                    const isSelected = selectedServices.includes(key)
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => toggleService(key)}
                                            className={`relative p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-transparent bg-muted/50 hover:bg-muted"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                                                {isSelected ? (
                                                    <Check className="w-5 h-5 text-primary" />
                                                ) : (
                                                    <Plus className="w-5 h-5 text-muted-foreground opacity-50" />
                                                )}
                                            </div>
                                            <div className="font-semibold">{data.label}</div>
                                            <div className="text-xs text-muted-foreground mt-1">{data.desc}</div>
                                            <div className="text-sm font-bold mt-2 text-primary">
                                                ${data.base}{data.isMonthly ? "/mo" : "+"}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>

                        {/* Features Selection for each selected service */}
                        {selectedServices.length > 0 && (
                            <section className="bg-card border rounded-2xl p-6 shadow-sm">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                    Customize Features
                                </h2>
                                <p className="text-sm text-muted-foreground mb-6">Fine-tune each service with add-on features</p>

                                <div className="space-y-6">
                                    {selectedServices.map(serviceId => {
                                        const service = servicesData[serviceId]
                                        if (!service) return null
                                        const ServiceIcon = service.icon

                                        return (
                                            <div key={serviceId} className="border-l-2 border-primary pl-4">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <ServiceIcon className="w-5 h-5 text-primary" />
                                                    <h3 className="font-bold">{service.label}</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    {service.features.map(feature => (
                                                        <div
                                                            key={feature.id}
                                                            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${feature.included
                                                                ? "bg-green-50 dark:bg-green-900/10"
                                                                : "hover:bg-muted/30"
                                                                }`}
                                                        >
                                                            <div className="flex-1 mr-4">
                                                                <Label
                                                                    htmlFor={`${serviceId}-${feature.id}`}
                                                                    className={`text-sm font-medium ${feature.included ? "cursor-default" : "cursor-pointer"}`}
                                                                >
                                                                    {feature.label}
                                                                    {feature.included && (
                                                                        <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">
                                                                            ✓ Included
                                                                        </span>
                                                                    )}
                                                                </Label>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                {!feature.included && (
                                                                    <>
                                                                        <span className="text-sm font-mono">+${feature.price}</span>
                                                                        <Switch
                                                                            id={`${serviceId}-${feature.id}`}
                                                                            checked={serviceFeatures[serviceId]?.[feature.id] || false}
                                                                            onCheckedChange={() => toggleFeature(serviceId, feature.id)}
                                                                        />
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Summary Sticky */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-card border rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5" />
                                Your Quote
                            </h3>

                            {/* Breakdown */}
                            <div className="space-y-3 mb-6 border-b pb-6">
                                {selectedServices.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        Select at least one service to see pricing
                                    </p>
                                ) : (
                                    <>
                                        {selectedServices.map(serviceId => {
                                            const service = servicesData[serviceId]
                                            if (!service) return null

                                            let serviceTotal = service.base
                                            service.features.forEach(feature => {
                                                if (serviceFeatures[serviceId]?.[feature.id]) {
                                                    serviceTotal += feature.price
                                                }
                                            })

                                            return (
                                                <div key={serviceId} className="text-sm">
                                                    <div className="flex justify-between items-center font-medium mb-1">
                                                        <span>{service.label}</span>
                                                        <span>${serviceTotal}{service.isMonthly ? "/mo" : ""}</span>
                                                    </div>
                                                    {Object.entries(serviceFeatures[serviceId] || {}).some(([_, enabled]) => enabled) && (
                                                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                                                            {service.features.map(feature => {
                                                                if (serviceFeatures[serviceId]?.[feature.id]) {
                                                                    return (
                                                                        <div key={feature.id} className="flex justify-between">
                                                                            <span>+ {feature.label}</span>
                                                                            <span>${feature.price}</span>
                                                                        </div>
                                                                    )
                                                                }
                                                                return null
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </>
                                )}
                            </div>

                            {/* Total */}
                            <div className="mb-8 space-y-3">
                                {calculateTotal.oneTime > 0 && (
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-lg">One-time Cost</span>
                                        <span className="text-3xl font-bold text-primary">
                                            ${calculateTotal.oneTime.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                {calculateTotal.monthly > 0 && (
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-lg">Monthly</span>
                                        <span className="text-2xl font-bold text-blue-600">
                                            ${calculateTotal.monthly.toLocaleString()}/mo
                                        </span>
                                    </div>
                                )}
                                {calculateTotal.hourly > 0 && (
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-lg">Hourly Rate</span>
                                        <span className="text-2xl font-bold text-green-600">
                                            ${calculateTotal.hourly.toLocaleString()}/hr
                                        </span>
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                                    * Final pricing may vary ±20% based on project complexity and specific requirements during consultation.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full font-bold h-12 text-base"
                                    disabled={selectedServices.length === 0}
                                >
                                    <Link href={`/contact?subject=Project Quote Request&body=${encodeURIComponent(
                                        `SERVICES REQUESTED:\n${selectedServices.map(serviceId => {
                                            const service = servicesData[serviceId]
                                            const selectedFeats = service.features.filter(f => serviceFeatures[serviceId]?.[f.id])
                                            return `\n• ${service.label}\n  Base: $${service.base}${service.isMonthly ? '/mo' : service.isHourly ? '/hr' : ''}` +
                                                (selectedFeats.length > 0
                                                    ? `\n  Add-ons:\n${selectedFeats.map(f => `    - ${f.label} (+$${f.price})`).join('\n')}`
                                                    : '')
                                        }).join('\n')}\n\n` +
                                        `ESTIMATED BUDGET:\n` +
                                        (calculateTotal.oneTime > 0 ? `• One-time: $${calculateTotal.oneTime.toLocaleString()}\n` : '') +
                                        (calculateTotal.monthly > 0 ? `• Monthly: $${calculateTotal.monthly.toLocaleString()}/mo\n` : '') +
                                        (calculateTotal.hourly > 0 ? `• Hourly: $${calculateTotal.hourly.toLocaleString()}/hr\n` : '') +
                                        `\n——————————————\nPlease provide any additional project details or specific requirements below:`
                                    )}`}>
                                        Request Formal Quote <ArrowRight className="ml-2 w-4 w-4" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={resetCalculator}
                                >
                                    <RefreshCw className="mr-2 w-4 h-4" /> Start Over
                                </Button>
                            </div>
                        </div>

                        {/* Help Box */}
                        <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex gap-3">
                            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Need custom features?</p>
                                <p className="text-blue-700 dark:text-blue-400">
                                    This calculator covers standard features. For AI, blockchain, or enterprise SaaS, contact me for a custom quote.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
