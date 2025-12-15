import { getPostBySlug } from "@/lib/blog-utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"

// --- SEO METADATA GENERATION ---
// This enables correct previews on WhatsApp, Twitter, etc.
export async function generateMetadata({ params }) {
    const slug = params.slug
    const post = getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found | Khateeb.dev'
        }
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            // Assuming image path is absolute from public (e.g. /blog/img.jpg)
            // We resolve full URL using metadataBase in root layout
            images: [
                {
                    url: post.featured_image || '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: post.title
                }
            ],
            type: 'article',
            publishedTime: post.published_date,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [post.featured_image || '/og-image.png'],
        }
    }
}

// --- SIMPLE CONTENT RENDERER ---
function MarkdownContent({ content }) {
    if (!content) return null

    // Split by double newline to form paragraphs/blocks
    const blocks = content.split(/\n\n+/)

    return (
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            {blocks.map((block, index) => {
                // H1/H2 Headers
                if (block.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{block.replace('# ', '')}</h1>
                }
                if (block.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-primary">{block.replace('## ', '')}</h2>
                }
                if (block.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{block.replace('### ', '')}</h3>
                }

                // Code Blocks (Basic support)
                if (block.startsWith('```')) {
                    const code = block.replace(/```\w*\n?|```$/g, '')
                    return (
                        <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
                            <code>{code}</code>
                        </pre>
                    )
                }

                // Bullet Lists
                if (block.trim().startsWith('- ')) {
                    const items = block.split('\n').filter(line => line.startsWith('- ')).map(line => line.replace('- ', ''))
                    return (
                        <ul key={index} className="list-disc pl-6 space-y-2">
                            {items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    )
                }

                // Default Paragraph
                // Handle bolding **text**
                const parts = block.split(/(\*\*.*?\*\*)/g)
                return (
                    <p key={index}>
                        {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
                            }
                            return part
                        })}
                    </p>
                )
            })}
        </div>
    )
}

export default function BlogPost({ params }) {
    const slug = params.slug
    const post = getPostBySlug(slug)

    if (!post) {
        return notFound()
    }

    return (
        <article className="container py-24 max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
            </Link>

            <header className="mb-12">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center bg-muted px-3 py-1 rounded-full">
                        <Tag className="w-3 h-3 mr-2" />
                        {post.category || 'General'}
                    </span>
                    <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {post.published_date}
                    </span>
                    <span className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {post.author}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {post.title}
                </h1>

                {post.featured_image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 shadow-lg mt-8">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                )}
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownContent content={post.content} />
            </div>

            <div className="mt-16 pt-8 border-t flex gap-4">
                {/* Share buttons or related could go here */}
                <p className="text-muted-foreground italic">
                    Thanks for reading! If you found this helpful, verify the SEO tags by sharing the link.
                </p>
            </div>
        </article>
    )
}
