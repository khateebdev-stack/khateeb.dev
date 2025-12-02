"use client"

import { content } from "@/lib/content"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Layers, CheckCircle, Trophy, Target, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { use } from "react"

export default function ProjectPage({ params }) {
    const { slug } = use(params)
    const project = content.portfolio.projects.find(p => p.slug === slug)

    if (!project) {
        notFound()
    }

    const { case_study } = project

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
                <div className="grid gap-12 lg:grid-cols-2 mb-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                {project.category}
                            </div>
                            {case_study?.year && (
                                <span className="text-sm text-muted-foreground border px-2 py-0.5 rounded-full">
                                    {case_study.year}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">{project.solution}</p>

                        <div className="flex flex-wrap gap-4 pt-2">
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

                        {/* Project Meta */}
                        {case_study && (
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Client</p>
                                    <p className="font-semibold">{case_study.client}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                                    <p className="font-semibold">{case_study.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                                    <p className="font-semibold">{case_study.duration}</p>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-video rounded-xl overflow-hidden border bg-muted shadow-lg"
                    >
                        <Image
                            src={project.featured_image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Tech Stack */}
                <div className="mb-20">
                    <h3 className="text-lg font-semibold mb-6 flex items-center">
                        <Layers className="mr-2 h-5 w-5 text-primary" /> Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {project.tech_stack.map((tech) => (
                            <span key={tech} className="inline-flex items-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Deep Dive Content */}
                {case_study && (
                    <div className="grid gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-8 space-y-16">
                            {/* Overview */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center">
                                    <Lightbulb className="mr-3 h-6 w-6 text-yellow-500" />
                                    Project Overview
                                </h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {case_study.overview}
                                </p>
                            </section>

                            {/* Challenge */}
                            <section className="bg-muted/30 p-8 rounded-2xl border">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <Target className="mr-3 h-6 w-6 text-red-500" />
                                    {case_study.challenge.title}
                                </h2>
                                <p className="text-muted-foreground mb-6 text-lg">
                                    {case_study.challenge.description}
                                </p>
                                <ul className="space-y-3">
                                    {case_study.challenge.pain_points.map((point, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-3 mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                                            <span className="text-muted-foreground">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Solution */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6">The Solution</h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    {case_study.solution.description}
                                </p>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {case_study.solution.key_features.map((feature, i) => (
                                        <div key={i} className="bg-card p-5 rounded-xl border shadow-sm">
                                            <div className="font-semibold mb-2 text-primary">Feature {i + 1}</div>
                                            <p className="text-sm text-muted-foreground">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Results */}
                            <section>
                                <h2 className="text-3xl font-bold mb-8 flex items-center">
                                    <Trophy className="mr-3 h-6 w-6 text-yellow-500" />
                                    {case_study.results.title}
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {case_study.results.metrics.map((metric, i) => (
                                        <div key={i} className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                                            <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                                            <div className="font-semibold mb-2">{metric.label}</div>
                                            <p className="text-sm text-muted-foreground">{metric.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Testimonial */}
                            {case_study.testimonial && (
                                <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 text-primary/10">
                                        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21L14.017 18C14.017 16.896 14.789 15.558 15.696 14.432C16.602 13.306 17.643 12.681 18.772 12.556C18.29 12.431 17.769 12.306 17.249 12.306C15.842 12.306 14.615 12.868 13.708 13.868C12.801 14.868 12.348 16.118 12.348 17.556C12.348 19.431 13.073 21 14.017 21ZM5 21L5 18C5 16.896 5.772 15.558 6.679 14.432C7.586 13.306 8.626 12.681 9.755 12.556C9.273 12.431 8.752 12.306 8.232 12.306C6.825 12.306 5.598 12.868 4.691 13.868C3.784 14.868 3.331 16.118 3.331 17.556C3.331 19.431 4.056 21 5 21Z" />
                                        </svg>
                                    </div>
                                    <blockquote className="relative z-10">
                                        <p className="text-xl font-medium italic mb-6">"{case_study.testimonial.text}"</p>
                                        <footer>
                                            <div className="font-semibold">{case_study.testimonial.author}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {case_study.testimonial.role}, {case_study.testimonial.company}
                                            </div>
                                        </footer>
                                    </blockquote>
                                </section>
                            )}
                        </div>

                        {/* Sidebar Gallery */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24">
                                <h3 className="text-lg font-semibold mb-4">Project Gallery</h3>
                                <div className="space-y-4">
                                    {project.gallery?.map((img, i) => (
                                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden border bg-muted shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                            <Image
                                                src={img}
                                                alt={`${project.title} screenshot ${i + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
