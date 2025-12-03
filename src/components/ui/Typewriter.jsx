"use client"

import { useState, useEffect } from "react"

export function Typewriter({ words, delay = 100, deleteDelay = 50, pause = 2000 }) {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [reverse, setReverse] = useState(false)
    const [blink, setBlink] = useState(true)

    // Blinking cursor effect
    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev)
        }, 500)
        return () => clearTimeout(timeout2)
    }, [blink])

    // Typing logic
    useEffect(() => {
        if (index >= words.length) {
            setIndex(0)
            return
        }

        const currentWord = words[index]

        if (subIndex === currentWord.length + 1 && !reverse) {
            setReverse(true)
            return
        }

        if (subIndex === 0 && reverse) {
            setReverse(false)
            setIndex((prev) => (prev + 1) % words.length)
            return
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1))
        }, reverse ? deleteDelay : subIndex === currentWord.length ? pause : delay)

        return () => clearTimeout(timeout)
    }, [subIndex, index, reverse, words, delay, deleteDelay, pause])

    return (
        <span className="inline-flex">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                {words[index].substring(0, subIndex)}
            </span>
            <span className={`${blink ? "opacity-100" : "opacity-0"} ml-1 text-blue-500 font-light`}>|</span>
        </span>
    )
}
