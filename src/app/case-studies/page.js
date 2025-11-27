"use client"

import { content } from "@/lib/content"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CaseStudiesPage() {
    const { projects } = content.portfolio

    return (
        <div className="min-h-screen py-24">
            <div className="container px-4 md:px-8 max-w-screen-2xl">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Case Studies</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Deep dives into how we solve complex problems and deliver measurable business results.
                    </p>
                </div>

                <div className="grid gap-12 max-w-4xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group grid md:grid-cols-2 gap-8 items-center rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="aspect-video w-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                                Project Preview
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary/10 text-primary">
                                        {project.category}
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                        {project.role}
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                        {project.duration}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold">{project.title}</h2>
                                <p className="text-muted-foreground line-clamp-3">
                                    {project.long_description}
                                </p>
                                <Button asChild variant="link" className="px-0 text-primary">
                                    <Link href={`/portfolio/${project.slug}`}>
                                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
