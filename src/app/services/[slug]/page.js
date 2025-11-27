"use client"

import { content } from "@/lib/content"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Check, Code, Smartphone, BarChart, BookOpen, Search, Link as LinkIcon, GraduationCap, Cloud } from "lucide-react"
import { motion } from "framer-motion"
import { use } from "react"

const icons = {
    "Web & App Development": Code,
    "Mobile App Development": Smartphone,
    "Custom CRM & Business Systems": BarChart,
    "Learning Platforms (LMS)": BookOpen,
    "SEO & Digital Marketing": Search,
    "Blockchain & Decentralized Apps (Team-Delivered)": LinkIcon,
    "Educational Services & Student Support": GraduationCap,
    "DevOps & Cloud Setup": Cloud
}

export default function ServicePage({ params }) {
    const { slug } = use(params)
    const service = content.services.services_list.find(s => s.slug === slug)

    if (!service) {
        notFound()
    }

    const Icon = icons[service.title] || Code

    return (
        <div className="min-h-screen py-24">
            <div className="container px-4 md:px-8 max-w-screen-2xl">
                {/* Back Button */}
                <div className="mb-8">
                    <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                        <Link href="/services">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                        </Link>
                    </Button>
                </div>

                {/* Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{service.title}</h1>
                    <p className="text-xl text-muted-foreground">{service.description}</p>
                </div>

                {/* Process Steps */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-12 text-center">How We Work</h2>
                    <div className="grid gap-8 md:grid-cols-4">
                        {service.process_steps?.map((step, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                    {i + 1}
                                </div>
                                <h3 className="font-semibold mb-2">{step}</h3>
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-border -z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Tiers */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-12 text-center">Investment Packages</h2>
                    <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                        {service.pricing_tiers?.map((tier, i) => (
                            <div key={i} className={`relative flex flex-col rounded-2xl border p-8 shadow-sm ${i === 1 ? 'border-primary bg-primary/5 shadow-md scale-105' : 'bg-card'}`}>
                                {i === 1 && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">{tier.price}</span>
                                </div>
                                <ul className="mb-8 space-y-4 flex-1">
                                    {tier.features.map((feature, j) => (
                                        <li key={j} className="flex items-center text-sm text-muted-foreground">
                                            <Check className="mr-2 h-4 w-4 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild className="w-full" variant={i === 1 ? "default" : "outline"}>
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Placeholder */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-muted-foreground mb-8">
                        Book a free 15-minute strategy call to discuss your specific needs.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact">Book Strategy Call</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
