const urlParams = new URLSearchParams(window.location.search);
const selectedDocId = urlParams.get('docId');

const allCitations = [];
const docsData = GLOBAL_OBJECT.getCurrentUserDocuments();
let selectedDoc = null;

docsData.forEach(doc => {
    // kalo ada docId di URL cuma ambil citations dari dokumen itu
    if (selectedDocId && doc.id != selectedDocId) {
        return;
    }
    
    if (selectedDocId && doc.id == selectedDocId) {
        selectedDoc = doc;
    }
    
    if (doc.citation && doc.citation.length > 0) {
        doc.citation.forEach((citation, index) => {
            allCitations.push({
                id: `${doc.id}-${index}`,
                docId: doc.id,
                docTitle: doc.title,
                ...citation
            });
        });
    }
});

function renderCitationCards() {
    const citationsList = document.getElementById('citationsList');
    if (!citationsList) return;

    let cardsHTML = '';
    
    allCitations.forEach(citation => {
        cardsHTML += `
            <div class="citation-card" data-citation-id="${citation.id}">
                <div class="citation-card-header">
                    <div class="citation-card-content">
                        <h3 class="citation-card-title">${citation.title}</h3>
                        <p class="citation-card-authors">${citation.authors}</p>
                        <div class="citation-card-meta">
                            <span class="citation-card-meta-item">
                                <i class='bx bx-calendar'></i>
                                ${citation.publicationYear}
                            </span>
                            <span class="citation-card-meta-item">
                                <i class='bx bx-book'></i>
                                ${citation.publisher}
                            </span>
                        </div>
                        <div class="citation-card-source">
                            <i class='bx bx-file citation-card-source-icon'></i>
                            <div class="citation-card-source-text">
                                Dari: <span class="citation-card-source-title">${citation.docTitle}</span>
                            </div>
                        </div>
                    </div>
                    <div class="citation-card-actions">
                        <button class="citation-card-copy-btn" data-citation-id="${citation.id}" aria-label="Copy citation">
                            <span>Salin</span>
                        </button>
                        <button class="citation-card-delete-btn" data-citation-id="${citation.id}" aria-label="Delete citation">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    citationsList.innerHTML = cardsHTML;

    document.querySelectorAll('.citation-card-copy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const citationId = this.getAttribute('data-citation-id');
            handleCitationCopy(citationId);
        });
    });

    document.querySelectorAll('.citation-card-delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const citationId = this.getAttribute('data-citation-id');
            handleCitationDelete(citationId);
        });
    });
}

function handleCitationCopy(citationId) {
    const citation = allCitations.find(c => c.id === citationId);
    if (citation) {
        // Format APA style
        const citationText = `${citation.authors} (${citation.publicationYear}). ${citation.title}. ${citation.publisher}.`;
        
        // Copy ke clipboard
        navigator.clipboard.writeText(citationText).then(() => {
            alert('Sitasi berhasil disalin ke clipboard!\n\n' + citationText);
        }).catch(err => {
            // Fallback jika clipboard tidak berfungsi
            const textarea = document.createElement('textarea');
            textarea.value = citationText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Sitasi berhasil disalin ke clipboard!\n\n' + citationText);
        });
    }
}

function handleCitationDelete(citationId) {
    const citation = allCitations.find(c => c.id === citationId);
    if (citation) {
        const confirmed = confirm(`Apakah Anda yakin ingin menghapus sitasi "${citation.title}"?\n\nTindakan ini tidak dapat dibatalkan.`);
        if (confirmed) {
            const index = allCitations.findIndex(c => c.id === citationId);
            if (index > -1) {
                allCitations.splice(index, 1);
                renderCitationCards();
                initializeSearch();
            }
        }
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('citationSearch');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterCitations(searchTerm);
        });
    }
}

function filterCitations(searchTerm) {
    const citationCards = document.querySelectorAll('.citation-card');
    
    citationCards.forEach(card => {
        const title = card.querySelector('.citation-card-title').textContent.toLowerCase();
        const authors = card.querySelector('.citation-card-authors').textContent.toLowerCase();
        const docTitle = card.querySelector('.citation-card-source-title').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || authors.includes(searchTerm) || docTitle.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleNewCitation() {
    const title = prompt('Masukkan judul publikasi:');
    if (!title || title.trim() === '') {
        alert('Judul publikasi harus diisi!');
        return;
    }
    
    const authors = prompt('Masukkan nama penulis:');
    if (!authors || authors.trim() === '') {
        alert('Nama penulis harus diisi!');
        return;
    }
    
    const year = prompt('Masukkan tahun publikasi:', new Date().getFullYear());
    if (!year || year.trim() === '') {
        alert('Tahun publikasi harus diisi!');
        return;
    }
    
    const publisher = prompt('Masukkan penerbit:');
    if (!publisher || publisher.trim() === '') {
        alert('Penerbit harus diisi!');
        return;
    }

    const newCitation = {
        id: `new-${Date.now()}`,
        docId: 0,
        docTitle: 'Manual Entry',
        title: title.trim(),
        authors: authors.trim(),
        publicationYear: parseInt(year),
        publisher: publisher.trim()
    };

    allCitations.unshift(newCitation);
    renderCitationCards();
    initializeSearch();
}

function initializeNewCitationButton() {
    const newCitationBtn = document.querySelector('.btn-new-citation');
    
    if (newCitationBtn) {
        newCitationBtn.addEventListener('click', handleNewCitation);
    }
}

function updatePageTitle() {
    const titleElement = document.querySelector('.citation-title');
    const descElement = document.querySelector('.citation-description');
    const sectionTitleElement = document.querySelector('.section-title');
    const headerElement = document.querySelector('.citation-header');
    
    if (selectedDoc) {
        if (titleElement) {
            titleElement.textContent = `Citations - ${selectedDoc.title}`;
        }
        if (descElement) {
            descElement.textContent = `Kelola sitasi untuk dokumen "${selectedDoc.title}"`;
        }
        if (sectionTitleElement) {
            sectionTitleElement.textContent = `Sitasi Dokumen (${allCitations.length})`;
        }
        
        // add tombol back ke dashboard jika belum ada
        if (headerElement && !headerElement.querySelector('.btn-back-dashboard')) {
            const backBtn = document.createElement('button');
            backBtn.className = 'btn-back-dashboard';
            backBtn.innerHTML = `
                <i class='bx bx-arrow-left'></i>
                <span>Kembali</span>
            `;
            backBtn.onclick = () => {
                window.location.href = '../dashboard/index.html';
            };
            
            // tambahkan html sebelum button "Tambah Sitasi"
            const newCitationBtn = headerElement.querySelector('.btn-new-citation');
            if (newCitationBtn) {
                headerElement.insertBefore(backBtn, newCitationBtn);
            }
        }
    } else {
        if (sectionTitleElement) {
            sectionTitleElement.textContent = `Semua Sitasi (${allCitations.length})`;
        }
    }
}

function initializeCitation() {
    updatePageTitle();
    renderCitationCards();
    initializeSearch();
    initializeNewCitationButton();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCitation);
} else {
    initializeCitation();
}