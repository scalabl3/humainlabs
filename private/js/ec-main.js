// Navigation structure
const navStructure = [
    // Research section
    { type: 'header', text: 'Research' },
    { type: 'group', items: [
        { href: 'ec-overview.html', text: 'Overview' },
        { href: 'ec-saveas.html', text: 'AI.context.saveAs()' },
        { href: 'ec-terminology.html', text: 'Terminology' }
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
    
    // Artifacts section (renamed)
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
        { href: 'ec-humanlike.html', text: 'Humanlike Observations' },
        { href: 'ec-results-conclusions.html', text: 'Conclusions' }
    ]},
    
    // Personal section
    { type: 'divider' },
    { type: 'header', text: 'About' },
    { type: 'group', items: [
        { href: 'ec-interpretability.html', text: 'Interpretability: Do I Fit?' },
        { href: 'ec-resume.html', text: 'Resume' },
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