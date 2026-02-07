export function VideoBlock({ data }) {
    const { source, url, autoplay, caption, aspect_ratio } = data

    // Parse aspect ratio (e.g. "16:9") into padding percentage
    // 16:9 -> 56.25%
    const getPadding = (ratio) => {
        const [w, h] = (ratio || "16:9").split(':').map(Number)
        return `${(h / w) * 100}%`
    }

    const isYoutube = source === 'youtube'

    // Extract YT Embed ID if needed or trust user provided embed URL
    // Ideally user provides full URL https://www.youtube.com/watch?v=XYZ
    const getYouTubeEmbed = (fullUrl) => {
        try {
            const videoId = fullUrl.split('v=')[1]?.split('&')[0]
            if (!videoId) return fullUrl // Fallback
            return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`
        } catch (e) { return fullUrl }
    }

    return (
        <div className="my-8">
            <figure className="w-full">
                <div
                    className="relative w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-border shadow-sm"
                    style={{ paddingBottom: getPadding(aspect_ratio) }}
                >
                    {isYoutube ? (
                        <iframe
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            src={getYouTubeEmbed(url)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube Video"
                        />
                    ) : (
                        <video
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            src={url}
                            controls={!autoplay}
                            autoPlay={autoplay}
                            loop={data.loop}
                            muted={data.muted || autoplay}
                            playsInline
                        />
                    )}
                </div>
                {caption && (
                    <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                        {caption}
                    </figcaption>
                )}
            </figure>
        </div>
    )
}
