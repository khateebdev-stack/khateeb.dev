"use client"

import { content } from "@/lib/content"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, CheckCircle, Trophy, Star, Zap, Layout, Smartphone, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { use } from "react"

export default function ClientProjectPage({ params }) {
    const { slug } = use(params)
    const project = content.portfolio.projects.find(p => p.slug === slug)

    if (!project) {
        notFound()
    }

    const { case_study, client_story } = project

    // Fallback logic for content
    const headline = client_story?.headline || project.title
    const subheadline = client_story?.subheadline || project.solution
    const problem = client_story?.problem_statement || case_study?.challenge?.description
    const solution = client_story?.solution_overview || case_study?.solution?.description
    const benefits = client_story?.key_benefits || case_study?.solution?.key_features?.map(f => ({ title: "Key Feature", description: f })) || []
    const testimonial = client_story?.testimonial || case_study?.testimonial

    // Related Projects Logic
    const relatedProjects = content.portfolio.projects
        .filter(p => p.category === project.category && p.slug !== project.slug)
        .slice(0, 2)

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="container px-4 md:px-8 max-w-screen-xl">
                    <div className="mb-8">
                        <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                            <Link href="/portfolio">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                            </Link>
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-wrap gap-3 items-center">
                                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                                    {project.category}
                                </div>
                                {case_study?.client && (
                                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted text-muted-foreground border-border">
                                        {case_study.client}
                                    </div>
                                )}
                                {case_study?.role && (
                                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground border-border">
                                        {case_study.role}
                                    </div>
                                )}
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-tight">
                                {headline}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {subheadline}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.map((tech) => (
                                    <span key={tech} className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button asChild size="xl" className="h-12 px-8 text-lg">
                                    <Link href={`/case-study/${project.slug}`}>
                                        View Technical Case Study <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="xl" className="h-12 px-8 text-lg">
                                    <Link href={project.links.demo} target="_blank">
                                        Visit Live Site <ExternalLink className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                {project.links.github && project.links.github !== "#" && (
                                    <Button asChild variant="ghost" size="xl" className="h-12 px-8 text-lg">
                                        <Link href={project.links.github} target="_blank">
                                            View Code <Layout className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border bg-muted"
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
                </div>
            </section>

            {/* Problem & Solution - Story Mode */}
            {(problem || solution) && (
                <section className="py-20 bg-background">
                    <div className="container px-4 md:px-8 max-w-screen-xl">
                        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {problem}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {solution}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Key Benefits / Features */}
            {benefits.length > 0 && (
                <section className="py-24 bg-muted/30">
                    <div className="container px-4 md:px-8 max-w-screen-xl">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold mb-4">Why It Matters</h2>
                            <p className="text-muted-foreground text-lg">
                                Key benefits that drive business growth and user satisfaction.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-card p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Results / Impact Section (Keep from Case Study if available) */}
            {case_study?.results && (
                <section className="py-20 bg-card border-y">
                    <div className="container px-4 md:px-8 max-w-screen-xl">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold mb-4">Real Business Impact</h2>
                            <p className="text-muted-foreground text-lg">
                                {case_study.results.description}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {case_study.results.metrics.map((metric, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-background p-8 rounded-2xl border shadow-sm text-center hover:border-primary/50 transition-colors"
                                >
                                    <div className="text-4xl font-extrabold text-primary mb-2">{metric.value}</div>
                                    <div className="font-semibold mb-2">{metric.label}</div>
                                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Visual Gallery */}
            <section className="py-24">
                <div className="container px-4 md:px-8 max-w-screen-xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Visual Experience</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl">
                                A tour through the interface designed for optimal user experience.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {project.gallery?.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`relative rounded-xl overflow-hidden border shadow-lg group ${i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'}`}
                            >
                                <Image
                                    src={img}
                                    alt={`${project.title} view ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            {testimonial && (
                <section className="py-24 bg-muted/20">
                    <div className="container px-4 md:px-8 max-w-screen-md mx-auto text-center">
                        <Star className="h-12 w-12 text-yellow-500 mx-auto mb-8 fill-yellow-500" />
                        <blockquote className="text-2xl md:text-3xl font-medium italic mb-8 leading-relaxed">
                            "{testimonial.text}"
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-left">
                                <div className="font-bold text-lg">{testimonial.author}</div>
                                <div className="text-muted-foreground">
                                    {testimonial.role}, {testimonial.company}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="py-24 bg-muted/20">
                    <div className="container px-4 md:px-8 max-w-screen-xl">
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
                                        View Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 bg-primary text-primary-foreground">
                <div className="container px-4 md:px-8 text-center max-w-screen-lg">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Vision?</h2>
                    <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                        Let's collaborate to create a high-impact solution tailored to your business needs, just like {project.title}.
                    </p>
                    <Button asChild size="xl" variant="secondary" className="h-14 px-10 text-lg font-semibold">
                        <Link href="/contact">
                            Start Your Project
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
