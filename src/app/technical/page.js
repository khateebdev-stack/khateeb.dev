"use client"

import { content } from "@/lib/content"

export default function TechnicalPage() {
    const { hero, expertise } = content.technical

    return (
        <div className="container px-4 py-24 md:px-8 max-w-screen-2xl">
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">{hero.headline}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{hero.subheadline}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {expertise.map((area, i) => (
                    <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">{area.area}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {area.skills.map((tech) => (
                                <span key={tech} className="rounded-full border px-2 py-0.5 text-xs font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
