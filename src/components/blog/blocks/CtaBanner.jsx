import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaBanner({ data }) {
    const { headline, button_text, action_url, style_variant } = data

    // Determine styles based on variant
    const isDark = style_variant === 'dark_gradient'

    const containerClass = isDark
        ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white"
        : "bg-primary/10 text-foreground border-primary/20"

    return (
        <div className={`my-12 p-8 rounded-2xl text-center border ${containerClass} shadow-xl`}>
            {headline && <h3 className="text-2xl font-bold mb-6">{headline}</h3>}
            {action_url && (
                <Button asChild size="lg" variant={isDark ? "default" : "secondary"}>
                    <Link href={action_url}>
                        {button_text || "Learn More"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            )}
        </div>
    )
}
