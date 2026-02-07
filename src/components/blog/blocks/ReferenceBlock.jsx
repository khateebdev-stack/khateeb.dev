import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

export function ReferenceBlock({ data }) {
    const { heading_text, title, items, selection_mode } = data
    const heading = heading_text || title || "Related Posts"

    return (
        <div className="my-10 p-6 bg-secondary/30 border border-border rounded-xl">
            <h3 className="flex items-center text-lg font-bold mb-4">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                {heading}
            </h3>
            <div className="space-y-3">
                {items?.map((item, i) => (
                    <div key={i}>
                        {/* Assuming item is string ID. In real app, we resolve this to title */}
                        <Link
                            href={`/blog/${item}`}
                            className="group flex items-center justify-between p-3 bg-background rounded-lg hover:border-primary border border-transparent transition-all"
                        >
                            <span className="font-medium group-hover:text-primary transition-colors">
                                Read Post: {item}
                            </span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
