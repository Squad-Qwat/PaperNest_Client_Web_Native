
const navbarConfig = {
    logo: {
        text: "PaperNest",
    },
    menuItems: [
        { name: "Projects", href: "../dashboard/index.html", active: true },
        { name: "Chatbot", href: "/chatbot" },
        { name: "Review", href: "../review/index.html" },
        { name: "Settings", href: "/settings" }
    ],
    menuItemsInDocumentPage: [
        { name: "Citations", href: "../citation/index.html" },
        { name: "Reviews", href: "../review/index.html" },
    ]
};

function createNavbar(options = {}) {
    const {
        activePage = "Projects",
        insertPosition = "afterbegin",
        isMenuInDocumentPage = false
    } = options;

    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('docId');

    const updatedMenuItems = isMenuInDocumentPage ? navbarConfig.menuItemsInDocumentPage.map(item => ({
        ...item,
        active: item.name === activePage,
        href: docId ? `${item.href}?docId=${docId}` : item.href
    })) : navbarConfig.menuItems.map(item => ({
        ...item,
        active: item.name === activePage
    }));

    const currentUser = typeof GLOBAL_OBJECT !== 'undefined' ? GLOBAL_OBJECT.getCurrentUser() : null;
    const userName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User';
    const userRole = currentUser ? currentUser.role : '';

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
                            <button class="navbar-icon-btn navbar-logout-btn" aria-label="Keluar">
                                <span>Keluar</span>
                            </button>

                            <button class="navbar-icon-btn" aria-label="Notifications">
                                <i class='bx bx-bell'></i>
                                <span class="notification-badge"></span>
                            </button>

                            <div class="navbar-user-info">
                                <div class="navbar-user-details">
                                    <span class="navbar-user-name">${userName}</span>
                                    ${userRole ? `<span class="navbar-user-role">${userRole}</span>` : ''}
                                </div>
                                <button class="navbar-avatar" aria-label="User menu">
                                    <i class='bx bx-user-circle'></i>
                                </button>
                            </div>
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
    
    const logoutBtn = document.querySelector('.navbar-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmed = confirm('Apakah Anda yakin ingin keluar?');
            if (confirmed) {
                window.location.href = '../index.html';
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createNavbar, navbarConfig };
}
