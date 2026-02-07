"use client"

import React from 'react';

export const RichText = ({ data }) => {
    // Premium Typography Styles
    return (
        <div className={`
            rich-text-content 
            text-base md:text-lg leading-relaxed text-foreground/90 
            max-w-none 
            ${data.alignment === 'center' ? 'text-center' : 'text-left'}
        `}>
            {/* 
                We use a style tag for scoped typography to handle raw HTML content. 
            */}
            <style jsx global>{`
                .rich-text-content h2 {
                    font-size: 1.875rem; /* 30px */
                    line-height: 2.25rem;
                    font-weight: 700;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                    letter-spacing: -0.02em;
                    color: hsl(var(--foreground));
                }
                .rich-text-content h3 {
                    font-size: 1.5rem; /* 24px */
                    line-height: 2rem;
                    font-weight: 600;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: hsl(var(--foreground));
                }
                .rich-text-content p {
                    margin-bottom: 1.5rem;
                }
                .rich-text-content ul {
                    list-style-type: disc;
                    padding-left: 1.625rem;
                    margin-bottom: 1.5rem;
                }
                .rich-text-content ol {
                    list-style-type: decimal;
                    padding-left: 1.625rem;
                    margin-bottom: 1.5rem;
                }
                .rich-text-content li {
                    margin-bottom: 0.5rem;
                    padding-left: 0.375rem;
                }
                .rich-text-content strong {
                    font-weight: 700;
                    color: hsl(var(--primary));
                }
                .rich-text-content blockquote {
                    border-left: 4px solid hsl(var(--primary));
                    padding-left: 1.25rem;
                    font-style: italic;
                    color: hsl(var(--muted-foreground));
                    margin: 2rem 0;
                }
                .rich-text-content a {
                    color: hsl(var(--primary));
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }
                .rich-text-content .lead {
                    font-size: 1.25rem;
                    line-height: 1.75;
                    font-weight: 400;
                    color: hsl(var(--muted-foreground));
                    margin-bottom: 2rem;
                }
                /* Mobile adjustments */
                @media (max-width: 768px) {
                    .rich-text-content h2 { font-size: 1.5rem; margin-top: 2rem; }
                    .rich-text-content h3 { font-size: 1.25rem; }
                    .rich-text-content .lead { font-size: 1.125rem; }
                }
            `}</style>

            <div dangerouslySetInnerHTML={{ __html: data.html_content }} />
        </div>
    );
};
