import fs from 'fs'
import path from 'path'

const blogDirectory = path.join(process.cwd(), 'src/content/blogs')

function parseFrontmatter(fileContent) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = frontmatterRegex.exec(fileContent)

    if (!match) {
        return { data: {}, content: fileContent }
    }

    const frontmatterBlock = match[1]
    const content = match[2]

    // Simple YAML-like parser (supports strings, numbers, arrays like [a, b])
    const data = {}
    frontmatterBlock.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim()

            // Remove quotes
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1)
            }
            if (value.startsWith("'") && value.endsWith("'")) {
                value = value.slice(1, -1)
            }

            // Handle arrays [a, b, c]
            if (value.startsWith('[') && value.endsWith(']')) {
                const arrayContent = value.slice(1, -1)
                value = arrayContent.split(',').map(item => {
                    item = item.trim()
                    if (item.startsWith('"') && item.endsWith('"')) return item.slice(1, -1)
                    if (item.startsWith("'") && item.endsWith("'")) return item.slice(1, -1)
                    return item
                })
            }

            data[key.trim()] = value
        }
    })

    return { data, content }
}

export function getAllPosts() {
    if (!fs.existsSync(blogDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(blogDirectory)
    const allPosts = fileNames
        .filter(fileName => fileName.endsWith('.txt'))
        .map(fileName => {
            const slug = fileName.replace(/\.txt$/, '')
            const fullPath = path.join(blogDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = parseFrontmatter(fileContents)

            return {
                slug,
                ...data,
                content
            }
        })

    // Sort posts by date
    return allPosts.sort((a, b) => {
        if (a.published_date < b.published_date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getPostBySlug(slug) {
    try {
        const fullPath = path.join(blogDirectory, `${slug}.txt`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = parseFrontmatter(fileContents)

        return {
            slug,
            ...data,
            content
        }
    } catch (err) {
        return null
    }
}
