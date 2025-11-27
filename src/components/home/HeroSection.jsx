"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { content } from "@/lib/content"

export function HeroSection() {
    const { hero } = content.home

    return (
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background pt-16 md:pt-0">
            {/* Background Effects (Dark Mode Only) */}
            <div className="absolute inset-0 z-0 hidden dark:block">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl filter" />
                <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl filter" />
            </div>

            <div className="container relative z-10 px-4 md:px-8 max-w-screen-2xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                Available for new projects
                            </div>
                            <h1 className="text-3xl font-bold pb-5 tracking-tighter xs:text-2xl sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-zinc-400">
                                {hero.headline}
                            </h1>
                            <p className="max-w-[600px] text-zinc-500 text-base xs:text-sm sm:text-xl dark:text-zinc-400">
                                {hero.subheadline}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-[400px]:flex-row">
                            <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
                                <Link href="/contact">
                                    {hero.cta_primary} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                                <Link href="/portfolio">
                                    {hero.cta_secondary}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Visual Content (Code Card) */}
                    <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative mx-auto w-full max-w-[500px] lg:max-w-none hidden md:block"
                    >
                        {/* Abstract Code Card Representation */}
                        <div className="relative rounded-xl border bg-card text-card-foreground shadow-xl overflow-hidden dark:shadow-amber-500/10 dark:border-white/10">
                            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-red-500" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                    <div className="h-3 w-3 rounded-full bg-green-500" />
                                </div>
                                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                                    <Terminal className="h-3 w-3" />
                                    <span>server.js</span>
                                </div>
                            </div>
                            <div className="p-6 font-mono text-sm leading-relaxed">
                                <div className="text-blue-600 dark:text-blue-400">const <span className="text-foreground">portfolio</span> = <span className="text-purple-600 dark:text-purple-400">new</span> <span className="text-yellow-600 dark:text-yellow-400">Portfolio</span>({`{`}</div>
                                <div className="pl-4">
                                    <span className="text-foreground">owner:</span> <span className="text-green-600 dark:text-green-400">"Khateeb Ur Rehman"</span>,
                                </div>
                                <div className="pl-4">
                                    <span className="text-foreground">role:</span> <span className="text-green-600 dark:text-green-400">"Full Stack Architect"</span>,
                                </div>
                                <div className="pl-4">
                                    <span className="text-foreground">stack:</span> [<span className="text-green-600 dark:text-green-400">"Next.js"</span>, <span className="text-green-600 dark:text-green-400">"React Native"</span>, <span className="text-green-600 dark:text-green-400">"Blockchain"</span>],
                                </div>
                                <div className="pl-4">
                                    <span className="text-foreground">mission:</span> <span className="text-green-600 dark:text-green-400">"Build Scalable Systems"</span>
                                </div>
                                <div className="text-foreground">{`}`});</div>
                                <br />
                                <div className="text-blue-600 dark:text-blue-400">await <span className="text-foreground">portfolio</span>.<span className="text-yellow-600 dark:text-yellow-400">deploy</span>();</div>
                                <div className="animate-pulse text-green-500 mt-2">_</div>
                            </div>
                        </div>

                        {/* Floating Elements (Decorative) */}
                        <div className="absolute -top-12 -right-12 h-24 w-24 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-xl animate-pulse" />
                        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 opacity-20 blur-xl animate-pulse delay-700" />

                    </motion.div>
                </div>
            </div>
        </section>
    )
}
