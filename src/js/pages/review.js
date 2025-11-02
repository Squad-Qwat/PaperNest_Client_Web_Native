const urlParams = new URLSearchParams(window.location.search);
const selectedDocId = urlParams.get('docId');

const allReviews = [];
const docsData = GLOBAL_OBJECT.getCurrentUserDocuments();
let selectedDoc = null;

docsData.forEach(doc => {
    // kalo ada docId di URL cuma ambil reviews dari dokumen itu
    if (selectedDocId && doc.id != selectedDocId) {
        return;
    }
    
    if (selectedDocId && doc.id == selectedDocId) {
        selectedDoc = doc;
    }
    
    if (doc.reviews && doc.reviews.length > 0) {
        doc.reviews.forEach((review, index) => {
            allReviews.push({
                id: `${doc.id}-${index}`,
                docId: doc.id,
                docTitle: doc.title,
                ...review
            });
        });
    }
});

function renderReviewCards() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;

    let cardsHTML = '';
    
    if (allReviews.length === 0) {
        cardsHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--muted-fg);">
                <i class='bx bx-file' style="font-size: 48px; margin-bottom: 1rem;"></i>
                <p>Belum ada review. Tambahkan review pertama Anda!</p>
            </div>
        `;
    } else {
        allReviews.forEach(review => {
            const statusBadge = review.status ? `<span class="review-status-badge ${review.status}">${review.status}</span>` : '';
            
            cardsHTML += `
                <div class="review-card" data-review-id="${review.id}">
                    <div class="review-card-header">
                        <div class="review-card-content">
                            <h3 class="review-card-title">${review.title || 'Review'}</h3>
                            <p class="review-card-reviewer">Reviewer: ${review.reviewer || 'Anonymous'}</p>
                            <div class="review-card-meta">
                                <span class="review-card-meta-item">
                                    <i class='bx bx-calendar'></i>
                                    ${review.date || new Date().toLocaleDateString('id-ID')}
                                </span>
                                ${statusBadge}
                            </div>
                            ${review.comment ? `<div class="review-card-text">${review.comment}</div>` : ''}
                            <div class="review-card-source">
                                <i class='bx bx-file review-card-source-icon'></i>
                                <div class="review-card-source-text">
                                    Untuk: <span class="review-card-source-title">${review.docTitle}</span>
                                </div>
                            </div>
                        </div>
                        <div class="review-card-actions">
                            <button class="review-card-delete-btn" data-review-id="${review.id}" aria-label="Delete review">
                                <i class='bx bx-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    reviewsList.innerHTML = cardsHTML;


    document.querySelectorAll('.review-card-delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const reviewId = this.getAttribute('data-review-id');
            handleReviewDelete(reviewId);
        });
    });
}

function handleReviewDelete(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (review) {
        const confirmed = confirm(`Apakah Anda yakin ingin menghapus review "${review.title || 'Review'}"?\n\nTindakan ini tidak dapat dibatalkan.`);
        if (confirmed) {
            const index = allReviews.findIndex(r => r.id === reviewId);
            if (index > -1) {
                allReviews.splice(index, 1);
                renderReviewCards();
                initializeSearch();
            }
        }
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('reviewSearch');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterReviews(searchTerm);
        });
    }
}

function filterReviews(searchTerm) {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        const title = card.querySelector('.review-card-title')?.textContent.toLowerCase() || '';
        const reviewer = card.querySelector('.review-card-reviewer')?.textContent.toLowerCase() || '';
        const docTitle = card.querySelector('.review-card-source-title')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || reviewer.includes(searchTerm) || docTitle.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleNewReview() {
    const title = prompt('Masukkan judul review:');
    if (!title || title.trim() === '') {
        alert('Judul review harus diisi!');
        return;
    }
    
    const reviewer = prompt('Masukkan nama reviewer:', GLOBAL_OBJECT.getCurrentUser()?.firstName || 'Anonymous');
    if (!reviewer || reviewer.trim() === '') {
        alert('Nama reviewer harus diisi!');
        return;
    }
    
    const comment = prompt('Masukkan komentar review:');
    if (!comment || comment.trim() === '') {
        alert('Komentar review harus diisi!');
        return;
    }

    const newReview = {
        id: `new-${Date.now()}`,
        docId: 0,
        docTitle: 'Manual Entry',
        title: title.trim(),
        reviewer: reviewer.trim(),
        comment: comment.trim(),
        date: new Date().toLocaleDateString('id-ID'),
        status: 'pending'
    };

    allReviews.unshift(newReview);
    renderReviewCards();
    initializeSearch();
}

function initializeNewReviewButton() {
    const newReviewBtn = document.querySelector('.btn-new-review');
    
    if (newReviewBtn) {
        newReviewBtn.addEventListener('click', handleNewReview);
    }
}

function updatePageTitle() {
    const titleElement = document.querySelector('.review-title');
    const descElement = document.querySelector('.review-description');
    const sectionTitleElement = document.querySelector('.section-title');
    const headerElement = document.querySelector('.review-header');
    
    if (selectedDoc) {
        if (titleElement) {
            titleElement.textContent = `Review - ${selectedDoc.title}`;
        }
        if (descElement) {
            descElement.textContent = `Kelola review untuk dokumen "${selectedDoc.title}"`;
        }
        if (sectionTitleElement) {
            sectionTitleElement.textContent = `Review Dokumen (${allReviews.length})`;
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
            
            // tambahkan html sebelum button "Tambah Review"
            const newReviewBtn = headerElement.querySelector('.btn-new-review');
            if (newReviewBtn) {
                headerElement.insertBefore(backBtn, newReviewBtn);
            }
        }
    } else {
        if (sectionTitleElement) {
            sectionTitleElement.textContent = `Semua Review (${allReviews.length})`;
        }
    }
}

function initializeReview() {
    updatePageTitle();
    renderReviewCards();
    initializeSearch();
    initializeNewReviewButton();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeReview);
} else {
    initializeReview();
}
