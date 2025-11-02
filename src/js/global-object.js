const globalUsersData = [
    {
        id: 1,
        email: 'john.doe@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        role: 'Student',
        workspace: {
            icon: '🚀',
            name: 'Workspace Saya',
            description: 'Workspace pribadi untuk penelitian akademis'
        },
        createdAt: '2024-01-15',
        lastLogin: '2 jam yang lalu',
        documents: [
            {
                id: 1,
                title: 'Analisis Sistem Informasi Manajemen Berbasis Cloud Computing',
                description: 'Studi implementasi cloud computing dalam sistem informasi manajemen perusahaan.',
                status: 'personal',
                lastUpdated: '2 jam yang lalu',
                citation: [
                    {
                        title: 'Cloud Computing: Principles and Paradigms',
                        authors: 'Rajkumar Buyya, James Broberg, Andrzej Goscinski',
                        publicationYear: 2011,
                        publisher: 'Wiley'
                    },
                    {
                        title: 'Cloud Computing: A Practical Approach',
                        authors: 'John Doe, Jane Smith',
                        publicationYear: 2015,
                        publisher: 'Tech Press'
                    }
                ],
                reviews: [
                    {
                        title: 'Review Metodologi Penelitian',
                        reviewer: 'Dr. Ahmad Subagyo',
                        comment: 'Metodologi penelitian sudah baik, namun perlu penambahan detail pada bagian analisis data. Struktur penulisan rapi dan mudah dipahami.',
                        date: '28 Oktober 2025',
                        status: 'approved'
                    },
                    {
                        title: 'Review Konten dan Substansi',
                        reviewer: 'Prof. Sarah Johnson',
                        comment: 'Konten sangat komprehensif dan mendalam. Referensi yang digunakan relevan dan terkini. Analisis cloud computing dijelaskan dengan sangat baik.',
                        date: '30 Oktober 2025',
                        status: 'approved'
                    }
                ]
            },
            {
                id: 2,
                title: 'Pengaruh Artificial Intelligence terhadap Produktivitas Kerja',
                description: 'Analisis dampak AI dalam meningkatkan efisiensi kerja di era digital.',
                status: 'shared',
                lastUpdated: '5 jam yang lalu',
                citation: [
                    {
                        title: 'AI in Workplace',
                        authors: 'Sarah Johnson',
                        publicationYear: 2020,
                        publisher: 'Tech Publisher'
                    }
                ],
                reviews: [
                    {
                        title: 'Review Awal Draft',
                        reviewer: 'Dr. Michael Chen',
                        comment: 'Draft masih perlu banyak perbaikan. Terutama pada bagian literatur review dan kesimpulan. Perlu penambahan data empiris.',
                        date: '25 Oktober 2025',
                        status: 'pending'
                    }
                ]
            },
            {
                id: 3,
                title: 'Perancangan Aplikasi Mobile untuk Manajemen Dokumen Digital',
                description: 'Pengembangan sistem manajemen dokumen mobile dengan fitur kolaborasi real-time.',
                status: 'personal',
                lastUpdated: '1 hari yang lalu',
                citation: [
                    {
                        title: 'Mobile App Development',
                        authors: 'Michael Chen',
                        publicationYear: 2019,
                        publisher: 'Dev Press'
                    }
                ],
                reviews: [
                    {
                        title: 'Review Implementasi Teknis',
                        reviewer: 'David Lee',
                        comment: 'Implementasi teknis sudah bagus. Arsitektur aplikasi solid dan scalable. Dokumentasi kode perlu ditambahkan.',
                        date: '29 Oktober 2025',
                        status: 'approved'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        email: 'jane.smith@example.com',
        password: 'password456',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        role: 'Lecturer',
        workspace: {
            icon: '💼',
            name: 'Mengajar Webpro',
            description: 'Workspace untuk materi perkuliahan web programming'
        },
        createdAt: '2024-02-20',
        lastLogin: '1 hari yang lalu',
        documents: [
            {
                id: 4,
                title: 'Implementasi Blockchain dalam Sistem Keamanan Data',
                description: 'Kajian teknologi blockchain untuk keamanan data pada sistem informasi kesehatan.',
                status: 'shared',
                lastUpdated: '3 jam yang lalu',
                citation: [
                    {
                        title: 'Blockchain Security',
                        authors: 'David Lee',
                        publicationYear: 2021,
                        publisher: 'Security Press'
                    }
                ],
                reviews: [
                    {
                        title: 'Review Keamanan Sistem',
                        reviewer: 'Prof. Robert Wilson',
                        comment: 'Implementasi blockchain sangat inovatif dan secure. Analisis keamanan komprehensif. Sangat direkomendasikan untuk publikasi.',
                        date: '1 November 2025',
                        status: 'approved'
                    }
                ]
            },
            {
                id: 5,
                title: 'Evaluasi User Experience pada Platform E-Learning',
                description: 'Analisis faktor-faktor yang mempengaruhi efektivitas pembelajaran online.',
                status: 'personal',
                lastUpdated: '2 hari yang lalu',
                citation: [
                    {
                        title: 'UX Design Principles',
                        authors: 'Emily Brown',
                        publicationYear: 2022,
                        publisher: 'Design House'
                    }
                ],
                reviews: [
                    {
                        title: 'Review UX Research',
                        reviewer: 'Dr. Lisa Anderson',
                        comment: 'Penelitian UX sangat detail dan metodologi yang digunakan tepat. Perlu penambahan sampel untuk validitas yang lebih kuat.',
                        date: '31 Oktober 2025',
                        status: 'pending'
                    },
                    {
                        title: 'Review Desain Interface',
                        reviewer: 'John Smith',
                        comment: 'Analisis interface perlu diperdalam. Mockup dan wireframe belum cukup detail untuk implementasi.',
                        date: '27 Oktober 2025',
                        status: 'rejected'
                    }
                ]
            },
            {
                id: 6,
                title: 'Sistem Rekomendasi Berbasis Machine Learning untuk E-Commerce',
                description: 'Pengembangan algoritma rekomendasi produk berdasarkan perilaku pengguna.',
                status: 'shared',
                lastUpdated: '6 jam yang lalu',
                citation: [
                    {
                        title: 'Machine Learning Algorithms',
                        authors: 'Robert Wilson',
                        publicationYear: 2023,
                        publisher: 'ML Press'
                    }
                ],
                reviews: [
                    {
                        title: 'Review Algoritma ML',
                        reviewer: 'Prof. Emily Zhang',
                        comment: 'Algoritma yang dikembangkan sangat efisien dan akurat. Testing comprehensif dengan hasil yang impresif. Publikasi sangat layak.',
                        date: '2 November 2025',
                        status: 'approved'
                    }
                ]
            }
        ]
    }
];

let currentUserId = 2;

function getCurrentUser() {
    return globalUsersData.find(user => user.id === currentUserId);
}

function getCurrentUserDocuments() {
    const user = getCurrentUser();
    return user ? user.documents : [];
}

const GLOBAL_OBJECT = {
    globalUsersData: globalUsersData,
    currentUserId: currentUserId,
    getCurrentUser: getCurrentUser,
    getCurrentUserDocuments: getCurrentUserDocuments,
    setCurrentUser: function(userId) {
        currentUserId = userId;
        this.currentUserId = userId;
    }
}
