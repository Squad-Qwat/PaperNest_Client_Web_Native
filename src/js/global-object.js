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
            name: 'My Research Workspace',
            description: 'Personal workspace for academic research'
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
            name: 'Teaching Materials',
            description: 'Workspace for course materials and research'
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
