import { getPostBySlug } from "@/lib/blog-utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { BlogBuilder } from "@/components/blog/BlogBuilder"
import { StickyShare } from "@/components/blog/StickyShare"

// --- SEO METADATA GENERATION ---
export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found | Khateeb.dev'
        }
    }

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        alternates: {
            canonical: post.canonical_url || `https://khateeb.dev/blog/${slug}`
        },
        openGraph: {
            title: post.title,
            description: post.description,
            images: [
                {
                    url: post.featured_image || post.og_image || '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: post.title
                }
            ],
            type: 'article',
            publishedTime: post.published_date,
            authors: [post.author || 'Khateeb'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [post.featured_image || post.og_image || '/og-image.png'],
        }
    }
}

export default async function BlogPost({ params }) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        return notFound()
    }

    const { page_config } = post
    const themeStyle = page_config?.theme_color ? { '--primary': page_config.theme_color } : {}

    return (
        <article className="container py-24 max-w-4xl mx-auto relative" style={themeStyle}>
            {/* Sticky Share Bar */}
            <StickyShare
                config={page_config?.social_sharing_display}
                title={post.title}
                url={`https://khateeb.dev/blog/${slug}`}
            />

            <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
            </Link>

            <header className="mb-12 text-center md:text-left">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 justify-center md:justify-start">
                    <span className="flex items-center bg-muted px-3 py-1 rounded-full">
                        <Tag className="w-3 h-3 mr-2" />
                        {post.category || 'General'}
                    </span>
                    <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {post.published_date ? new Date(post.published_date).toLocaleDateString() : 'Recently'}
                    </span>
                    {post.author && (
                        <span className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {post.author}
                        </span>
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                    style={{ color: page_config?.theme_color }}>
                    {post.title}
                </h1>

                {!post.hide_header_image && (post.featured_image || post.og_image) && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border/50 shadow-lg mt-8">
                        <img
                            src={post.featured_image || post.og_image}
                            alt={post.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
            </header>

            {/* DYNAMIC CONTENT STREAM */}
            <div className="blog-body">
                <BlogBuilder blocks={post.blocks} />
            </div>

            <div className="mt-16 pt-8 border-t flex flex-col items-center">
                <p className="text-muted-foreground italic mb-4">
                    Enjoyed this post? Share it with your network!
                </p>
                {/* Mobile Share Bar is handled by StickyShare via fixed positioning */}
            </div>
        </article>
    )
}
