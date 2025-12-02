"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LeadCaptureModal({ isOpen, onSubmit, onSkip }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-md"
                    >
                        <Card className="p-6 bg-white dark:bg-gray-900 shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        👋 Let's Connect!
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Quick intro so I can assist you better
                                    </p>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <User className="inline w-4 h-4 mr-1" />
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Mail className="inline w-4 h-4 mr-1" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                {/* Phone Field (Optional) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Phone className="inline w-4 h-4 mr-1" />
                                        Phone Number (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 234 567 8900"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white"
                                    >
                                        Start Chatting
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={onSkip}
                                        variant="outline"
                                        className="px-6"
                                    >
                                        Skip
                                    </Button>
                                </div>

                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    Your information is secure and will only be used to contact you
                                </p>
                            </form>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
