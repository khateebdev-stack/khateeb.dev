"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Calculator, DollarSign, Zap, Search, TrendingUp } from "lucide-react"
import Link from "next/link"

export function InteractiveSection() {
    return (
        <section className="container px-4 py-24 md:px-8 max-w-screen-2xl">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Free Interactive Tools</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Try our professional tools to analyze your website, calculate project costs, and discover ROI opportunities—all completely free.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Project Cost Estimator */}
                <ToolCard
                    icon={<Calculator className="h-6 w-6" />}
                    iconBg="bg-primary/10"
                    iconColor="text-primary"
                    title="Project Cost Estimator"
                    description="Get transparent pricing for your web, mobile, or e-commerce project in 30 seconds."
                    features={[
                        "All services included",
                        "Detailed breakdown",
                        "Instant quote"
                    ]}
                    href="/tools/project-estimator"
                    buttonText="Calculate Cost"
                />

                {/* Website Speed Analyzer */}
                <ToolCard
                    icon={<Zap className="h-6 w-6" />}
                    iconBg="bg-orange-100 dark:bg-orange-900/20"
                    iconColor="text-orange-600 dark:text-orange-400"
                    title="Speed Analyzer"
                    description="Check your website's performance and get instant optimization recommendations."
                    features={[
                        "Google PageSpeed API",
                        "Mobile & Desktop",
                        "Actionable insights"
                    ]}
                    href="/tools/speed-analyzer"
                    buttonText="Test Speed"
                    badge="Popular"
                />

                {/* ROI Calculator */}
                <ToolCard
                    icon={<DollarSign className="h-6 w-6" />}
                    iconBg="bg-green-100 dark:bg-green-900/20"
                    iconColor="text-green-600 dark:text-green-400"
                    title="ROI Calculator"
                    description="Calculate how much additional revenue an optimized website could generate."
                    features={[
                        "Business metrics",
                        "Revenue projections",
                        "Payback period"
                    ]}
                    href="/tools/roi-calculator"
                    buttonText="Calculate ROI"
                />

                {/* SEO Scorecard */}
                <ToolCard
                    icon={<Search className="h-6 w-6" />}
                    iconBg="bg-blue-100 dark:bg-blue-900/20"
                    iconColor="text-blue-600 dark:text-blue-400"
                    title="SEO Scorecard"
                    description="Get a quick SEO audit with instant fixes to improve your search rankings."
                    features={[
                        "10-point SEO check",
                        "Meta tags analysis",
                        "Quick wins"
                    ]}
                    href="/tools/seo-scorecard"
                    buttonText="Check SEO"
                />
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                    💡 All tools are 100% free to use. No email required.
                </p>
                <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                        Need Custom Analysis? Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}

function ToolCard({ icon, iconBg, iconColor, title, description, features, href, buttonText, badge }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm h-full flex flex-col group hover:border-primary/50 hover:shadow-md transition-all">
            {badge && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    {badge}
                </div>
            )}

            <div className={`h-12 w-12 ${iconBg} rounded-lg flex items-center justify-center mb-4 ${iconColor}`}>
                {icon}
            </div>

            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {description}
            </p>

            <ul className="space-y-2 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            <Button asChild className="w-full font-bold mt-auto" size="sm">
                <Link href={href}>
                    {buttonText} <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
            </Button>
        </div>
    )
}
