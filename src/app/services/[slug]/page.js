import { use } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, HelpCircle, Clock, Zap, Shield, ChevronRight } from "lucide-react"
import { content } from "@/lib/content"
import { ShareButtons } from "@/components/ui/share-buttons"

// Helper to map generic titles to icons
const getBenefitIcon = (title) => {
    const t = title.toLowerCase()
    if (t.includes("fast") || t.includes("performance")) return <Zap className="h-5 w-5 text-yellow-500" />
    if (t.includes("secure") || t.includes("safe")) return <Shield className="h-5 w-5 text-blue-500" />
    if (t.includes("time") || t.includes("efficient")) return <Clock className="h-5 w-5 text-green-500" />
    return <CheckCircle2 className="h-5 w-5 text-primary" />
}

export function generateStaticParams() {
    return content.services.services_list.map((service) => ({
        slug: service.slug,
    }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const service = content.services.services_list.find((s) => s.slug === slug)

    if (!service) return { title: "Service Not Found" }

    return {
        title: `${service.title} | Khateeb.dev`,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description,
            type: "website",
            images: [
                {
                    url: `/services/og/${service.slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                }
            ]
        }
    }
}

export default function ServicePage({ params }) {
    const { slug } = use(params)
    const service = content.services.services_list.find((s) => s.slug === slug)

    if (!service) {
        notFound()
    }

    // Platform links from about.json or hardcoded if simple
    const platforms = content.about.freelancing || []

    return (
        <div className="container max-w-5xl py-24 px-4 md:px-8">
            {/* Header / Nav */}
            <div className="mb-12">
                <Button asChild variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                    <Link href="/services">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Services
                    </Link>
                </Button>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary font-bold">
                                {service.title.charAt(0)}
                            </span>
                            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                                {service.tagline}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{service.title}</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">{service.description}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <ShareButtons title={service.title} text={service.description} url={`https://khateeb.dev/services/${service.slug}`} />
                    </div>
                </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">

                {/* Main Content Column */}
                <div className="space-y-16">

                    {/* Long Description */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            {service.long_description}
                        </div>
                    </section>

                    {/* Benefits Grid */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Why Choose This?</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {service.benefits?.map((benefit, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card/50 hover:bg-card transition-colors">
                                    <div className="shrink-0 mt-1">
                                        {getBenefitIcon(benefit.title)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Process Steps */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
                        <div className="relative border-l-2 border-border ml-3 space-y-8 pb-4">
                            {service.process?.map((step, i) => (
                                <div key={i} className="relative pl-8">
                                    <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-background" />
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <span className="text-primary text-sm font-mono">{step.step}</span>
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-1">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
                        <div className="grid gap-4">
                            {service.faq?.map((item, i) => (
                                <div key={i} className="rounded-lg border bg-card p-5">
                                    <h3 className="font-semibold flex items-start gap-2 mb-2">
                                        <HelpCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                        {item.q}
                                    </h3>
                                    <p className="text-sm text-muted-foreground ml-7">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Sidebar / CTA Column */}
                <div className="space-y-8">

                    {/* Sticky Pricing Card */}
                    <div className="rounded-2xl border bg-card p-6 shadow-lg">
                        <div className="mb-6 pb-6 border-b">
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">Estimated Investment</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">{service.price}</span>
                                <span className="text-muted-foreground"> / project</span>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-2 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Delivery: {service.delivery}
                            </p>
                            <p className="text-xs text-muted-foreground mt-3 italic">
                                * Pricing is indicative and may vary based on project scope and requirements.
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <p className="font-semibold text-sm">What's Included:</p>
                            <ul className="space-y-3">
                                {service.includes.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button asChild size="lg" className="w-full font-bold h-12">
                            <Link href="/contact">
                                Get Started <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Free consultation • No commitment
                        </p>
                    </div>

                    {/* Freelancing Platforms Block */}
                    {platforms.length > 0 && (
                        <div className="rounded-xl border bg-muted/30 p-6">
                            <h4 className="font-semibold mb-3">Prefer a Platform?</h4>
                            <p className="text-xs text-muted-foreground mb-4">
                                You can also hire me securely via these trusted marketplaces.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {platforms.map((p, i) => (
                                    <Button key={i} variant="outline" size="sm" asChild className="text-xs h-8">
                                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                                            {p.platform}
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Simple Help Box */}
                    <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
                        <h4 className="font-semibold mb-2">Not sure yet?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Book a free 15-minute discovery call to discuss your specific needs.
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full">
                            <Link href="/contact">Contact Me</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
