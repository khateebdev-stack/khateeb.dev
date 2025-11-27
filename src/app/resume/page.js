"use client"

import { content } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Download, Printer, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

export default function ResumePage() {
    const { header, summary, skills, experience, education, certifications } = content.resume

    return (
        <div className="min-h-screen py-24 bg-muted/30 print:bg-white print:py-0">
            <div className="container px-4 md:px-8 max-w-[850px] mx-auto">
                {/* Actions Bar (Hidden in Print) */}
                <div className="mb-8 flex justify-end gap-4 print:hidden">
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                </div>

                {/* Resume Paper */}
                <div className="bg-background shadow-lg rounded-xl p-8 md:p-12 print:shadow-none print:p-0 print:rounded-none">
                    {/* Header */}
                    <header className="border-b pb-8 mb-8 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">{header.name}</h1>
                        <p className="text-xl text-primary font-medium mb-4">{header.title}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Mail className="mr-1.5 h-4 w-4" /> {header.contact.email}
                            </div>
                            <div className="flex items-center">
                                <Phone className="mr-1.5 h-4 w-4" /> {header.contact.phone}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-1.5 h-4 w-4" /> {header.contact.location}
                            </div>
                            <div className="flex items-center print:hidden">
                                <Linkedin className="mr-1.5 h-4 w-4" /> {header.contact.linkedin}
                            </div>
                        </div>
                    </header>

                    {/* Summary */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary/20 pb-1 mb-4">Professional Summary</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {summary}
                        </p>
                    </section>

                    {/* Skills */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary/20 pb-1 mb-4">Technical Skills</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                            {Object.entries(skills).map(([category, items]) => (
                                <div key={category} className="mb-2">
                                    <span className="font-semibold text-foreground">{category}: </span>
                                    <span className="text-muted-foreground">{items.join(", ")}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary/20 pb-1 mb-4">Work Experience</h2>
                        <div className="space-y-6">
                            {experience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                        <h3 className="text-lg font-bold">{job.role}</h3>
                                        <span className="text-sm font-medium text-muted-foreground">{job.dates}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                        <span className="text-primary font-medium">{job.company}</span>
                                        <span className="text-xs text-muted-foreground italic">{job.location}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground text-sm">
                                        {job.description.map((point, j) => (
                                            <li key={j}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary/20 pb-1 mb-4">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                    <h3 className="text-lg font-bold">{edu.university}</h3>
                                    <span className="text-sm font-medium text-muted-foreground">{edu.dates}</span>
                                </div>
                                <p className="text-primary font-medium mb-1">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">{edu.details}</p>
                            </div>
                        ))}
                    </section>

                    {/* Certifications */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary/20 pb-1 mb-4">Certifications</h2>
                        <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground text-sm">
                            {certifications.map((cert, i) => (
                                <li key={i}>{cert}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}
