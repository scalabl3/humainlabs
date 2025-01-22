// Navigation structure
const navStructure = [
    // About section
    { type: 'header', text: 'About' },
    { type: 'group', items: [
        { href: 'index.html', text: 'Interpretability: Do I Fit?' },
        { href: 'ec-about-resume.html', text: 'Resume' }
    ]},

    // Research section
    { type: 'header', text: 'My Research' },
    { type: 'group', items: [
        { href: 'ec-overview.html', text: 'Overview' },
        { href: 'ec-research-saveas.html', text: 'AI.context.saveAs()' },
        { href: 'ec-research-terminology.html', text: 'Terminology' }
    ]},
    
    // eC Development section
    { type: 'header', text: 'eC Development' },
    { type: 'group', items: [
        { href: 'ec-human-learning.html', text: 'Human Learning' },
        { href: 'ec-learning-strategies.html', text: 'Learning Strategies' },
        { href: 'ec-learning-paradigms.html', text: 'Learning Paradigms' }
    ]},
    
    // Lineages section
    { type: 'header', text: 'Lineages' },
    { type: 'group', items: [
        { href: 'ec-lineage-foundation.html', text: 'Foundation' },
        { href: 'ec-lineage-workflow.html', text: 'Workflow Fork' },
        { href: 'ec-lineage-conceptual.html', text: 'Conceptual Fork' }
    ]},
    
    // Artifacts section
    { type: 'header', text: 'Artifacts' },
    { type: 'group', items: [
        { href: 'ec-documents-foundation.html', text: 'Foundation Documents' },
        { href: 'ec-documents-workflow.html', text: 'Workflow Documents' },
        { href: 'ec-documents-transfer.html', text: 'eC Transfer Documents' }
    ]},

    // Results section
    { type: 'header', text: 'Results' },
    { type: 'group', items: [
        { href: 'ec-results-successes.html', text: 'Notable Successes' },
        { href: 'ec-results-failures.html', text: 'Notable Failures' },
        { href: 'ec-results-humanlike.html', text: 'Humanlike Observations' },
        { href: 'ec-results-conclusions.html', text: 'Conclusions' },
        { href: 'ec-results-further-research.html', text: 'Further Research' }
    ]},
    
    // Misc section (renamed from About)
    { type: 'divider' },
    { type: 'header', text: 'Misc' },
    { type: 'group', items: [
        { href: 'ec-funfacts.html', text: 'Fun Facts' }
    ]}
];

// Generate navigation
function generateNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'left-nav';

    // Add logo and hamburger in a container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';

    const logo = document.createElement('a');
    logo.href = 'ec-overview.html';
    logo.className = 'nav-logo';
    logo.innerHTML = 'Humain<span class="accent">Labs.ai</span><br/><span class="author-name">Jasdeep Jaitla</span>';
    
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    for (let i = 0; i < 3; i++) {
        hamburger.appendChild(document.createElement('span'));
    }

    headerContainer.appendChild(hamburger);
    headerContainer.appendChild(logo);
    nav.appendChild(headerContainer);

    // Add menu items
    const ul = document.createElement('ul');
    ul.className = 'nav-menu';
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Process navigation structure
    navStructure.forEach(item => {
        switch (item.type) {
            case 'header':
                const header = document.createElement('div');
                header.className = 'nav-header';
                header.textContent = item.text;
                ul.appendChild(header);
                break;
                
            case 'group':
                const group = document.createElement('div');
                group.className = 'nav-group';
                item.items.forEach(link => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = link.href;
                    a.textContent = link.text;
                    if (link.href === currentPage) {
                        a.className = 'active';
                    }
                    li.appendChild(a);
                    group.appendChild(li);
                });
                ul.appendChild(group);
                break;
                
            case 'divider':
                const divider = document.createElement('div');
                divider.className = 'nav-divider';
                ul.appendChild(divider);
                break;
                
            case 'link':
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.href;
                a.textContent = item.text;
                if (item.href === currentPage) {
                    a.className = 'active';
                }
                li.appendChild(a);
                ul.appendChild(li);
                break;
        }
    });
    
    // Add blank element for mobile spacing
    const spacer = document.createElement('li');
    spacer.style.height = '6rem';
    ul.appendChild(spacer);
    
    nav.appendChild(ul);
    return nav;
}

// Function to get flattened navigation items
function getFlatNavItems() {
    const items = [];
    navStructure.forEach(item => {
        if (item.type === 'link') {
            items.push(item);
        } else if (item.type === 'group') {
            item.items.forEach(subItem => items.push(subItem));
        }
    });
    return items;
}

