import { Calculator, DollarSign, Zap, Search } from "lucide-react"

export const toolsData = [
    {
        id: 'project-estimator',
        title: "Project Cost Estimator",
        description: "Get transparent pricing for your web, mobile, or e-commerce project in 30 seconds.",
        icon: Calculator,
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        features: [
            "All services included",
            "Detailed breakdown",
            "Instant quote"
        ],
        href: "/tools/project-estimator",
        buttonText: "Calculate Cost"
    },
    {
        id: 'speed-analyzer',
        title: "Speed Analyzer",
        description: "Check your website's performance and get instant optimization recommendations.",
        icon: Zap,
        iconBg: "bg-orange-100 dark:bg-orange-900/20",
        iconColor: "text-orange-600 dark:text-orange-400",
        features: [
            "Google PageSpeed API",
            "Mobile & Desktop",
            "Actionable insights"
        ],
        href: "/tools/speed-analyzer",
        buttonText: "Test Speed",
        badge: "Popular"
    },
    {
        id: 'roi-calculator',
        title: "ROI Calculator",
        description: "Calculate how much additional revenue an optimized website could generate.",
        icon: DollarSign,
        iconBg: "bg-green-100 dark:bg-green-900/20",
        iconColor: "text-green-600 dark:text-green-400",
        features: [
            "Business metrics",
            "Revenue projections",
            "Payback period"
        ],
        href: "/tools/roi-calculator",
        buttonText: "Calculate ROI"
    },
    {
        id: 'seo-scorecard',
        title: "SEO Scorecard",
        description: "Get a quick SEO audit with instant fixes to improve your search rankings.",
        icon: Search,
        iconBg: "bg-blue-100 dark:bg-blue-900/20",
        iconColor: "text-blue-600 dark:text-blue-400",
        features: [
            "10-point SEO check",
            "Meta tags analysis",
            "Quick wins"
        ],
        href: "/tools/seo-scorecard",
        buttonText: "Check SEO"
    }
]
