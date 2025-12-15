import { getAllPosts } from "@/lib/blog-utils"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

export const metadata = {
    title: 'Expert Web Development & SEO Blog | Khateeb.dev',
    description: 'Insights on Full Stack Development, SEO, Performance Optimization, and System Architecture. Written for developers and business owners.',
    openGraph: {
        title: 'Khateeb.dev Blog - Technical Insights',
        description: 'Deep dives into Web Dev, SEO, and Business Tech.',
        type: 'website'
    }
}

export default function BlogIndex() {
    const posts = getAllPosts()

    return (
        <div className="container py-24 min-h-screen">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Technical Insights & Resources</h1>
                <p className="text-xl text-muted-foreground">
                    Deep dives into modern web development, SEO strategies, and building scalable digital products.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                            <article className="h-full flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                                {post.featured_image && (
                                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs font-medium text-primary mb-3">
                                        <span className="bg-primary/10 px-2.5 py-1 rounded-full">{post.category || 'Tech'}</span>
                                        <span className="text-muted-foreground flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {post.published_date}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                                        Read Article
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-muted/30 rounded-2xl">
                        <p className="text-xl font-medium text-muted-foreground">Coming Soon...</p>
                        <p className="text-sm text-muted-foreground mt-2">I am writing amazing content for you. Check back later!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
