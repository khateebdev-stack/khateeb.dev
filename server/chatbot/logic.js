const fs = require('fs');
const path = require('path');

// Load Knowledge Base
const dataDir = path.join(__dirname, '../../src/data');
let knowledgeBase = [];

function loadKnowledgeBase() {
    try {
        const faq = JSON.parse(fs.readFileSync(path.join(dataDir, 'faq.json'), 'utf8'));
        const services = JSON.parse(fs.readFileSync(path.join(dataDir, 'services.json'), 'utf8'));
        const contact = JSON.parse(fs.readFileSync(path.join(dataDir, 'contact.json'), 'utf8'));

        knowledgeBase = [];

        // Process FAQs
        if (faq.faqs) {
            faq.faqs.forEach(item => {
                knowledgeBase.push({
                    keywords: item.question.toLowerCase().split(' '),
                    question: item.question,
                    answer: item.answer,
                    category: 'faq'
                });
            });
        }

        // Process Services
        if (services.services) {
            services.services.forEach(item => {
                knowledgeBase.push({
                    keywords: [item.title.toLowerCase(), ...item.description.toLowerCase().split(' ')],
                    question: `Tell me about ${item.title}`,
                    answer: `${item.title}: ${item.description}. Starting at ${item.price}.`,
                    category: 'service'
                });
            });
        }

        console.log(`[Chatbot] Loaded ${knowledgeBase.length} knowledge items.`);
    } catch (error) {
        console.error('[Chatbot] Error loading knowledge base:', error);
    }
}

// Simple Keyword Matching (Can be upgraded to Fuzzy/AI later)
function findAnswer(query) {
    if (!query) return null;
    const lowerQuery = query.toLowerCase();

    // 1. Exact/Strong Match
    const bestMatch = knowledgeBase.find(item => {
        // Check if 50% of keywords match
        const matchCount = item.keywords.filter(k => lowerQuery.includes(k)).length;
        return matchCount >= Math.max(1, item.keywords.length * 0.5);
    });

    if (bestMatch) {
        return {
            text: bestMatch.answer,
            chips: ["Book a Call", "See Portfolio", "Contact Me"]
        };
    }

    // 2. Fallback for specific intents
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('rate')) {
        return {
            text: "My rates depend on the project scope. Generally, websites start from $500. Would you like to see my full services list?",
            chips: ["View Services", "Get a Quote"]
        };
    }

    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
        return {
            text: "Hi there! I'm Khateeb's AI assistant. How can I help you today?",
            chips: ["View Services", "See Portfolio", "Contact Human"]
        };
    }

    return null;
}

// Initialize on load
loadKnowledgeBase();

module.exports = { findAnswer, loadKnowledgeBase };
