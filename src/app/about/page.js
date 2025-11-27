"use client"

import { content } from "@/lib/content"
import { motion } from "framer-motion"

export default function AboutPage() {
    if (!content || !content.about) {
        return <div>Loading...</div>
    }

    const { hero, mission, why_trust_me } = content.about

    return (
        <div className="container px-4 py-24 md:px-8 max-w-screen-2xl">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Hero */}
                <section className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">{hero?.headline}</h1>
                    <p className="text-xl text-muted-foreground">{hero?.subheadline}</p>
                    <div className="prose dark:prose-invert">
                        {hero?.signature_intro?.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                </section>

                {/* Mission */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">My Mission</h2>
                    <p className="text-muted-foreground">{mission?.statement}</p>
                </section>

                {/* Trust */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Why Trust Me?</h2>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {why_trust_me?.map((point, i) => (
                            <li key={i} className="rounded-lg border p-4 bg-card">
                                <h3 className="font-semibold mb-1">{point.title}</h3>
                                <p className="text-sm text-muted-foreground">{point.desc}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}
