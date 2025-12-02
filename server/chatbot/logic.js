const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../src/data');
let knowledgeBase = {};
let commandsConfig = {};

function loadKnowledgeBase() {
    try {
        // Load all data sources
        knowledgeBase.faq = JSON.parse(fs.readFileSync(path.join(dataDir, 'faq.json'), 'utf8'));
        knowledgeBase.services = JSON.parse(fs.readFileSync(path.join(dataDir, 'services.json'), 'utf8'));
        knowledgeBase.portfolio = JSON.parse(fs.readFileSync(path.join(dataDir, 'portfolio.json'), 'utf8'));
        knowledgeBase.about = JSON.parse(fs.readFileSync(path.join(dataDir, 'about.json'), 'utf8'));
        knowledgeBase.contact = JSON.parse(fs.readFileSync(path.join(dataDir, 'contact.json'), 'utf8'));
        knowledgeBase.resume = JSON.parse(fs.readFileSync(path.join(dataDir, 'resume.json'), 'utf8'));

        // Load customizable commands configuration
        commandsConfig = JSON.parse(fs.readFileSync(path.join(dataDir, 'chatbot-commands.json'), 'utf8'));

        console.log('[Chatbot] Advanced AI Assistant loaded with customizable keywords');
    } catch (error) {
        console.error('[Chatbot] Error loading knowledge:', error);
    }
}

// Get all available commands for autocomplete
function getAvailableCommands() {
    return commandsConfig.commands || [];
}

// Strip markdown formatting for cleaner display
function stripMarkdown(text) {
    return text.replace(/\*\*/g, '').replace(/\*/g, '');
}

// Match query against intent keywords (improved with better scoring)
function detectIntent(query) {
    const q = query.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    for (const [intentName, intentData] of Object.entries(commandsConfig.intents || {})) {
        let score = 0;
        const keywords = intentData.keywords || [];

        keywords.forEach(keyword => {
            const kw = keyword.toLowerCase();
            if (q.includes(kw)) {
                // Give MUCH higher score for longer/more specific keywords
                // Also bonus for exact match
                const wordCount = kw.split(' ').length;
                const baseScore = wordCount * wordCount; // Quadratic: 1 word=1, 2 words=4, 3 words=9

                // Bonus if exact phrase (accounting for spaces around it)
                const isExactPhrase = q === kw || q.startsWith(kw + ' ') || q.endsWith(' ' + kw) || q.includes(' ' + kw + ' ');
                const exactBonus = isExactPhrase ? wordCount * 2 : 0;

                score += baseScore + exactBonus;
            }
        });

        // Match if at least 1 keyword found
        if (score > 0 && score > highestScore) {
            highestScore = score;
            bestMatch = { name: intentName, data: intentData };
        }
    }

    return bestMatch;
}

function findAnswer(query, userInfo = {}) {
    if (!query) return null;

    const q = query.toLowerCase().trim();

    // QUICK MODE: Commands with /
    if (q.startsWith('/')) {
        const response = handleQuickCommand(q.substring(1));
        if (response && response.text) {
            response.text = stripMarkdown(response.text);
        }
        return response;
    }

    // FULL MODE: Detect intent and provide comprehensive response
    const intent = detectIntent(q);

    if (intent) {
        const response = handleIntent(intent.name, intent.data, q);
        if (response && response.text) {
            response.text = stripMarkdown(response.text);
        }
        return response;
    }

    // Fallback
    const fallbackResponse = handleFallback();
    if (fallbackResponse && fallbackResponse.text) {
        fallbackResponse.text = stripMarkdown(fallbackResponse.text);
    }
    return fallbackResponse;
}

