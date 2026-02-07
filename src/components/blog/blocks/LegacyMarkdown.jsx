export function LegacyMarkdown({ data }) {
    const { content } = data
    if (!content) return null

    // Split by double newline to form paragraphs/blocks
    const blocks = content.split(/\n\n+/)

    return (
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90 my-8">
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

                // Default Paragraph with Bold
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
