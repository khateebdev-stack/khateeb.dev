"use client"

import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
            <div className="relative flex flex-col items-center">
                {/* Main Geometric Loader */}
                <motion.div
                    className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Pulse */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded-full"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Text Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-sm font-medium tracking-widest text-muted-foreground uppercase"
                >
                    Loading
                </motion.div>
            </div>
        </div>
    )
}
