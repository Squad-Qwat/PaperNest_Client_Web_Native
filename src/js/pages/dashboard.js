let projectsData = GLOBAL_OBJECT.getCurrentUserDocuments();

function renderProjectCards() 
{
    projectsData = GLOBAL_OBJECT.getCurrentUserDocuments();
    
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    let cardsHTML = '';
    
    projectsData.forEach(project => 
    {
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
                    <div class="project-card-actions">
                        <button class="project-card-open-btn" data-project-id="${project.id}" aria-label="Open project">
                            <span>Buka</span>
                        </button>
                        <button class="project-card-delete-btn" data-project-id="${project.id}" aria-label="Delete project">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    projectsGrid.innerHTML = cardsHTML;

    document.querySelectorAll('.project-card-open-btn').forEach(btn => 
    {
        btn.addEventListener('click', function() 
        {
            const projectId = this.getAttribute('data-project-id');
            handleProjectOpen(projectId);
        });
    });

    document.querySelectorAll('.project-card-delete-btn').forEach(btn => 
    {
        btn.addEventListener('click', function() 
        {
            const projectId = this.getAttribute('data-project-id');
            handleProjectDelete(projectId);
        });
    });
}

function handleProjectOpen(projectId) 
{
    const project = projectsData.find(p => p.id == projectId);
    if (!project) {return;}

    // push ke halaman citation dengan docId sebagai parameter
    window.location.href = `../citation/index.html?docId=${projectId}`;
}

/**
 * MODIFIED: Replaced confirm() with async showDashboardConfirm()
 */
async function handleProjectDelete(projectId) 
{
    const project = projectsData.find(p => p.id == projectId);
    if (!project) 
    {
        console.error("Proyek tidak ada!");
        return;
    }

    const confirmed = await showDashboardConfirm(
        `Apakah Anda yakin ingin menghapus "${project.title}"?\n\nTindakan ini tidak dapat dibatalkan.`,
        'Hapus Dokumen'
    );

    if (!confirmed) {return;}

    // Hapus dari current user documents
    const currentUser = GLOBAL_OBJECT.getCurrentUser();
    // if (currentUser && currentUser.documents) {something}
    if (!currentUser || !currentUser.documents) 
    {
        console.error("Tidak ada pengguna!");
        return;
    }

    const index = currentUser.documents.findIndex(p => p.id == projectId);
    // if(index > -1){something}
    if (index <= -1) {return;}

    currentUser.documents.splice(index, 1);
    renderProjectCards();
    initializeSearch();
}

function initializeSearch() 
{
    const searchInput = document.getElementById('dashboardSearch');
    if (!searchInput) {return;}

    searchInput.addEventListener('input', function(e) 
    {
        const searchTerm = e.target.value.toLowerCase();
        filterProjects(searchTerm);
    });
}

function filterProjects(searchTerm) 
{
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => 
    {
        const title = card.querySelector('.project-card-title').textContent.toLowerCase();
        const description = card.querySelector('.project-card-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {card.style.display = 'block';} 
        else {card.style.display = 'none';}
    });
}

/* ========================================================================
   BAGIAN BARU: FUNGSI DIALOG MODAL
   (Menggantikan prompt(), alert(), confirm() asli)
======================================================================== */

/**
 * NEW: Menyuntikkan HTML untuk modal ke dalam dokumen.
 * Dijalankan sekali saat DOM dimuat.
 */
function injectDashboardModals() 
{
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <dialog id="dashboard-alert-dialog">
            <h3 id="dashboard-alert-title">Info</h3>
            <p id="dashboard-alert-message">Pesan default.</p>
            <div class="dialog-actions">
                <button id="dashboard-alert-ok-btn" class="btn-primary">OK</button>
            </div>
        </dialog>

        <dialog id="dashboard-confirm-dialog">
            <h3 id="dashboard-confirm-title">Konfirmasi</h3>
            <p id="dashboard-confirm-message">Apakah Anda yakin?</p>
            <div class="dialog-actions">
                <button id="dashboard-confirm-cancel-btn" class="btn-secondary">Batal</button>
                <button id="dashboard-confirm-ok-btn" class="btn-danger">Ya, Lanjutkan</button>
            </div>
        </dialog>

        <dialog id="new-project-dialog">
            <h3>Buat Dokumen Baru</h3>
            <form id="new-project-form">
                <div class="form-group">
                    <label for="form-project-title">Judul Dokumen<span>*</span></label>
                    <input type="text" id="form-project-title" name="title" placeholder="Masukkan judul" required />
                </div>
                <div class="form-group">
                    <label for="form-project-description">Deskripsi<span>*</span></label>
                    <input type="text" id="form-project-description" name="description" placeholder="Masukkan deskripsi singkat" required />
                </div>
                <div class="form-group">
                    <label for="form-project-status">Status<span>*</span></label>
                    <select id="form-project-status" name="status" required>
                        <option value="" disabled selected hidden>Pilih jenis status proyek</option>
                        <option value="personal">Personal</option>
                        <option value="shared">Shared</option>
                    </select>
                </div>
                <div class="dialog-actions">
                    <button type="button" id="new-project-cancel-btn" class="btn-secondary">Batal</button>
                    <button type="submit" class="btn-primary">Buat</button>
                </div>
            </form>
        </dialog>
    `;
    document.body.appendChild(modalContainer);
}

/**
 * NEW: Menampilkan dialog alert kustom.
 */
function showDashboardAlert(message, title = 'Info') 
{
    const dialog = document.getElementById('dashboard-alert-dialog');
    if (!dialog) {return;} // Failsafe
    
    dialog.querySelector('#dashboard-alert-title').textContent = title;
    dialog.querySelector('#dashboard-alert-message').textContent = message;
    
    const okBtn = document.getElementById('dashboard-alert-ok-btn');
    okBtn.onclick = () => dialog.close();
    
    dialog.showModal();
}

/**
 * NEW: Menampilkan dialog konfirmasi kustom.
 * @returns {Promise<boolean>}
 */
function showDashboardConfirm(message, title = 'Konfirmasi') 
{
    const dialog = document.getElementById('dashboard-confirm-dialog');
    if (!dialog){return Promise.reject(new Error("Dialog 'dashboard-confirm-dialog' not found."));}

    dialog.querySelector('#dashboard-confirm-title').textContent = title;
    dialog.querySelector('#dashboard-confirm-message').textContent = message;
    
    const okBtn = document.getElementById('dashboard-confirm-ok-btn');
    const cancelBtn = document.getElementById('dashboard-confirm-cancel-btn');

    if(!okBtn || !cancelBtn){return Promise.reject(new Error("Komponen di dalam 'dashboard-confirm-dialog' tidak lengkap."))}

    dialog.showModal();

    return new Promise((resolve) => 
    {
        okBtn.onclick = () => 
        {
            dialog.close();
            resolve(true);
        };
        cancelBtn.onclick = () => 
        {
            dialog.close();
            resolve(false);
        };
    });
}


/**
 * MODIFIED: Menggantikan handleNewProject() dan initializeNewProjectButton()
 * Menggunakan modal dialog dengan form.
 */
function initializeNewProjectModal() 
{
    const newProjectBtn = document.querySelector('.btn-new-project');
    const dialog = document.getElementById('new-project-dialog');
    const form = document.getElementById('new-project-form');
    const cancelBtn = document.getElementById('new-project-cancel-btn');

    if (!newProjectBtn || !dialog || !form || !cancelBtn) 
    {
        console.error("Missing elements for new project modal");
        return;
    }

    // 1. Open the dialog
    newProjectBtn.addEventListener('click', () => 
    {
        form.reset();
        // Clear any previous errors
        form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        dialog.showModal();
    });

    // 2. Close on cancel
    cancelBtn.addEventListener('click', () => dialog.close());

    // 3. Handle form submission
    form.addEventListener('submit', (event) => 
    {
        event.preventDefault();
        
        const formData = new FormData(form);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const status = formData.get('status'); // From select

        // Validation
        let isValid = true;
        const titleInput = form.querySelector('#form-project-title');
        const descInput = form.querySelector('#form-project-description');
        const statusInput = form.querySelector('#form-project-status');

        if (!title) 
        {
            titleInput.classList.add('input-error');
            isValid = false;
        } 
        else {titleInput.classList.remove('input-error');}

        if (!description) 
        {
            descInput.classList.add('input-error');
            isValid = false;
        } 
        else {descInput.classList.remove('input-error');}

        // status will be "" or null if not selected
        if (!status) 
        { 
            statusInput.classList.add('input-error');
            isValid = false;
        } 
        else {statusInput.classList.remove('input-error');}
        
        // Use the new alert dialog
        if (!isValid) 
        {
            showDashboardAlert('Judul dan deskripsi dokumen harus diisi!', 'Input Tidak Lengkap');
            return;
        }

        // --- If valid, run the old logic from handleNewProject ---
        const newId = projectsData.length > 0 ? Math.max(...projectsData.map(p => p.id)) + 1 : 1;

        const newProject = 
        {
            id: newId,
            title: title,
            description: description,
            status: status, // Already lowercase from <select>
            lastUpdated: 'baru saja',
            citation: [] // Dokumen baru mulai dengan citation kosong
        };

        const currentUser = GLOBAL_OBJECT.getCurrentUser();
        if (currentUser && currentUser.documents) {currentUser.documents.unshift(newProject);}

        renderProjectCards();
        initializeSearch();
        
        // Close the dialog on success
        dialog.close();
    });
}


/**
 * MODIFIED: Updated to call modal injectors and initializers
 */
function initializeDashboard() 
{
    injectDashboardModals(); // <-- ADDED
    renderProjectCards();
    initializeSearch();
    initializeNewProjectModal(); // <-- MODIFIED (was initializeNewProjectButton)
}

if (document.readyState === 'loading') {document.addEventListener('DOMContentLoaded', initializeDashboard);} 
else {initializeDashboard();}