// Quick command responses
function handleQuickCommand(cmd) {
    const contact = knowledgeBase.contact?.direct_contact;
    const commands = commandsConfig.commands || [];

    // Find matching command
    const command = commands.find(c =>
        c.keyword === cmd || (c.aliases && c.aliases.includes(cmd))
    );

    if (!command) {
        return {
            text: `Command /${cmd} not found. Type / to see available commands.`,
            chips: ["View Services", "Get Help"]
        };
    }

    // Handle based on keyword
    if (command.keyword === 'price' || command.keyword === 'pricing') {
        return {
            text: "💰 Quick Pricing:\n• Websites from $500\n• E-commerce from $1500\n• Custom apps from $3000+",
            chips: ["Get Detailed Quote", "View Services"]
        };
    }

    if (command.keyword === 'contact') {
        return {
            text: `📞 Contact:\n📧 ${contact?.email}\n📱 ${contact?.phone}\n💬 ${contact?.whatsapp}`,
            chips: ["Email", "WhatsApp", "Call"]
        };
    }

    if (command.keyword === 'portfolio' || command.keyword === 'projects') {
        return {
            text: `🚀 ${knowledgeBase.portfolio?.projects?.length || 50}+ projects completed across Web, Mobile, and Blockchain.`,
            chips: ["View Portfolio", "See Projects"]
        };
    }

    return null;
}

