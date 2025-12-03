import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { content } from "@/lib/content"

export function generateStaticParams() {
    return content.home.features.map((feature) => ({
        slug: feature.title.toLowerCase().replace(/\s+/g, '-'),
    }))
}

export default function ServicePage({ params }) {
    const slug = params.slug
    const service = content.home.features.find(
        (f) => f.title.toLowerCase().replace(/\s+/g, '-') === slug
    )

    if (!service) {
        notFound()
    }

    return (
        <div className="container max-w-4xl py-24">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/#services">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                </Link>
            </Button>

            <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
                <div>
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-4xl">
                        {service.icon}
                    </div>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight">{service.title}</h1>
                    <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
                        {service.description}
                    </p>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">What's Included</h3>
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {[
                                "Custom Architecture",
                                "Performance Optimization",
                                "SEO Best Practices",
                                "Responsive Design",
                                "Security Hardening",
                                "Analytics Integration"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 rounded-lg border p-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">Ready to start?</h3>
                        <p className="mb-6 text-sm text-muted-foreground">
                            Let's discuss your project requirements and how I can help you achieve your goals.
                        </p>
                        <Button asChild className="w-full" size="lg">
                            <Link href="/contact">Get a Quote</Link>
                        </Button>
                    </div>

                    <div className="rounded-xl border bg-muted/50 p-6">
                        <h4 className="mb-2 font-medium">Need something else?</h4>
                        <p className="text-sm text-muted-foreground">
                            I offer custom solutions tailored to your specific needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
