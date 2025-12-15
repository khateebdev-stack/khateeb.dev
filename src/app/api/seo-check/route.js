import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Fetch the page
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SEO-Checker/1.0;)'
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 400 });
        }

        const html = await response.text();

        // Parse basic SEO elements
        const checks = [];
        const recommendations = [];
        let score = 0;

        // Check title tag
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
            const titleLength = titleMatch[1].length;
            if (titleLength >= 30 && titleLength <= 60) {
                checks.push({
                    status: 'pass',
                    title: 'Title Tag',
                    description: `Perfect length (${titleLength} characters): "${titleMatch[1]}"`
                });
                score++;
            } else if (titleLength > 0) {
                checks.push({
                    status: 'warning',
                    title: 'Title Tag',
                    description: `Present but ${titleLength < 30 ? 'too short' : 'too long'} (${titleLength} characters). Ideal: 30-60 characters.`
                });
                score += 0.5;
                recommendations.push('Optimize title tag length to 30-60 characters');
            }
        } else {
            checks.push({
                status: 'fail',
                title: 'Title Tag',
                description: 'Missing! Title tags are crucial for SEO.'
            });
            recommendations.push('Add a descriptive title tag (30-60 characters)');
        }

        // Check meta description
        const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
        if (descMatch && descMatch[1]) {
            const descLength = descMatch[1].length;
            if (descLength >= 120 && descLength <= 160) {
                checks.push({
                    status: 'pass',
                    title: 'Meta Description',
                    description: `Perfect length (${descLength} characters)`
                });
                score++;
            } else if (descLength > 0) {
                checks.push({
                    status: 'warning',
                    title: 'Meta Description',
                    description: `Present but ${descLength < 120 ? 'too short' : 'too long'} (${descLength} characters). Ideal: 120-160.`
                });
                score += 0.5;
                recommendations.push('Optimize meta description to 120-160 characters');
            }
        } else {
            checks.push({
                status: 'fail',
                title: 'Meta Description',
                description: 'Missing! Helps search engines understand your page.'
            });
            recommendations.push('Add a compelling meta description (120-160 characters)');
        }

        // Check H1 tags
        const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi);
        if (h1Matches) {
            if (h1Matches.length === 1) {
                checks.push({
                    status: 'pass',
                    title: 'H1 Heading',
                    description: 'Exactly one H1 tag found (best practice)'
                });
                score++;
            } else {
                checks.push({
                    status: 'warning',
                    title: 'H1 Heading',
                    description: `Found ${h1Matches.length} H1 tags. Best practice is one per page.`
                });
                score += 0.5;
                recommendations.push('Use only one H1 tag per page');
            }
        } else {
            checks.push({
                status: 'fail',
                title: 'H1 Heading',
                description: 'No H1 tag found. Important for page structure.'
            });
            recommendations.push('Add a descriptive H1 heading');
        }

        // Check for images without alt text
        const imgMatches = html.match(/<img[^>]*>/gi) || [];
        const imgsWithoutAlt = imgMatches.filter(img => !img.match(/alt=["'][^"']*["']/i));
        if (imgMatches.length > 0) {
            if (imgsWithoutAlt.length === 0) {
                checks.push({
                    status: 'pass',
                    title: 'Image Alt Text',
                    description: `All ${imgMatches.length} images have alt text`
                });
                score++;
            } else {
                checks.push({
                    status: 'warning',
                    title: 'Image Alt Text',
                    description: `${imgsWithoutAlt.length} of ${imgMatches.length} images missing alt text`
                });
                score += 0.3;
                recommendations.push('Add descriptive alt text to all images');
            }
        } else {
            checks.push({
                status: 'pass',
                title: 'Image Alt Text',
                description: 'No images found on page'
            });
            score++;
        }

        // Check viewport meta tag (mobile-friendly)
        const viewportMatch = html.match(/<meta\s+name=["']viewport["']/i);
        if (viewportMatch) {
            checks.push({
                status: 'pass',
                title: 'Mobile Friendly',
                description: 'Viewport meta tag detected'
            });
            score++;
        } else {
            checks.push({
                status: 'fail',
                title: 'Mobile Friendly',
                description: 'No viewport meta tag found'
            });
            recommendations.push('Add viewport meta tag for mobile responsiveness');
        }

        // Check HTTPS
        if (url.startsWith('https://')) {
            checks.push({
                status: 'pass',
                title: 'HTTPS Security',
                description: 'Site uses secure HTTPS protocol'
            });
            score++;
        } else {
            checks.push({
                status: 'fail',
                title: 'HTTPS Security',
                description: 'Site not using HTTPS (security risk)'
            });
            recommendations.push('Migrate to HTTPS for security and SEO');
        }

        // Check canonical tag
        const canonicalMatch = html.match(/<link\s+rel=["']canonical["']/i);
        if (canonicalMatch) {
            checks.push({
                status: 'pass',
                title: 'Canonical URL',
                description: 'Canonical tag present'
            });
            score++;
        } else {
            checks.push({
                status: 'warning',
                title: 'Canonical URL',
                description: 'No canonical tag found'
            });
            score += 0.5;
            recommendations.push('Add canonical URL to avoid duplicate content issues');
        }

        // Check Open Graph tags
        const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']/i);
        const ogDescMatch = html.match(/<meta\s+property=["']og:description["']/i);
        const ogImageMatch = html.match(/<meta\s+property=["']og:image["']/i);

        if (ogTitleMatch && ogDescMatch && ogImageMatch) {
            checks.push({
                status: 'pass',
                title: 'Social Media Tags',
                description: 'Open Graph tags configured for social sharing'
            });
            score++;
        } else {
            checks.push({
                status: 'warning',
                title: 'Social Media Tags',
                description: 'Missing Open Graph tags for better social media sharing'
            });
            score += 0.3;
            recommendations.push('Add Open Graph tags for social media optimization');
        }

        // Check structured data
        const structuredDataMatch = html.match(/<script\s+type=["']application\/ld\+json["']/i);
        if (structuredDataMatch) {
            checks.push({
                status: 'pass',
                title: 'Structured Data',
                description: 'Schema markup detected'
            });
            score++;
        } else {
            checks.push({
                status: 'warning',
                title: 'Structured Data',
                description: 'No structured data (JSON-LD) found'
            });
            score += 0.3;
            recommendations.push('Add structured data for rich search results');
        }

        // Check page load size (rough estimate)
        const pageSizeKB = Buffer.byteLength(html, 'utf8') / 1024;
        if (pageSizeKB < 500) {
            checks.push({
                status: 'pass',
                title: 'Page Size',
                description: `HTML size is ${pageSizeKB.toFixed(0)}KB (good)`
            });
            score++;
        } else {
            checks.push({
                status: 'warning',
                title: 'Page Size',
                description: `HTML size is ${pageSizeKB.toFixed(0)}KB (consider optimization)`
            });
            score += 0.5;
            recommendations.push('Optimize HTML/CSS/JS to reduce page size');
        }

        return NextResponse.json({
            url,
            score: Math.round(score),
            checks,
            recommendations
        });

    } catch (error) {
        console.error('SEO Check Error:', error);
        return NextResponse.json({
            error: 'Failed to analyze page. Please check the URL and try again.'
        }, { status: 500 });
    }
}
