import { VideoBlock } from "./blocks/VideoBlock"
import { RichText } from "./blocks/RichText"
import { CodeSnippet } from "./blocks/CodeSnippet"
import { ImageGallery } from "./blocks/ImageGallery"
import { CtaBanner } from "./blocks/CtaBanner"
import { ReferenceBlock } from "./blocks/ReferenceBlock"
import { LegacyMarkdown } from "./blocks/LegacyMarkdown"

const BLOCK_COMPONENTS = {
    'video_embed': VideoBlock,
    'video_block': VideoBlock, // Handle alias
    'rich_text': RichText,
    'code_snippet': CodeSnippet,
    'image_gallery': ImageGallery,
    'cta_banner': CtaBanner,
    'reference_block': ReferenceBlock,
    'legacy_markdown': LegacyMarkdown
}

export function BlogBuilder({ blocks }) {
    if (!blocks || !Array.isArray(blocks)) {
        return <p className="text-destructive">No content blocks found.</p>
    }

    return (
        <div className="blog-content-stream">
            {blocks.map((block, index) => {
                const Component = BLOCK_COMPONENTS[block.type]

                if (!Component) {
                    console.warn(`Unknown block type: ${block.type}`)
                    return (
                        <div key={block.id || index} className="p-4 bg-yellow-100 text-yellow-800 rounded mb-4">
                            Unknown Block Type: {block.type}
                        </div>
                    )
                }

                return <Component key={block.id || index} data={block.data} />
            })}
        </div>
    )
}
