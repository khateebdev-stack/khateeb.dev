import Link from "next/link"
import { content } from "@/lib/content"
import { Facebook, Twitter, Linkedin, Github, Mail, Phone } from "lucide-react"

export function Footer() {
    const { footer, contact_info, navigation } = content.global
    const { services_list } = content.services

    return (
        <footer className="border-t bg-background text-foreground">
            <div className="container px-4 py-12 md:px-8 md:py-16 max-w-screen-2xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <img src="/logo.png" alt="Khateeb.dev Logo" className="h-8 w-auto dark:invert" />
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            {footer.brand.bio}
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Services</h4>
                        <ul className="space-y-2 text-sm">
                            {services_list.slice(0, 5).map((service, index) => (
                                <li key={index}>
                                    <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{contact_info.email}</span>
                            </li>
                            <li className="flex items-center space-x-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>{contact_info.whatsapp}</span>
                            </li>
                            <li className="text-muted-foreground">
                                {contact_info.location}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>{footer.copyright}</p>
                </div>
            </div>
        </footer>
    )
}
