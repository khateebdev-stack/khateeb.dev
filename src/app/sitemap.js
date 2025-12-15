import { content } from "@/lib/content"

export default function sitemap() {
    const baseUrl = 'https://khateeb.dev'

    // Static Routes
    const routes = [
        '',
        '/portfolio',
        '/services',
        '/contact',
        '/about',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic Projects
    const projects = content.portfolio.projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    // Dynamic Blog Posts
    const posts = content.blog.articles.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published_date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...routes, ...projects, ...posts]
}
