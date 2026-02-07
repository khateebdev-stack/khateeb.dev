import fs from 'fs'
import path from 'path'

const blogDirectory = path.join(process.cwd(), 'src/content/blogs')

// Helper to parse legacy TXT wrapper
function parseFrontmatter(fileContent) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = frontmatterRegex.exec(fileContent)
    if (!match) return { data: {}, content: fileContent }

    const frontmatterBlock = match[1]
    const content = match[2]

    // Simple YAML-like parser (supports strings, numbers, arrays like [a, b])
    const data = {}
    frontmatterBlock.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '')
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''))
            }
            data[key.trim()] = value
        }
    })
    return { data, content }
}

export function getAllPosts() {
    if (!fs.existsSync(blogDirectory)) return []

    const items = fs.readdirSync(blogDirectory)

    const posts = items.map(item => {
        const fullPath = path.join(blogDirectory, item)
        const stat = fs.statSync(fullPath)

        // CASE A: Legacy TXT File
        if (stat.isFile() && item.endsWith('.txt')) {
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = parseFrontmatter(fileContents)
            // Adapt to new schema structure roughly
            return {
                slug: item.replace('.txt', ''),
                type: 'legacy_txt',
                ...data,
                // Wrap content in a single LegacyMarkdown block
                blocks: [
                    { type: 'legacy_markdown', data: { content: content } }
                ]
            }
        }

        // CASE B: New Directory Schema
        if (stat.isDirectory()) {
            const jsonPath = path.join(fullPath, 'content.json')
            if (fs.existsSync(jsonPath)) {
                try {
                    const jsonContent = fs.readFileSync(jsonPath, 'utf8')
                    const data = JSON.parse(jsonContent)

                    // SCHEMA MAPPING: Advanced User Schema -> UI
                    // Mapped to standard keys while keeping full data available
                    return {
                        // Core Identification
                        slug: data.slug || data.meta?.slug || item,
                        id: data._id || data.meta?.id,

                        // Type
                        type: 'json_cms',
                        canonical_url: data.seo?.canonical_url,

                        // SEO & Metadata
                        title: data.seo?.meta_title || data.seo?.title || data.meta?.title,
                        description: data.seo?.meta_description || data.seo?.description,

                        // Dates (Handle both new 'dates.published_at' and old 'meta.published_at')
                        published_date: data.dates?.published_at || data.meta?.published_at || new Date().toISOString(),
                        updated_date: data.dates?.updated_at || data.meta?.updated_at,

                        // Images
                        featured_image: data.seo?.og_image || data.seo?.openGraph?.images?.[0]?.url,

                        // Taxonomy
                        category: data.category || "Tech", // Fallback if missing in new schema
                        tags: data.seo?.keywords || [],

                        // Advanced Configurations
                        author: data.author?.name || "Khateeb",
                        author_avatar: data.author?.avatar,
                        page_config: data.page_config || {},
                        status: data.status || 'published',

                        // Content
                        blocks: data.blocks || []
                    }
                } catch (e) {
                    console.error("Error parsing blog JSON:", item, e)
                    return null
                }
            }
        }
        return null
    }).filter(Boolean)

    // Sort by date (handles both published_date and published_at)
    return posts.sort((a, b) => {
        const dateA = new Date(a.published_date || a.published_at)
        const dateB = new Date(b.published_date || b.published_at)
        return dateB - dateA
    })
}

export function getPostBySlug(slug) {
    // 1. Try Directory (JSON)
    const dirPath = path.join(blogDirectory, slug, 'content.json')
    if (fs.existsSync(dirPath)) {
        try {
            const data = JSON.parse(fs.readFileSync(dirPath, 'utf8'))
            return {
                slug: data.slug || data.meta?.slug || slug,
                id: data._id || data.meta?.id,
                type: 'json_cms',
                canonical_url: data.seo?.canonical_url,
                title: data.seo?.meta_title || data.seo?.title || data.meta?.title,
                description: data.seo?.meta_description || data.seo?.description,
                published_date: data.dates?.published_at || data.meta?.published_at,
                updated_date: data.dates?.updated_at || data.meta?.updated_at,
                featured_image: data.seo?.og_image || data.seo?.openGraph?.images?.[0]?.url,
                category: data.category || "Tech",
                tags: data.seo?.keywords || [],
                author: data.author?.name || "Khateeb",
                author_avatar: data.author?.avatar,
                page_config: data.page_config || {},
                status: data.status || 'published',
                blocks: data.blocks || []
            }
        } catch (e) { console.error(e) }
    }

    // 2. Try Legacy TXT
    const txtPath = path.join(blogDirectory, `${slug}.txt`)
    if (fs.existsSync(txtPath)) {
        const fileContents = fs.readFileSync(txtPath, 'utf8')
        const { data, content } = parseFrontmatter(fileContents)
        return {
            slug,
            type: 'legacy_txt',
            ...data,
            blocks: [
                { type: 'legacy_markdown', data: { content: content } }
            ]
        }
    }

    return null
}
