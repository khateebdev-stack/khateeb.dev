"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle
} from "@/components/ui/sheet"
import { content } from "@/lib/content"

export function Navbar() {
    const pathname = usePathname()
    const { setTheme, theme } = useTheme()
    const { navigation } = content.global

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 xs:px-2 md:px-8">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <img src="/logo.png" alt="Khateeb.dev Logo" className="h-8 w-auto dark:invert" />
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors hover:text-foreground/80 ${pathname === item.href ? "text-foreground font-semibold" : "text-foreground/60"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Menu */}
                <div className="flex flex-1 items-center justify-between md:justify-end">
                    <div className="w-full flex md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="pr-0">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <div className="px-7">
                                    <Link
                                        href="/"
                                        className="flex items-center"
                                        onClick={() => { }}
                                    >
                                        <span className="font-bold">Khateeb.dev</span>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-4 mt-8 px-7">
                                    {navigation.map((item) => (
                                        <SheetClose asChild key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`text-lg font-medium transition-colors hover:text-foreground/80 ${pathname === item.href ? "text-foreground" : "text-foreground/60"
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
                            <img src="/logo.png" alt="Khateeb.dev Logo" className="h-8 w-auto dark:invert" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <Button asChild className="hidden md:flex">
                            <Link href="/contact">Hire Me</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
