"use client"

import { useState } from "react"
import { content } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare, CheckCircle2, ArrowRight, ArrowLeft, UploadCloud } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ContactSection() {
    const { hero, form, direct_contact } = content.contact
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        description: "",
        file: null
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setIsSuccess(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <section id="contact" className="w-full max-w-7xl mx-auto px-4 py-12 xs:py-16 md:px-8 overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center py-20 bg-card border rounded-2xl shadow-sm">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-20 w-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6"
                    >
                        <CheckCircle2 className="h-10 w-10" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4">Message Received!</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        Thanks for reaching out, {formData.name}. I've received your details and will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">Send Another Message</Button>
                </div>
            </section>
        )
    }

    return (
        <section id="contact" className="w-full max-w-7xl mx-auto px-4 py-12 xs:py-16 md:px-8 overflow-hidden">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left: Content & Direct Contact */}
                <div className="w-full">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-4xl mb-4">{hero.headline}</h2>
                    <p className="text-muted-foreground mb-8 text-base sm:text-lg">{hero.subheadline}</p>

                    <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-4 rounded-lg border p-3 sm:p-4 bg-card">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden w-full">
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p className="font-semibold break-all">{direct_contact.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-lg border p-3 sm:p-4 bg-card">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                                <p className="font-semibold">{direct_contact.whatsapp}</p>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-primary to-blue-600 p-6 text-primary-foreground">
                            <h3 className="text-xl font-bold mb-2">Ready to scale?</h3>
                            <p className="mb-4 opacity-90">Book a free 15-minute strategy call to discuss your project.</p>
                            <Button variant="secondary" className="w-full font-semibold">
                                {direct_contact.cta_strategy}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right: Multi-step Form */}
                <div className="rounded-xl border bg-card p-4 sm:p-8 shadow-sm relative overflow-hidden w-full">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required className="w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required className="w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" required className="w-full" />
                                    </div>
                                    <Button type="button" onClick={nextStep} className="w-full mt-4">
                                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label>Service Needed</Label>
                                        <Select onValueChange={(val) => handleSelectChange('service', val)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {form.fields.find(f => f.name === 'service').options.map(opt => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Budget Range</Label>
                                        <Select onValueChange={(val) => handleSelectChange('budget', val)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select budget" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {form.fields.find(f => f.name === 'budget').options.map(opt => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <Button type="button" variant="outline" onClick={prevStep} className="w-1/3">
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="w-2/3">
                                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Project Details</Label>
                                        <Textarea id="description" value={formData.description} onChange={handleInputChange} placeholder="Tell me more about your project..." className="min-h-[120px] w-full" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Attachments (Optional)</Label>
                                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer w-full">
                                            <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                                            <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                                            <p className="text-xs text-muted-foreground mt-1">(PDF, DOCX, Images up to 5MB)</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <Button type="button" variant="outline" onClick={prevStep} className="w-1/3">
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting} className="w-2/3">
                                            {isSubmitting ? "Sending..." : "Submit Request"}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {/* Step Indicator */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${step >= i ? "bg-primary" : "bg-muted"}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
