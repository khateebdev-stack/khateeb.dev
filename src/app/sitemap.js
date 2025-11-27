import portfolioData from '@/data/portfolio.json';
import servicesData from '@/data/services.json';

export default function sitemap() {
    const baseUrl = 'https://khateeb.dev';

    // Static Routes
    const routes = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/contact',
        '/resume',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Portfolio Routes
    const portfolioRoutes = portfolioData.projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic Service Routes
    const serviceRoutes = servicesData.services_list.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...routes, ...portfolioRoutes, ...serviceRoutes];
}
