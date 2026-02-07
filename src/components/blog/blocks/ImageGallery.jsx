export function ImageGallery({ data }) {
    const { display_style, layout_type, images } = data
    // Normalize keys
    const type = display_style || layout_type || 'grid'

    if (type === 'slider') {
        // Simple Slider Fallback (Grid for now, implementing true slider requires embla-carousel/swiper which strictly usually requires package)
        // I'll make a scrollable horizontal flex for "Slider" feel without extra deps
        return (
            <div className="my-10">
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                    {images.map((img, i) => (
                        <div key={i} className="min-w-[85%] md:min-w-[60%] snap-center">
                            <img
                                src={img.url}
                                alt={img.alt || `Gallery Image ${i + 1}`}
                                className="w-full h-auto rounded-xl border border-border"
                            />
                            {img.caption && <p className="text-sm text-center mt-2 text-muted-foreground">{img.caption}</p>}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((img, i) => (
                    <figure key={i} className="relative group">
                        <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-auto rounded-xl border border-border transition-transform group-hover:scale-[1.01]"
                        />
                    </figure>
                ))}
            </div>
        </div>
    )
}
