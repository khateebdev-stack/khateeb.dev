"use client"

import { content } from "@/lib/content"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Layers, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { use } from "react"

export default function ProjectPage({ params }) {
    const { slug } = use(params)
    const project = content.portfolio.projects.find(p => p.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen py-24">
            <div className="container px-4 md:px-8 max-w-screen-2xl">
                {/* Back Button */}
                <div className="mb-8">
                    <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                        <Link href="/portfolio">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                        </Link>
                    </Button>
                </div>

                {/* Header */}
                <div className="grid gap-8 lg:grid-cols-2 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                            {project.category}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
                        <p className="text-xl text-muted-foreground">{project.solution}</p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild size="lg">
                                <Link href={project.links.demo} target="_blank">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href={project.links.github} target="_blank">
                                    <Github className="mr-2 h-4 w-4" /> View Code
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border rounded-xl p-6 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Layers className="mr-2 h-5 w-5 text-primary" /> Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech_stack.map((tech) => (
                                <span key={tech} className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Deep Dive Content */}
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {project.long_description}
                            </p>
                        </section>

                        {/* Challenges */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Key Challenges</h2>
                            <ul className="space-y-4">
                                {project.challenges?.map((challenge, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-3 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold">
                                            {i + 1}
                                        </span>
                                        <span className="text-muted-foreground">{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Results */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">The Results</h2>
                            <ul className="space-y-4">
                                {project.results?.map((result, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className="mr-3 h-6 w-6 shrink-0 text-green-600 dark:text-green-400" />
                                        <span className="text-muted-foreground">{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Gallery Sidebar (Placeholder for now) */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Gallery</h3>
                        <div className="grid gap-4">
                            {project.gallery?.map((img, i) => (
                                <div key={i} className="aspect-video rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm">
                                    Image {i + 1} Placeholder
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
