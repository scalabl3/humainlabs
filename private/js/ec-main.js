// Navigation structure
const navStructure = [
    // Main pages
    { type: 'link', href: 'ec-saveas.html', text: 'Home: Context > Save As...' },
    { type: 'link', href: 'ec-overview.html', text: 'Overview' },
    
    // Lineages section
    { type: 'header', text: 'Lineages' },
    { type: 'group', items: [
        { href: 'ec-foundation.html', text: 'Foundation' },
        { href: 'ec-process.html', text: 'Process Refinement' },
        { href: 'ec-conceptual.html', text: 'Conceptual Evolution' }
    ]},
    
    // Methods & Artifacts
    { type: 'header', text: 'Methodologies' },
    { type: 'group', items: [
        { href: 'ec-methods.html', text: 'Ephemeral Context Development' },
        { href: 'ec-artifacts.html', text: 'AI Generated Artifacts' },        
    ]},

    // Methods & Artifacts
    { type: 'header', text: 'Results' },
    { type: 'group', items: [
        { href: 'ec-successes.html', text: 'Notable Successes' },
        { href: 'ec-failures.html', text: 'Notable Failures' },
        { href: 'ec-humanlike.html', text: 'Humanlike Observations' }
    ]},

    
    // Personal section
    { type: 'divider' },
    { type: 'header', text: 'About' },
    { type: 'group', items: [
        { href: 'ec-interpretability.html', text: 'Interpretability: Do I Fit?' },
        { href: 'ec-resume.html', text: 'Resume' },
        { href: 'ec-about.html', text: 'Fun Facts' }
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
    logo.href = 'ec-saveas.html';
    logo.className = 'nav-logo';
    logo.innerHTML = 'Humain<span class="accent">Labs.ai</span><span class="author-name"> - Jasdeep Jaitla</span>';
    
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