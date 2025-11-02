
const navbarConfig = {
    logo: {
        text: "PaperNest",
    },
    menuItems: [
        { name: "Projects", href: "/", active: true },
        { name: "Chatbot", href: "/chatbot" },
        { name: "Review", href: "/review" },
        { name: "Settings", href: "/settings" }
    ],
    menuItemsInDocumentPage: [
        { name: "Citations", href: "/project/citations" },
    ]
};

function createNavbar(options = {}) {
    const {
        activePage = "Projects",
        insertPosition = "afterbegin",
        isMenuInDocumentPage = false
    } = options;


    const updatedMenuItems = isMenuInDocumentPage ? navbarConfig.menuItemsInDocumentPage.map(item => ({
        ...item,
        active: item.name === activePage
    })) : navbarConfig.menuItems.map(item => ({
        ...item,
        active: item.name === activePage
    }));

    const navbarHTML = `
        <nav class="navbar sticky top">
            <div class="navbar-wrapper default">
                
                <div class="navbar-top-row">
                    <div class="navbar-content-top">
                        <!-- Logo Section -->
                        <div class="navbar-logo">
                            <div class="logo-text">
                                <span class="logo-main">${navbarConfig.logo.text}</span>
                            </div>
                            <div class="environment-badge">Hobby</div>
                        </div>

                        <div class="navbar-actions">
                            <button class="navbar-icon-btn" aria-label="Feedback">
                                Feedback
                            </button>

                            <button class="navbar-icon-btn" aria-label="Notifications">
                                <i class='bx bx-bell'></i>
                                <span class="notification-badge"></span>
                            </button>

                            <button class="navbar-avatar" aria-label="User menu">
                                <i class='bx bx-user-circle'></i>
                            </button>
                        </div>

                        <button class="navbar-trigger" aria-label="Menu">
                            <i class='bx bx-menu'></i>
                        </button>
                    </div>
                </div>

                <div class="navbar-bottom-row">
                    <div class="navbar-content-bottom">
                        <div class="navbar-menu">
                            ${updatedMenuItems.map(item => `
                                <a href="${item.href}" class="navbar-item ${item.active ? 'current' : ''}">
                                    ${item.name}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML(insertPosition, navbarHTML);
    
    initNavbarInteractions();
}

function initNavbarInteractions() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.navbar-trigger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarBottomRow = document.querySelector('.navbar-bottom-row');
    
    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                navbarMenu.classList.contains('active') ? 'true' : 'false'
            );
        });
        
        // Klik luarnya
        document.addEventListener('click', (e) => {
            if (!navbarBottomRow?.contains(e.target) && !menuToggle.contains(e.target)) {
                navbarMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createNavbar, navbarConfig };
}
