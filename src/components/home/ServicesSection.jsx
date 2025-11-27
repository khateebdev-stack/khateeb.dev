"use client"

import { motion } from "framer-motion"
import { content } from "@/lib/content"
import { Code, Smartphone, BarChart, BookOpen, Search, Link as LinkIcon, GraduationCap, Cloud } from "lucide-react"

const icons = {
    "Web & App Development": Code,
    "Mobile App Development": Smartphone,
    "Custom CRM & Business Systems": BarChart,
    "Learning Platforms (LMS)": BookOpen,
    "SEO & Digital Marketing": Search,
    "Blockchain & Decentralized Apps (Team-Delivered)": LinkIcon,
    "Educational Services & Student Support": GraduationCap,
    "DevOps & Cloud Setup": Cloud
}

export function ServicesSection() {
    const { services_list, hero } = content.services

    return (
        <section id="services" className="container px-4 py-24 xs:py-16 md:px-8 max-w-screen-2xl">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight xs:text-2xl sm:text-4xl mb-4">{hero.headline}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-base xs:text-sm">{hero.subheadline}</p>
            </div>

            <div className="grid gap-8 xs:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services_list.map((service, index) => {
                    const Icon = icons[service.title] || Code
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:hover:shadow-primary/10 dark:hover:border-primary/20"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                            <ul className="space-y-1 text-sm text-muted-foreground/80">
                                {service.includes.slice(0, 3).map((item, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/50" />
                                        {typeof item === 'string' ? item : item.split(':')[0]}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
