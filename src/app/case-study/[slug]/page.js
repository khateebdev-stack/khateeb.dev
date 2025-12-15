"use client"

import { content } from "@/lib/content"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Layers, Target, Lightbulb, Code2, Database, Server, Cpu, Shield, Zap, ArrowRight, Code } from "lucide-react"
import { motion } from "framer-motion"
import { use } from "react"

export default function CaseStudyPage({ params }) {
    const { slug } = use(params)
    const project = content.portfolio.projects.find(p => p.slug === slug)

    if (!project) {
        notFound()
    }

    const { case_study, client_story } = project

    // Prioritize client_story for narrative, fallback to case_study for technical details
    const challengeDescription = client_story?.problem_statement || case_study?.challenge?.description
    const solutionDescription = client_story?.solution_overview || case_study?.solution?.description

    // Handle different formats: client_story.key_benefits (objects) vs case_study.key_features (strings)
    const features = client_story?.key_benefits
        ? client_story.key_benefits.map(b => `${b.title}: ${b.description}`)
        : case_study?.solution?.key_features

    // Related Projects Logic
    const relatedProjects = content.portfolio.projects
        .filter(p => p.category === project.category && p.slug !== project.slug)
        .slice(0, 2)

    return (
        <div className="min-h-screen py-24 bg-background">
            <div className="container px-4 md:px-8 max-w-screen-2xl">
                {/* Back Button */}
                <div className="mb-8 flex justify-between items-center">
                    <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                        <Link href="/case-studies">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Link>
                    </Button>
                    <div className="text-sm text-muted-foreground font-mono">
                        Technical Deep Dive
                    </div>
                </div>

                {/* Header */}
                <div className="grid gap-12 lg:grid-cols-2 mb-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground">
                                {project.category}
                            </div>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-border bg-secondary text-secondary-foreground">
                                {case_study?.role || "Lead Developer"}
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-mono">{client_story?.headline || project.title}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">{client_story?.subheadline || project.solution}</p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button asChild variant="outline" size="lg">
                                <Link href={project.links.github} target="_blank">
                                    <Github className="mr-2 h-4 w-4" /> View Source Code
                                </Link>
                            </Button>
                            <Button asChild size="lg">
                                <Link href={project.links.demo} target="_blank">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                </Link>
                            </Button>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="pt-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Core Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack.map((tech) => (
                                        <div key={tech} className="group relative">
                                            <span className="inline-flex items-center rounded-md bg-secondary/50 px-3 py-1 text-sm font-mono text-secondary-foreground border border-border/50 cursor-help">
                                                {tech}
                                            </span>
                                            {case_study?.tech_reasoning?.[tech] && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                    {case_study.tech_reasoning[tech]}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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

                {/* Technical Content */}
                {(case_study || client_story) && (
                    <div className="grid gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-8 space-y-16">

                            {/* Project Overview */}
                            {case_study?.overview && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {case_study.overview}
                                    </p>
                                </section>
                            )}

                            {/* Architecture Section - The "Meat" for Recruiters */}
                            {case_study?.solution?.technical_architecture && (
                                <section className="bg-card p-8 rounded-2xl border shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                                        <Server className="mr-3 h-6 w-6 text-blue-500" />
                                        System Architecture
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        {Object.entries(case_study.solution.technical_architecture).map(([key, values]) => (
                                            <div key={key}>
                                                <h3 className="font-semibold capitalize mb-3 text-primary border-b pb-1">{key}</h3>
                                                <ul className="space-y-2">
                                                    {Array.isArray(values) && values.map((item, i) => (
                                                        <li key={i} className="text-sm text-muted-foreground flex items-start font-mono">
                                                            <span className="mr-2 text-primary">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Challenge & Solution */}
                            <section className="grid gap-8 md:grid-cols-2">
                                <div className="bg-muted/20 p-6 rounded-xl border">
                                    <h2 className="text-xl font-bold mb-4 flex items-center text-red-500">
                                        <Target className="mr-2 h-5 w-5" />
                                        The Challenge
                                    </h2>
                                    <p className="text-muted-foreground mb-4">
                                        {challengeDescription}
                                    </p>
                                    {case_study?.challenge?.pain_points && (
                                        <ul className="space-y-2">
                                            {case_study.challenge.pain_points.map((point, i) => (
                                                <li key={i} className="text-sm flex items-start">
                                                    <span className="mr-2 text-red-500 font-bold">×</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="bg-muted/20 p-6 rounded-xl border">
                                    <h2 className="text-xl font-bold mb-4 flex items-center text-green-500">
                                        <Lightbulb className="mr-2 h-5 w-5" />
                                        The Solution
                                    </h2>
                                    <p className="text-muted-foreground mb-4">
                                        {solutionDescription}
                                    </p>
                                    {features && (
                                        <ul className="space-y-2">
                                            {features.map((feature, i) => (
                                                <li key={i} className="text-sm flex items-start">
                                                    <span className="mr-2 text-green-500 font-bold">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </section>

                            {/* The Breakthrough - Micro Story */}
                            {case_study?.breakthrough && (
                                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background p-8 border border-primary/20">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Lightbulb className="w-32 h-32" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 flex items-center text-primary">
                                        <Zap className="mr-2 h-5 w-5" />
                                        The Breakthrough
                                    </h3>
                                    <h4 className="text-lg font-semibold mb-2">{case_study.breakthrough.title}</h4>
                                    <p className="text-muted-foreground relative z-10">
                                        {case_study.breakthrough.description}
                                    </p>
                                </section>
                            )}

                            {/* Code Spotlight */}
                            {case_study?.code_snippet && (
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold flex items-center">
                                        <Code className="mr-3 h-6 w-6 text-blue-500" />
                                        Under the Hood
                                    </h2>
                                    <div className="rounded-xl overflow-hidden border bg-[#0d1117] text-gray-300 shadow-2xl">
                                        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                                            <span className="text-xs font-mono text-blue-400">{case_study.code_snippet.title}</span>
                                            <span className="text-xs text-gray-500 uppercase">{case_study.code_snippet.language}</span>
                                        </div>
                                        <div className="p-4 overflow-x-auto">
                                            <pre className="font-mono text-sm leading-relaxed">
                                                <code>{case_study.code_snippet.code}</code>
                                            </pre>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground italic border-l-2 border-muted pl-4">
                                        {case_study.code_snippet.explanation}
                                    </p>
                                </section>
                            )}

                            {/* Development Process */}
                            {case_study?.process && (
                                <section>
                                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                                        <Layers className="mr-3 h-6 w-6 text-purple-500" />
                                        Development Process
                                    </h2>
                                    <div className="relative border-l-2 border-muted ml-3 space-y-8 pl-8 py-2">
                                        {case_study.process.map((step, i) => (
                                            <div key={i} className="relative">
                                                <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-primary text-xs font-bold text-primary">
                                                    {i + 1}
                                                </span>
                                                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                                <p className="text-muted-foreground">{step.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Final Notes */}
                            {case_study?.final_notes && (
                                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl italic text-lg text-muted-foreground">
                                    "{case_study.final_notes}"
                                </div>
                            )}

                            {/* Results Metrics */}
                            {case_study?.results?.metrics && (
                                <section>
                                    <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {case_study.results.metrics.map((metric, i) => (
                                            <div key={i} className="bg-background p-4 rounded-lg border text-center">
                                                <div className="text-2xl font-bold text-primary font-mono">{metric.value}</div>
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Visual Performance Cards */}
                            {case_study?.performance?.lighthouse && (
                                <section>
                                    <h3 className="text-lg font-semibold mb-6">Lighthouse Scores</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Object.entries(case_study.performance.lighthouse).map(([key, score]) => (
                                            <div key={key} className="flex flex-col items-center p-4 bg-card rounded-xl border">
                                                <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle
                                                            cx="32"
                                                            cy="32"
                                                            r="28"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                            fill="none"
                                                            className="text-muted/20"
                                                        />
                                                        <circle
                                                            cx="32"
                                                            cy="32"
                                                            r="28"
                                                            stroke={score >= 90 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444"}
                                                            strokeWidth="4"
                                                            fill="none"
                                                            strokeDasharray={2 * Math.PI * 28}
                                                            strokeDashoffset={2 * Math.PI * 28 * (1 - score / 100)}
                                                            className="transition-all duration-1000 ease-out"
                                                        />
                                                    </svg>
                                                    <span className={`absolute font-mono font-bold ${score >= 90 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                                                        {score}
                                                    </span>
                                                </div>
                                                <span className="text-xs uppercase font-medium text-muted-foreground text-center">
                                                    {key.replace('_', ' ')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24">
                                <div className="bg-card border rounded-xl p-6 shadow-sm mb-6">
                                    <h3 className="font-semibold mb-4 flex items-center">
                                        <Code2 className="mr-2 h-4 w-4" /> Project Details
                                    </h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Role</span>
                                            <span className="font-medium">{case_study?.role || "Lead Developer"}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Timeline</span>
                                            <span className="font-medium">{case_study?.duration || "Ongoing"}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Year</span>
                                            <span className="font-medium">{case_study?.year || "2024"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Client</span>
                                            <span className="font-medium text-right">{case_study?.client || project.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-4">Screenshots</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {(project.gallery || client_story?.visual_focus)?.map((img, i) => (
                                        <div key={i} className="relative aspect-video rounded-md overflow-hidden border bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                                            <Image
                                                src={img}
                                                alt={`Screenshot ${i + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="border-t py-24 bg-muted/20 mt-24">
                    <div className="container px-4 md:px-8 max-w-screen-2xl">
                        <h2 className="text-2xl font-bold mb-8">More {project.category} Projects</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedProjects.map((p) => (
                                <Link key={p.id} href={`/project/${p.slug}`} className="group block">
                                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border bg-muted">
                                        <Image
                                            src={p.featured_image}
                                            alt={p.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                                    <p className="text-muted-foreground line-clamp-2">{p.solution}</p>
                                    <div className="flex items-center text-primary font-medium mt-2">
                                        View Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