// Generate next/previous navigation
function generatePageNavigation() {
    const content = document.querySelector('.content');
    if (!content) return;

    // Get current page URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // Get flattened nav items
    const navItems = getFlatNavItems();
    const currentIndex = navItems.findIndex(item => item.href === currentPage);
    if (currentIndex === -1) return;

    // Create navigation container
    const pageNav = document.createElement('div');
    pageNav.className = 'page-navigation';
    pageNav.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    `;

    // Previous link
    if (currentIndex > 0) {
        const prevItem = navItems[currentIndex - 1];
        const prevLink = document.createElement('a');
        prevLink.href = prevItem.href;
        prevLink.className = 'prev-page';
        prevLink.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: var(--text-color);
            opacity: 0.75;
            font-size: 0.85rem;
            font-weight: 600;
            transition: opacity 0.2s ease;
        `;
        prevLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span>${prevItem.text}</span>
        `;
        prevLink.addEventListener('mouseenter', () => prevLink.style.opacity = '1');
        prevLink.addEventListener('mouseleave', () => prevLink.style.opacity = '0.75');
        pageNav.appendChild(prevLink);
    } else {
        // Empty div for spacing
        pageNav.appendChild(document.createElement('div'));
    }

    // Next link
    if (currentIndex < navItems.length - 1) {
        const nextItem = navItems[currentIndex + 1];
        const nextLink = document.createElement('a');
        nextLink.href = nextItem.href;
        nextLink.className = 'next-page';
        nextLink.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: var(--primary-color);
            font-size: 0.85rem;
            font-weight: 600;
            transition: color 0.2s ease;
        `;
        nextLink.innerHTML = `
            <span>${nextItem.text}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        `;
        nextLink.addEventListener('mouseenter', () => nextLink.style.color = 'var(--secondary-color)');
        nextLink.addEventListener('mouseleave', () => nextLink.style.color = 'var(--primary-color)');
        pageNav.appendChild(nextLink);
    }

    content.appendChild(pageNav);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    generateNavigation();
    generatePageNavigation();
    addCacheBuster();
});

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    // Insert navigation
    const container = document.querySelector('.container');
    container.insertBefore(generateNavigation(), container.firstChild);
    
    // Setup hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Add cache busting for development
function addCacheBuster() {
    const timestamp = new Date().getTime();
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        link.href = link.href.split('?')[0] + '?v=' + timestamp;
    });
}

// Call it when the page loads
document.addEventListener('DOMContentLoaded', addCacheBuster);

// Scroll depth tracking for GA4
let scrollMarks = new Set();

function calculateScrollPercentage() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    return Math.round((scrolled / documentHeight) * 100);
}

window.addEventListener('scroll', function() {
    const scrollPercentage = calculateScrollPercentage();
    
    [25, 50, 75, 100].forEach(mark => {
        if (scrollPercentage >= mark && !scrollMarks.has(mark)) {
            scrollMarks.add(mark);
            gtag('event', 'scroll_milestone', {
                'depth': mark,
                'page': window.location.pathname
            });
        }
    });
}, { passive: true });

// Term definitions hover functionality
const termDefinitions = {
    // Core Concepts
    'AIC': 'Long AI Conversation',
    'CTL': 'Conversation Too Long - AI session termination due to length',
    'eC': 'Ephemeral Context - vector tokens for AI',
    
    // Instance Names - Foundation
    'C1': 'Foundation Lineage - AIC #1',
    'C2': 'Foundation Lineage - AIC #2',
    'C3': 'Foundation Lineage - AIC #3 - Language Architect',
    
    // Instance Names - Workflow
    'C3B': 'Workflow Lineage - AIC #4',
    'C3C': 'Workflow Lineage - AIC #5',
    'C3D': 'Workflow Lineage - AIC #6',
    'C3E': 'Workflow Lineage - AIC #7',
    
    // Instance Names - Conceptual
    'Aion': 'Conceptual Lineage AIC #1',
    'Solon': 'Conceptual Lineage AIC #2',
    'Aevum': 'Conceptual Lineage AIC #2',
    'Auryn': 'Conceptual Lineage AIC #3',
    'Synarion': 'Conceptual Lineage AIC #4',
    'Kioko': 'Conceptual Lineage AIC #5'
};

class TermHighlighter {
    constructor() {
        this.init();
        this.highlightTerms();
    }

    init() {
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .term-highlight {
                cursor: help;
                border-bottom: 1px dotted var(--accent-color-light);
                transition: all 0.2s ease;
                position: relative;
            }
            .term-highlight:hover {
                background: var(--card-bg);
                padding: 0 0.2rem;
                border-radius: 2px;
                border-bottom-color: var(--accent-color-light);
            }
            .term-highlight::after {
                content: attr(aria-label);
                display: none;
                position: absolute;
                left: 60%;
                transform: translateX(0);
                bottom: -25px;
                padding: 1px 4px;
                white-space: nowrap;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
                font-size: 11px;
                line-height: 1.3;
                color: #f5f5f5;
                background: #303030;
                border: 1px solid #505050;
                box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                z-index: 1000;
            }
            .term-highlight:hover::after {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }

    highlightTerms() {
        const elements = document.querySelectorAll('p, li');
        elements.forEach(element => {
            let html = element.innerHTML;
            Object.entries(termDefinitions).forEach(([term, definition]) => {
                // Only match whole words
                const regex = new RegExp(`\\b${term}\\b`, 'g');
                html = html.replace(regex, `<span class="term-highlight" aria-label="${definition}">$&</span>`);
            });
            element.innerHTML = html;
        });
    }

    removeHighlights() {
        document.querySelectorAll('.term-highlight').forEach(el => {
            const text = el.textContent;
            el.outerHTML = text;
        });
    }

    // Admin toggle via console: window.termHighlighter.toggle()
    toggle() {
        if (document.querySelector('.term-highlight')) {
            this.removeHighlights();
        } else {
            this.highlightTerms();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.termHighlighter = new TermHighlighter();
    
    // Add cache busting for development
    const timestamp = new Date().getTime();
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        link.href = link.href.split('?')[0] + '?v=' + timestamp;
    });
}); 