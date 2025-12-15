import { ImageResponse } from 'next/og'
import { content } from '@/lib/content'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Service Overview'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }) {
    const { slug } = await params
    const service = content.services.services_list.find((s) => s.slug === slug)

    if (!service) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 40,
                        color: 'black',
                        background: 'white',
                        width: '100%',
                        height: '100%',
                        padding: '50px 200px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    Khateeb.dev Service Not Found
                </div>
            ),
            { ...size }
        )
    }

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1200px',
                        height: '630px',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '0 80px',
                        zIndex: 10,
                    }}
                >
                    {/* Tagline Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '50px',
                            padding: '10px 30px',
                            color: '#38bdf8',
                            fontSize: 24,
                            fontWeight: 600,
                            marginBottom: 30,
                            boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)',
                        }}
                    >
                        {service.tagline}
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            color: 'white',
                            marginBottom: 20,
                            lineHeight: 1.1,
                            textShadow: '0 5px 15px rgba(0,0,0,0.5)',
                            background: 'linear-gradient(to right, #fff, #94a3b8)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {service.title}
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            fontSize: 32,
                            color: '#cbd5e1',
                            maxWidth: '900px',
                            lineHeight: 1.4,
                            fontWeight: 400,
                        }}
                    >
                        {service.description}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                    }}
                >
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                    <div style={{ fontSize: 24, color: '#94a3b8', fontWeight: 500 }}>
                        khateeb.dev/services
                    </div>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
