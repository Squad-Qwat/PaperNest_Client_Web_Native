const projectsData = [
    {
        id: 1,
        title: 'Analisis Sistem Informasi Manajemen Berbasis Cloud Computing',
        description: 'Studi implementasi cloud computing dalam sistem informasi manajemen perusahaan.',
        status: 'personal',
        lastUpdated: '2 jam yang lalu'
    },
    {
        id: 2,
        title: 'Pengaruh Artificial Intelligence terhadap Produktivitas Kerja',
        description: 'Analisis dampak AI dalam meningkatkan efisiensi kerja di era digital.',
        status: 'shared',
        lastUpdated: '5 jam yang lalu'
    },
    {
        id: 3,
        title: 'Perancangan Aplikasi Mobile untuk Manajemen Dokumen Digital',
        description: 'Pengembangan sistem manajemen dokumen mobile dengan fitur kolaborasi real-time.',
        status: 'personal',
        lastUpdated: '1 hari yang lalu'
    },
    {
        id: 4,
        title: 'Implementasi Blockchain dalam Sistem Keamanan Data',
        description: 'Kajian teknologi blockchain untuk keamanan data pada sistem informasi kesehatan.',
        status: 'shared',
        lastUpdated: '3 jam yang lalu'
    },
    {
        id: 5,
        title: 'Evaluasi User Experience pada Platform E-Learning',
        description: 'Analisis faktor-faktor yang mempengaruhi efektivitas pembelajaran online.',
        status: 'personal',
        lastUpdated: '2 hari yang lalu'
    },
    {
        id: 6,
        title: 'Sistem Rekomendasi Berbasis Machine Learning untuk E-Commerce',
        description: 'Pengembangan algoritma rekomendasi produk berdasarkan perilaku pengguna.',
        status: 'shared',
        lastUpdated: '6 jam yang lalu'
    }
];

function renderProjectCards() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    let cardsHTML = '';
    
    projectsData.forEach(project => {
        cardsHTML += `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-card-header">
                    <div>
                        <h3 class="project-card-title">${project.title}</h3>
                    </div>
                    <span class="project-card-status ${project.status}">
                        ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                </div>
                <p class="project-card-description">${project.description}</p>
                <div class="project-card-footer">
                    <div class="project-card-meta">
                        <i class='bx bx-time'></i>
                        <span>${project.lastUpdated}</span>
                    </div>
                    <button class="project-card-delete-btn" data-project-id="${project.id}" aria-label="Delete project">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        `;
    });

    projectsGrid.innerHTML = cardsHTML;

    document.querySelectorAll('.project-card-delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const projectId = this.getAttribute('data-project-id');
            handleProjectDelete(projectId);
        });
    });
}

function handleProjectDelete(projectId) {
    const project = projectsData.find(p => p.id == projectId);
    if (project) {
        const confirmed = confirm(`Apakah Anda yakin ingin menghapus "${project.title}"?\n\nTindakan ini tidak dapat dibatalkan.`);
        if (confirmed) {
            const index = projectsData.findIndex(p => p.id == projectId);
            if (index > -1) {
                projectsData.splice(index, 1);
                renderProjectCards();
                initializeSearch();
            }
        }
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('dashboardSearch');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterProjects(searchTerm);
        });
    }
}

function filterProjects(searchTerm) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-card-title').textContent.toLowerCase();
        const description = card.querySelector('.project-card-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleNewProject() {
    const title = prompt('Masukkan judul dokumen:');
    if (!title || title.trim() === '') {
        alert('Judul dokumen harus diisi!');
        return;
    }
    const description = prompt('Masukkan deskripsi dokumen:');
    if (!description || description.trim() === '') {
        alert('Deskripsi dokumen harus diisi!');
        return;
    }
    const status = prompt('Masukkan status dokumen (personal/shared):', 'personal');
    if (!status || (status.toLowerCase() !== 'personal' && status.toLowerCase() !== 'shared')) {
        alert('Status tidak valid! Silakan masukkan "personal" atau "shared".');
        return;
    }
    const newId = projectsData.length > 0 
        ? Math.max(...projectsData.map(p => p.id)) + 1 
        : 1;

    const newProject = {
        id: newId,
        title: title.trim(),
        description: description.trim(),
        status: status.toLowerCase(),
        lastUpdated: 'baru saja'
    };

    // Untuk menambahkan proyek baru di awal array
    projectsData.unshift(newProject);

    renderProjectCards();
    initializeSearch();    
}

function initializeNewProjectButton() {
    const newProjectBtn = document.querySelector('.btn-new-project');
    
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', handleNewProject);
    }
}

function initializeDashboard() {
    renderProjectCards();
    initializeSearch();
    initializeNewProjectButton();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}
