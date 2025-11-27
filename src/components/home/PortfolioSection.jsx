"use client"

import { motion } from "framer-motion"
import { content } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export function PortfolioSection() {
    const { hero, projects, categories } = content.portfolio

    return (
        <section id="portfolio" className="bg-muted/30 py-24 xs:py-16 dark:bg-muted/10">
            <div className="container px-4 md:px-8 max-w-screen-2xl">
                <div className="mb-12 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold tracking-tight xs:text-2xl sm:text-4xl mb-4">{hero.headline}</h2>
                    <p className="text-muted-foreground max-w-2xl text-base xs:text-sm">{hero.subheadline}</p>

                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {categories.slice(0, 5).map((cat, i) => (
                            <span key={i} className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                        >
                            <div className="aspect-video w-full bg-muted flex items-center justify-center text-muted-foreground relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span>Project Preview</span>
                            </div>
                            <div className="p-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-medium text-primary">{project.category}</span>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                                    {project.solution}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech_stack.map((tech) => (
                                        <span key={tech} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <Button asChild variant="outline" size="sm" className="w-full">
                                        <Link href={project.links.demo}>
                                            <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="sm" className="w-full">
                                        <Link href={project.links.github}>
                                            <Github className="mr-2 h-4 w-4" /> Code
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button asChild size="lg">
                        <Link href="/portfolio">{hero.cta}</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
