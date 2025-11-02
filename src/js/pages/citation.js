/* ========================================================================
   BAGIAN 1: FUNGSI DIALOG KUSTOM
   Bagian ini membuat dan mengelola dialog kustom untuk alert, confirm,
   dan formulir tambah sitasi.
======================================================================== */

/**
 * Menyuntikkan HTML untuk modal ke dalam dokumen.
 * Dijalankan sekali saat DOM dimuat.
 * CSS (dialog-styles.css) DIHARAPKAN SUDAH TERMASUK DALAM file citation.css
 */
function injectModalHTML() 
{
    // 1. Buat HTML untuk semua dialog
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
    <dialog id="alert-dialog">
       </dialog>
    <dialog id="confirm-dialog">
       </dialog>

    <dialog id="add-citation-dialog">
        <h3>Tambah Sitasi Baru</h3>
        <form id="add-citation-form">
        
            <div class="form-group">
                <label for="citation-type">Jenis Sitasi<span>*</span></label>
                <select id="citation-type" name="citationType" required>
                    <option value="None">None</option>
                    <optgroup label="General citation sources">
                        <option value="Buku">Buku</option>
                        <option value="Web">Web</option>
                    </optgroup>
                    <optgroup label="Scientific citation sources">
                        <option value="Jurnal">Jurnal</option>
                        <option value="Tesis">Tesis</option>
                        <option value="Makalah">Makalah</option>
                    </optgroup>
                </select>
            </div>

            <div class="form-group hidden" data-form-type="Buku Jurnal Web Tesis Makalah">
                <label for="form-penulis">Penulis<span>*</span></label>
                <input type="text" id="form-penulis" name="Penulis" placeholder="Masukkan nama penulis" required />
            </div>
            
            <div class="form-group hidden" data-form-type="Buku Jurnal Web Tesis Makalah">
                <label for="form-tahun">Tahun Publikasi<span>*</span></label>
                <input type="text" id="form-tahun" name="Tahun" placeholder="YYYY" required />
            </div>
            
            <div class="form-group hidden" data-form-type="Buku Jurnal Web Tesis Makalah">
                <label for="form-judul">Judul<span>*</span></label>
                <input type="text" id="form-judul" name="Judul" placeholder="Masukkan judul" required />
            </div>

            <div class="form-group hidden" data-form-type="Buku Tesis Makalah">
                <label for="form-penerbit">Penerbit<span>*</span></label>
                <input type="text" id="form-penerbit" name="Penerbit" placeholder="Masukkan penerbit" required />
            </div>

            <div class="form-group hidden" data-form-type="Buku Jurnal Makalah">
                <label for="form-halaman">Halaman<span>*</span></label>
                <input type="text" id="form-halaman" name="Halaman" placeholder="Masukkan halaman" required />
            </div>

            <div class="form-group hidden" data-form-type="Jurnal Tesis Makalah">
                <label for="form-doi-url">DOI/URL (Opsional)</label>
                <input type="text" id="form-doi-url" name="DOIoURL" placeholder="Masukkan DOI/ URL" />
            </div>

            <div class="form-group hidden" data-form-type="Jurnal Makalah">
                <label for="form-informasi-jurnal">Informasi Jurnal/Makalah<span>*</span></label>
                <input type="text" id="form-informasi-jurnal" name="Informasi" placeholder="Nama Jurnal, ISBN, dsb." required/>
            </div>

            <div class="form-group hidden" data-form-type="Buku">
                <label for="form-lokasi">Lokasi diterbitkannya buku<span>*</span></label>
                <input type="text" id="form-lokasi" name="Lokasi" placeholder="Masukkan lokasi penerbit" required />
            </div>

            <div class="form-group hidden" data-form-type="Buku">
                <label for="form-bab">BAB (Opsional)</label>
                <input type="text" id="form-bab" name="Bab" placeholder="Masukkan bab" />
            </div>
            <div class="form-group hidden" data-form-type="Buku">
                <label for="form-penyusun">Penyusun (Opsional)</label>
                <input type="text" id="form-penyusun" name="Penyusun" placeholder="Masukkan penyusun" />
            </div>
            <div class="form-group hidden" data-form-type="Buku">
                <label for="form-edisi">Edisi (Opsional)</label>
                <input type="text" id="form-edisi" name="Edisi" placeholder="Masukkan edisi" />
            </div>

            <div class="form-group hidden" data-form-type="Buku">
                <label for="form-url-buku">URL (Opsional)</label>
                <input type="text" id="form-url-buku" name="URL" placeholder="Masukkan URL" />
            </div>

            <div class="form-group hidden" data-form-type="Jurnal">
                <label for="form-volume">Volume<span>*</span></label>
                <input type="text" id="form-volume" name="Volume" placeholder="Masukkan Volume" required />
            </div>

            <div class="form-group hidden" data-form-type="Jurnal Makalah">
                <label for="form-nomor">Nomor<span>*</span></label>
                <input type="text" id="form-nomor" name="Nomor" placeholder="Masukkan Nomor" required />
            </div>

            <div class="form-group hidden" data-form-type="Web"> <label for="form-url-web">URL <span>*</span></label>
                <input type="text" id="form-url-web" name="URL" placeholder="Masukkan URL" required/>
            </div>

            <div class="form-group hidden" data-form-type="Web">
                <label for="form-nama-web">Nama Situs<span>*</span></label>
                <input type="text" id="form-nama-web" name="NamaSitus" placeholder="Nama situs web" required/>
            </div>

            <div class="form-group hidden" data-form-type="Web">
              <label for="form-web-tanggal">Tanggal akses<span>*</span></label>
              <input type="text" id="form-web-tanggal" name="TanggalAkses" placeholder="Masukkan Tanggal Akses" required />
            </div>

            <div class="form-group hidden" data-form-type="Tesis">
                <label for="form-nomor-publikasi">Nomor Publikasi (Opsional)</label>
                <input type="text" id="form-nomor-publikasi" name="Publikasi" placeholder="Masukkan Nomor Publikasi" />
            </div>

            <div class="form-group hidden" data-form-type="Tesis">
                <label for="form-informasi-tesis">Informasi<span>*</span></label>
                <select id="form-informasi-tesis" name="Informasi" required>
                    <option value="" disabled selected hidden>Masukkan Informasi (Tesis/ Disertasi)</option>
                    <option value="Tesis">Tesis</option>
                    <option value="Disertasi">Disertasi</option>
                </select>
            </div>

            <div class="form-group hidden" data-form-type="Tesis">
                <label for="form-universitas">Universitas<span>*</span></label>
                <input type="text" id="form-universitas" name="Universitas" placeholder="Masukkan Nama Universitas" required/>
            </div>
            
            <div class="dialog-actions">
                <button type="button" id="add-citation-cancel-btn" class="btn-secondary">Batal</button>
                <button type="submit" class="btn-primary">Kumpulkan</button>
            </div>
        </form>
    </dialog>
    `;
    document.body.appendChild(modalContainer);
}
  
/**
 * Menampilkan dialog alert kustom.
 * @param {string} message - Pesan yang akan ditampilkan.
 */
function showCustomAlert(message) 
{
    const dialog = document.getElementById('alert-dialog');
    const messageEl = document.getElementById('alert-message');
    const okBtn = document.getElementById('alert-ok-btn');

    messageEl.textContent = message;
    dialog.showModal();

    // Hanya perlu satu event listener, hapus yang lama jika ada
    okBtn.onclick = () => dialog.close();
}


/**
 * Menampilkan dialog konfirmasi kustom.
 * @param {string} message - Pertanyaan konfirmasi.
 * @returns {Promise<boolean>} - Resolve true jika OK, false jika Batal, dan Reject apabila dialog tidak ditemukan.
 */
function showCustomConfirm(message) {
    const dialog = document.getElementById('confirm-dialog');
    
    // Pengecekan error jika elemen dialog tidak ada
    if (!dialog) {return Promise.reject(new Error("Elemen dialog 'confirm-dialog' tidak ditemukan."));}

    const messageEl = document.getElementById('confirm-message');
    const okBtn = document.getElementById('confirm-ok-btn');
    const cancelBtn = document.getElementById('confirm-cancel-btn');

    // Pengecekan error jika komponen di dalam dialog tidak ada
    if (!messageEl || !okBtn || !cancelBtn) {return Promise.reject(new Error("Komponen di dalam 'confirm-dialog' tidak lengkap."));}

    messageEl.textContent = message;
    dialog.showModal();

    return new Promise((resolve) => 
    {
        // Hanya perlu satu event listener, hapus yang lama jika ada
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
  
/* ========================================================================
    BAGIAN 2: LOGIKA INTI SITASI (dari citation.js)
    Logika ini diambil dari file citation.js asli Anda,
    tetapi dimodifikasi untuk menggunakan dialog kustom.
======================================================================== */
    
// --- Variabel Global (dari citation.js) ---
const urlParams = new URLSearchParams(window.location.search);
const selectedDocId = urlParams.get('docId');

const allCitations = [];
// Asumsi GLOBAL_OBJECT ada di scope global dan dimuat oleh index.html
const docsData = GLOBAL_OBJECT.getCurrentUserDocuments();
let selectedDoc = null;

docsData.forEach(doc => 
{
    if (selectedDocId && doc.id != selectedDocId) {return;}
    if (selectedDocId && doc.id == selectedDocId) {selectedDoc = doc;}
    if (doc.citation && doc.citation.length > 0) 
    {
        doc.citation.forEach((citation, index) => 
        {
            allCitations.push(
            {
                id: `${doc.id}-${index}`,
                docId: doc.id,
                docTitle: doc.title,
                ...citation
            });
        });
    }
});
  
// --- Fungsi Render (dari citation.js) ---
function renderCitationCards() 
{
    const citationsList = document.getElementById('citationsList');

    // if(citationsList){something}
    if (!citationsList) {return;}

    let cardsHTML = '';
    
    allCitations.forEach(citation => 
    {
        // Logika untuk menampilkan publisher (disesuaikan dari skrip lama)
        let displayPublisher = citation.publisher;
        if (!displayPublisher) 
        {
            if (citation.type === 'Jurnal') {displayPublisher = citation.Informasi;}
            else if (citation.type === 'Web') {displayPublisher = citation.NamaSitus;}
            else displayPublisher = 'N/A';
        }

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
                                ${displayPublisher}
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

    // Atur ulang event listener setelah render
    document.querySelectorAll('.citation-card-copy-btn').forEach(btn => 
    {
        btn.addEventListener('click', function(e) 
        {
            const citationId = this.getAttribute('data-citation-id');
            handleCitationCopy(citationId);
        });
    });

    document.querySelectorAll('.citation-card-delete-btn').forEach(btn => 
    {
        btn.addEventListener('click', function(e) 
        {
            const citationId = this.getAttribute('data-citation-id');
            handleCitationDelete(citationId);
        });
    });
}
  
/**
 * MODIFIKASI: Menggunakan showCustomAlert()
 */
function handleCitationCopy(citationId) 
{
    const citation = allCitations.find(c => c.id === citationId);
    // if(citation){something}
    if (!citation) {return;}
    
    let isSuccessful;
    let resultOutput = (isSuccessful === true) ? "Citation copy success": "Citation copy failure";

    // Logika untuk menampilkan publisher (disesuaikan dari skrip lama)
    let displayPublisher = citation.publisher;
    if (!displayPublisher) 
    {
        if (citation.type === 'Jurnal') {displayPublisher = citation.Informasi;}
        else if (citation.type === 'Web') {displayPublisher = citation.NamaSitus;}
        else {displayPublisher = 'N/A';}
    }
    
    const citationText = `${citation.authors} (${citation.publicationYear}). ${citation.title}. ${displayPublisher}.`;
    
    navigator.clipboard.writeText(citationText)
    .then(() => 
    {
        showCustomAlert('Sitasi berhasil disalin ke clipboard!\n\n' + citationText);
        isSuccessful = true;
    })
    .catch(() => 
    {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = citationText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCustomAlert('Sitasi berhasil disalin ke clipboard!\n\n' + citationText);
        isSuccessful = false;
    })
    .finally(() => console.log(resultOutput));
}

/**
 * MODIFIKASI: Menjadi async dan menggunakan showCustomConfirm()
 */
async function handleCitationDelete(citationId) 
{
    const citation = allCitations.find(c => c.id === citationId);
    // if(ciation){something}
    if (!citation) {return;}
    
    const confirmed = await showCustomConfirm(`Apakah Anda yakin ingin menghapus sitasi "${citation.title}"?
        \n\nTindakan ini tidak dapat dibatalkan.`);

    // if(confirmed){something}
    if (!confirmed) {return;}

    const index = allCitations.findIndex(c => c.id === citationId);

    // if(index > -1){something}
    if (index <= -1) {return;}

    allCitations.splice(index, 1);
    renderCitationCards();
    initializeSearch();
}
  
// --- Fungsi Search & Update (dari citation.js) ---
function initializeSearch() 
{
    const searchInput = document.getElementById('citationSearch');
    // if(searchInput){something}
    if (!searchInput) {return;}

    searchInput.addEventListener('input', function(e) 
    {
        const searchTerm = e.target.value.toLowerCase();
        filterCitations(searchTerm);
    });
}
  
function filterCitations(searchTerm) 
{
    const citationCards = document.querySelectorAll('.citation-card');
    citationCards.forEach(card => 
    {
        const title = card.querySelector('.citation-card-title').textContent.toLowerCase();
        const authors = card.querySelector('.citation-card-authors').textContent.toLowerCase();
        const docTitle = card.querySelector('.citation-card-source-title').textContent.toLowerCase();

        if (title.includes(searchTerm) || authors.includes(searchTerm) || docTitle.includes(searchTerm)) 
        {card.style.display = 'block';} 
        else {card.style.display = 'none';}
    });
}
  
function updatePageTitle() 
{
    // ... (Fungsi ini tidak diubah, salin dari citation.js asli)
    const titleElement = document.querySelector('.citation-title');
    const descElement = document.querySelector('.citation-description');
    const sectionTitleElement = document.querySelector('.section-title');
    const headerElement = document.querySelector('.citation-header');
    
    if (selectedDoc) 
    {
        if (titleElement) {titleElement.textContent = `Citations - ${selectedDoc.title}`;}
        if (descElement) {descElement.textContent = `Kelola sitasi untuk dokumen "${selectedDoc.title}"`;}
        if (sectionTitleElement) {sectionTitleElement.textContent = `Sitasi Dokumen (${allCitations.length})`;}
        
        // if(headerElement && !headerElement.querySelector('.btn-back-dashboard')){something}
        if (!headerElement || headerElement.querySelector('.btn-back-dashboard')) {return;}
        
        const backBtn = document.createElement('button');
        backBtn.className = 'btn-back-dashboard';
        backBtn.innerHTML = `
            <i class='bx bx-arrow-left'></i>
            <span>Kembali</span>
        `;

        // Path ini diasumsikan benar berdasarkan struktur file Anda
        backBtn.onclick = () => window.location.href = '../dashboard/index.html'; 
        
        const newCitationBtn = headerElement.querySelector('.btn-new-citation');
        if (newCitationBtn) {headerElement.insertBefore(backBtn, newCitationBtn);}
    } 
    else {if (sectionTitleElement) {sectionTitleElement.textContent = `Semua Sitasi (${allCitations.length})`;}}
}
  
  
/* ========================================================================
    BAGIAN 3: LOGIKA MODAL BARU (Pengganti handleNewCitation)
    Logika ini mengelola pembukaan, penggantian formulir (dropdown),
    dan submit dialog tambah sitasi.
======================================================================== */

/**
 * Menangani UUID.
 * Membuat dan memverifikasi UUID.
 */
function generateUUID() 
{
    // standar API browser modern untuk ID unik
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, 
    function(c) 
    {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//Menggunakan Array.prototype.some() untuk memeriksa keberadaan ID
function isUUIDUnique(uuid) {return !allCitations.some(citation => citation.id === uuid);}

/**
 * Menangani submit formulir modal.
 * Mengambil data, memvalidasi, dan memetakan ke format sitasi sederhana.
 */
function handleModalFormSubmit(event) 
{
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const citationType = data.citationType;
    let publisher;
    let rawData = { ...data }; // Salin semua data formulir
  
    // Memetakan 'publisher' berdasarkan jenis sitasi
    // Ini adalah kompromi agar sesuai dengan model data sederhana Anda
    switch (citationType) 
    {
        case 'Buku':
        case 'Tesis':
        case 'Makalah':
            publisher = data.Penerbit;
            break;
        case 'Jurnal':
            publisher = data.Informasi; // Menggunakan nama jurnal sebagai 'publisher'
            break;
        case 'Web':
            publisher = data.NamaSitus; // Menggunakan nama situs sebagai 'publisher'
            break;
        default:
            publisher = 'N/A';
    }
  
    // Validasi sederhana
    const title = data.Judul;
    const authors = data.Penulis;
    const year = data.Tahun;
  
    let isValid = true;
    form.querySelectorAll('input[required], select[required]').forEach(input => 
    {
        if (!input.disabled && !input.value) 
        {
            input.classList.add('input-error');
            isValid = false;
        } 
        else if (!input.disabled) {input.classList.remove('input-error');}
    });
  
    if (!isValid) 
    {
      showCustomAlert('Harap isi semua bidang yang wajib (*).');
      return;
    }

    // Pengecekan UUID dengan jenis loop 'repeat-until'
    let newUuid;
    do {newUuid = generateUUID();} while (!isUUIDUnique(newUuid)); // Ulangi selama ID yang dihasilkan tidak unik
  
    // Buat objek sitasi baru (sesuai format citation.js)
    const newCitation = 
    {
        id: `new-${newUuid}`, //Untuk mengganti Date.now()
        docId: selectedDocId || 0, // Gunakan docId yang dipilih atau 0
        docTitle: selectedDoc ? selectedDoc.title : 'Manual Entry',
        title: title.trim(),
        authors: authors.trim(),
        publicationYear: parseInt(year),
        publisher: publisher ? publisher.trim() : 'N/A',
        type: citationType, // Simpan tipe untuk referensi
        ...rawData // Simpan semua data mentah jika diperlukan nanti
    };
  
    // Tambahkan ke daftar, render ulang, dan tutup modal
    allCitations.unshift(newCitation);
    renderCitationCards();
    initializeSearch(); // Perbarui jumlah di judul jika perlu
    updatePageTitle(); 
    deinitializeModals();
}
  
/**
 * Memperbarui field formulir yang terlihat berdasarkan dropdown.
 * @param {string} selectedType - Nilai dari dropdown (Buku, Jurnal, dll.)
 */
function updateFormVisibility(selectedType) 
{
    const formGroups = document.querySelectorAll('#add-citation-form .form-group[data-form-type]');

    formGroups.forEach(group => 
    {
        const types = group.getAttribute('data-form-type').split(' ');
        const input = group.querySelector('input, select');
        
        if (types.includes(selectedType)) 
        {
            // Tampilkan grup dan aktifkan input
            group.classList.remove('hidden');
            // if (input) {something}
            if (!input) {return;}
            input.disabled = false;
        } 
        else 
        {
            // Sembunyikan grup dan nonaktifkan input
            group.classList.add('hidden');
            // if (input){something}
            if (!input) {return;}
            input.disabled = true;
            // Hapus error jika ada saat disembunyikan
            input.classList.remove('input-error'); 
        }
    });
}

/* 
Pastikan field umum (Penulis, Tahun, Judul) selalu required
(Berubah karena ada pilihan 'None' yang mewajibkan penghilangan semua field tersebut)
document.querySelectorAll('.form-group[data-form-type*="Buku Jurnal"]').forEach(g => 
{
    const input = g.querySelector('input');
    -> if(input){something}
    if (!input) {return;}
    input.required = true;
});
*/
  
/**
 * Menginisialisasi semua event listener untuk dialog.
 * Menggantikan `initializeNewCitationButton`.
 */
function initializeModals() 
{
    const newCitationBtn = document.querySelector('.btn-new-citation');
    const dialog = document.getElementById('add-citation-dialog');
    const form = document.getElementById('add-citation-form');
    const cancelBtn = document.getElementById('add-citation-cancel-btn');
    const typeSelect = document.getElementById('citation-type');

    // if (newCitationBtn && dialog && form && cancelBtn && typeSelect) {something}
    if (!newCitationBtn || !dialog || !form || !cancelBtn || !typeSelect) {return;}

    // 1. Buka modal saat tombol "Tambah Sitasi" diklik
    newCitationBtn.addEventListener('click', () => 
    {
        form.reset();
        // Hapus semua error class sebelum dibuka
        form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        updateFormVisibility('None'); // Reset ke tampilan default
        dialog.showModal();
    });

    // 2. Tutup modal saat tombol "Batal" diklik
    cancelBtn.addEventListener('click', () => dialog.close());

    // 3. Ubah formulir saat dropdown diganti
    typeSelect.addEventListener('change', (e) => updateFormVisibility(e.target.value));

    // 4. Tangani submit formulir
    form.addEventListener('submit', handleModalFormSubmit);
}

function deinitializeModals()
{
    const form = event.target;
    document.getElementById('add-citation-dialog').close();
    form.reset();

    // Panggil lagi untuk mereset tampilan form ke default (None)
    updateFormVisibility('None');
    document.getElementById('citation-type').value = "None";
}
  
/* ========================================================================
    BAGIAN 4: INISIALISASI UTAMA
======================================================================== */

function initializeCitation() 
{
    injectModalHTML(); // Suntikkan HTML modal terlebih dahulu
    updatePageTitle();
    renderCitationCards();
    initializeSearch();
    initializeModals(); // Inisialisasi listener untuk modal
}

// Jalankan saat dokumen siap
if (document.readyState === 'loading') {document.addEventListener('DOMContentLoaded', initializeCitation);} 
else {initializeCitation();}

/*
Original code:
const urlParams = new URLSearchParams(window.location.search);
const selectedDocId = urlParams.get('docId');

const allCitations = [];
const docsData = GLOBAL_OBJECT.getCurrentUserDocuments();
let selectedDoc = null;

docsData.forEach(doc => {
    -> Jika ada docId di URL cuma ambil citations dari dokumen itu
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
        
        -> add tombol back ke dashboard jika belum ada
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
            
            -> tambahkan html sebelum button "Tambah Sitasi"
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
*/