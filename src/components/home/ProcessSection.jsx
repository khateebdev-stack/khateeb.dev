"use client"

import { motion } from "framer-motion"
import { content } from "@/lib/content"
import { Search, PenTool, Code, ShieldCheck, Rocket } from "lucide-react"

const icons = {
    "Search": Search,
    "PenTool": PenTool,
    "Code": Code,
    "ShieldCheck": ShieldCheck,
    "Rocket": Rocket
}

export function ProcessSection() {
    const { process } = content.about

    return (
        <section className="container px-4 py-24 md:px-8 max-w-screen-2xl">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">My Engineering Process</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    A proven methodology used to deliver high-quality software on time and within budget.
                </p>
            </div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-border -z-10 w-[90%] mx-auto" />

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                    {process.map((step, index) => {
                        const Icon = icons[step.icon] || Code
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex flex-col items-center text-center bg-background"
                            >
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-background border-4 border-muted group hover:border-primary transition-colors z-10 shadow-sm">
                                    <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="absolute top-0 right-0 text-6xl font-black text-primary/5 -z-10 select-none">
                                    {step.step}
                                </div>

                                <h3 className="mb-3 text-lg font-bold">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