// Handle detected intents with full responses
function handleIntent(intentName, intentData, query) {
    const contact = knowledgeBase.contact?.direct_contact;
    const about = knowledgeBase.about;
    const services = knowledgeBase.services?.services || [];
    const portfolio = knowledgeBase.portfolio?.projects || [];
    const resume = knowledgeBase.resume;
    const suggestedOptions = intentData.suggestedOptions || [];

    switch (intentName) {
        case 'pricing':
            const topServices = services.slice(0, 4);
            let priceResponse = "💰 **Professional Development Services - Transparent Pricing**\n\n";

            topServices.forEach(s => {
                priceResponse += `✓ ${s.title} - ${s.price}\n`;
            });

            priceResponse += `\n**Every project includes:**\n• Clean, maintainable code\n• Responsive design\n• SEO optimization\n• Post-launch support\n\nLet's discuss your specific requirements for an accurate quote!`;

            return { text: stripMarkdown(priceResponse), chips: suggestedOptions };

        case 'contact':
            return {
                text: `📞 **Let's Start Your Project!**\n\nI'm available through multiple channels:\n\n📧 Email: ${contact?.email}\n📱 Phone: ${contact?.phone}\n💬 WhatsApp: ${contact?.whatsapp}\n\nI typically respond within 2-4 hours. For quickest response, WhatsApp is recommended!\n\nReady to discuss your project?`,
                chips: suggestedOptions
            };

        case 'portfolio':
            const featured = portfolio.slice(0, 3);
            let portfolioResponse = `🚀 **Portfolio Highlights** (${portfolio.length}+ Projects)\n\n`;

            featured.forEach((p, i) => {
                portfolioResponse += `${i + 1}. **${p.title}**\n   ${p.category} | ${p.tech.slice(0, 3).join(', ')}\n   ${p.description.substring(0, 80)}...\n\n`;
            });

            portfolioResponse += "From startups to enterprises, I've delivered solutions that drive real results.\n\nInterested in seeing a specific type of project?";

            return { text: portfolioResponse, chips: suggestedOptions };

        case 'services':
            let servicesResponse = "🛠️ **Full-Stack Development Services**\n\n";

            services.slice(0, 4).forEach((s, i) => {
                servicesResponse += `${i + 1}. **${s.title}** (${s.price})\n   ${s.description}\n   Key: ${s.features.slice(0, 3).join(', ')}\n\n`;
            });

            servicesResponse += "Every project is tailored to your unique needs with modern technology.\n\nWhat type of solution are you looking for?";

            return { text: servicesResponse, chips: suggestedOptions };

        case 'experience':
            const skills = about.skills?.map(s => s.category).join(', ') || '';

            return {
                text: `👨‍💻 **About Khateeb - Full-Stack Development Expert**\n\n${about.bio?.short || 'Professional developer specializing in modern web technologies'}\n\n🎯 **Core Expertise:**\n${skills}\n\n💼 **Experience:**\n• ${resume?.experience?.length || 5}+ years in software development\n• ${about.stats?.projects || 50}+ successful projects\n• Enterprise & startup experience\n\n🏆 **Why Choose Me:**\n✓ Clean, scalable code\n✓ On-time delivery\n✓ Clear communication\n✓ Post-launch support\n\nLet's build something amazing together!`,
                chips: suggestedOptions
            };

        case 'timeline':
            return {
                text: `⏱️ **Project Timeline & Development Process**\n\n📅 **Typical Delivery:**\n• Landing Page: 3-5 days\n• Business Website: 1-2 weeks\n• E-commerce: 3-4 weeks\n• Custom Web App: 4-8 weeks\n• Mobile App: 6-12 weeks\n\n🔄 **My 5-Step Process:**\n1️⃣ Discovery & Planning (1-2 days)\n2️⃣ Design Review (2-3 days)\n3️⃣ Development (with weekly updates)\n4️⃣ Testing & Refinement\n5️⃣ Launch & Training\n\nI believe in transparency and keep you updated throughout.\n\nNeed rush delivery? Let's discuss!`,
                chips: suggestedOptions
            };

        case 'technology':
            return {
                text: `💻 **Modern Technology Stack**\n\n🎯 **Frontend:**\n• React.js, Next.js (Server-Side Rendering)\n• Vue.js, Angular\n• TailwindCSS, Material UI\n\n⚙️ **Backend:**\n• Node.js + Express\n• Python (Django/Flask)\n• PHP (Laravel)\n\n📦 **Database:**\n• MongoDB (NoSQL)\n• MySQL, PostgreSQL (SQL)\n• Firebase, Supabase\n\n☁️ **Deployment:**\n• Vercel, Netlify (Frontend)\n• AWS, DigitalOcean (Backend)\n• Docker, CI/CD pipelines\n\n✨ I choose the best tech stack for YOUR specific needs - not one-size-fits-all!\n\nWhat type of project are you planning?`,
                chips: suggestedOptions
            };

        case 'seo':
            return {
                text: `🚀 **SEO & Performance Optimization**\n\nEvery website I build includes:\n\n📈 **Technical SEO:**\n• Clean semantic HTML\n• Fast page load (< 2 seconds)\n• Mobile-first responsive design\n• Proper meta tags & Schema markup\n\n⚡ **Performance:**\n• Image optimization (WebP, lazy loading)\n• Code splitting & minification\n• CDN integration\n• 90+ Google PageSpeed Score\n\n🔍 **Search Optimization:**\n• Keyword research & implementation\n• XML sitemap generation\n• robots.txt configuration\n• Google Analytics & Search Console\n\n📊 **Results:** My clients typically see 40-70% traffic increase within 3-6 months!\n\nInterested in an SEO audit?`,
                chips: suggestedOptions
            };

        case 'design':
            return {
                text: `🎨 **UI/UX Design Philosophy**\n\n✨ **My Approach:**\nBeautiful websites that convert visitors into customers!\n\n🖼️ **Design Process:**\n1️⃣ Research your industry & competitors\n2️⃣ Create mood boards & wireframes\n3️⃣ Design high-fidelity mockups (Figma)\n4️⃣ Get your feedback & iterate\n5️⃣ Develop pixel-perfect implementation\n\n🎯 **Key Principles:**\n• Mobile-first design\n• Intuitive user experience\n• Brand consistency\n• Accessibility (WCAG compliant)\n• Modern, clean aesthetics\n\n💡 **Included:**\n• Custom graphics & icons\n• Professional color schemes\n• Typography selection\n• Interactive prototypes\n\nLet's create something that WOWs your visitors!`,
                chips: suggestedOptions
            };

        case 'ecommerce':
            return {
                text: `🛒 **E-commerce Development Expertise**\n\n💰 **Complete Store Solutions:**\n\n📦 **Core Features:**\n• Product catalog with variants\n• Smart shopping cart\n• Secure checkout (Stripe, PayPal, more)\n• Order management system\n• Customer accounts & wishlists\n• Inventory tracking\n\n🎨 **Platform Options:**\n• **Custom Build** (Next.js + Stripe) - $1500+\n• **WooCommerce** (WordPress) - $800+\n• **Shopify Setup** (customization) - $600+\n\n✅ **What's Included:**\n• Payment gateway integration\n• Email notifications\n• Admin dashboard\n• Mobile responsive\n• SEO optimized\n• Security (SSL, PCI compliance)\n\n📈 Built to scale from 10 to 10,000 products!\n\nReady to start selling online?`,
                chips: suggestedOptions
            };

        case 'mobile_app':
            return {
                text: `📱 **Mobile App Development**\n\n🚀 **Cross-Platform Excellence:**\n\n⚡ **React Native:**\n• Single codebase → iOS + Android\n• Native performance\n• 60% faster development\n• Cost-effective solution\n\n💎 **Flutter:**\n• Beautiful native interfaces\n• Extremely fast\n• Growing ecosystem\n\n📱 **App Types I Build:**\n• Business apps & catalogs\n• E-commerce mobile stores\n• Social & community apps\n• Booking & scheduling apps\n• IoT & custom solutions\n\n💰 **Starting at $3000**\n\n✅ **Included:**\n• UI/UX design\n• Backend API development\n• Push notifications\n• App Store deployment\n• 30 days post-launch support\n\nHave an app idea? Let's bring it to life!`,
                chips: suggestedOptions
            };

        case 'hosting':
            return {
                text: `☁️ **Hosting & Deployment Solutions**\n\n🌐 **Recommended Hosting:**\n\n⚡ **For Websites:**\n• Vercel (Next.js) - FREE tier available!\n• Netlify (Static sites) - FREE!\n• Cloudflare Pages - FREE!\n\n🏢 **For Web Apps:**\n• DigitalOcean ($5-20/month)\n• AWS (Pay as you grow)\n• Heroku (Easy deployment)\n\n🛒 **For E-commerce:**\n• Shopify hosting (included)\n• WooCommerce (Managed WordPress)\n• Custom VPS ($10-50/month)\n\n✅ **Setup Service Included:**\n• Domain configuration\n• SSL certificate (HTTPS)\n• Email setup\n• Automated backups\n• CDN integration\n\n💡 I help you choose based on your budget & scalability needs!\n\nNeed help with hosting?`,
                chips: suggestedOptions
            };

        case 'payment_methods':
            return {
                text: `💳 **Flexible Payment Options**\n\n💰 **How to Pay:**\n\n1️⃣ **Milestone-Based** (Recommended)\n• 40% upfront to start\n• 30% at design approval\n• 30% on completion\n\n2️⃣ **50-50 Split**\n• 50% to begin\n• 50% on delivery\n\n3️⃣ **Full Upfront** (5% discount!)\n\n📤 **Payment Methods:**\n• Bank Transfer (Primary)\n• PayPal (+3% fee)\n• Wise (International)\n• Payoneer\n• Cryptocurrency (BTC/USDT)\n\n📄 **Included:**\n• Detailed invoice\n• Project agreement\n• Escrow available for large projects\n\n💼 All payments are secure & professional.\n\nReady to get started?`,
                chips: suggestedOptions
            };

        case 'urgency':
            return {
                text: `⚡ **RUSH DELIVERY AVAILABLE!**\n\n🚨 Need it FAST? I've got you covered!\n\n⏱️ **Express Timeline:**\n• Landing Page: 1-2 days\n• Business Site: 3-5 days\n• Small E-commerce: 7-10 days\n• Web App (MVP): 2-3 weeks\n\n💰 **Rush Fee:**\n• +30% for 2x speed\n• +50% for next-day delivery\n\n✅ **Priority Benefits:**\n• Dedicated focus on your project\n• Daily progress updates\n• Direct phone/WhatsApp access\n• Weekend work if needed\n\n📞 **Available NOW**: I can start immediately!\n\n⚠️ Rush slots are limited - contact me ASAP to secure yours!\n\nWhat's your deadline?`,
                chips: ["Contact Now", "Get Quote", "Discuss Project"]
            };

        case 'comparison':
            return {
                text: `⚖️ **Technology Comparison & Recommendations**\n\n🤔 Not sure which tech to choose? Let me help!\n\n**Common Comparisons:**\n\n🌐 **WordPress vs Custom:**\n• WordPress: Quick, cost-effective, plugins\n• Custom: Full control, faster, scalable\n\n🛒 **Shopify vs WooCommerce:**\n• Shopify: Hosted, easy, monthly fee\n• WooCommerce: Self-hosted, flexible, one-time\n\n📱 **React Native vs Native:**\n• RN: Faster dev, cross-platform, cost-effective\n• Native: Best performance, platform-specific\n\n💡 **My Recommendation?**\nIt depends on:\n• Your budget\n• Timeline requirements\n• Future scalability needs\n• Team technical skills\n\nLet's discuss YOUR specific needs for the best choice!\n\nWhat are you deciding between?`,
                chips: suggestedOptions
            };

        case 'maintenance':
            return {
                text: `🔧 **Maintenance & Support Plans**\n\n🛡️ **Keep Your Site Running Smoothly:**\n\n📦 **Basic Plan - $50/month:**\n• Weekly backups\n• Security monitoring\n• Minor updates & fixes\n• 2 hours support/month\n\n💎 **Pro Plan - $150/month:**\n• Daily backups\n• 24/7 security\n• Content updates\n• Performance optimization\n• 8 hours support/month\n• Priority response\n\n🚀 **Enterprise - Custom:**\n• Dedicated support\n• Custom SLA\n• Unlimited updates\n• Phone support\n\n✅ **All Plans Include:**\n• Plugin/CMS updates\n• Uptime monitoring\n• Monthly reports\n• Emergency fixes\n\n💡 **Or Pay-As-You-Go:** $50/hour for one-time fixes\n\nNeed ongoing support?`,
                chips: suggestedOptions
            };

        case 'custom_features':
            return {
                text: `⚙️ **Custom Development & Integrations**\n\n🔌 **API Integrations:**\n• Payment gateways (Stripe, PayPal, etc.)\n• CRM systems (Salesforce, HubSpot)\n• Email services (Mailchimp, SendGrid)\n• Social media platforms\n• Analytics & tracking\n\n🤖 **Advanced Features:**\n• AI/ML integration (ChatGPT, custom models)\n• Chatbots & virtual assistants\n• Automated workflows\n• Real-time notifications\n• Multi-language support\n\n📊 **Custom Dashboards:**\n• Analytics & reporting\n• User management\n• Data visualization\n• Admin panels\n\n💰 **Pricing:** $50-100/hour based on complexity\n\n💡 If you can imagine it, I can build it!\n\nWhat custom features do you need?`,
                chips: suggestedOptions
            };

        case 'greeting':
            return {
                text: `👋 **Hey! Great to connect with you!**\n\nI'm Khateeb - a Full-Stack Developer who builds websites & apps that actually work AND look amazing!\n\n✨ **What I Do:**\n• Custom Websites & Web Apps\n• E-commerce Stores\n• Mobile Apps (iOS/Android)\n• API Development\n• SEO & Performance Optimization\n\n🎯 **Why Work With Me:**\n✓ 5+ years experience\n✓ 50+ successful projects\n✓ Fast delivery\n✓ Clean, scalable code\n✓ Transparent pricing\n\n💬 **How can I help you today?**`,
                chips: ["View Services", "Get Quote", "See Portfolio", "Pricing"]
            };

        default:
            return handleFallback();
    }
}

function handleFallback() {
    return {
        text: `🤔 I want to make sure I give you the most relevant information!\n\nI can help you with:\n\n💼 Services & Pricing\n🚀 Portfolio & Projects\n👨‍💻 About Khateeb's Experience\n⏱️ Timeline & Process\n📞 Direct Contact\n\nWhat would you like to know more about?`,
        chips: ["Services & Pricing", "View Portfolio", "About Khateeb", "Get Quote"]
    };
}

// Initialize
loadKnowledgeBase();

module.exports = { findAnswer, loadKnowledgeBase, getAvailableCommands };
