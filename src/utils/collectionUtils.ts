
// Collection data types
export interface Collection {
  id: number;
  title: string;
  category: "video" | "audio" | "hadist";
  presenter: string;
  summary: string;
  fileUrl: string;
  createdAt: string;
}

// Initial collection data
const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 1,
    title: "Dasar-dasar Fiqih untuk Pemula",
    category: "video",
    presenter: "Ustadz Ahmad Firdaus",
    summary: "Pengenalan dasar hukum Islam untuk pemula dengan pendekatan praktis",
    fileUrl: "video1.mp4",
    createdAt: "2023-03-15T08:30:00",
  },
  {
    id: 2,
    title: "Kajian Hadits Arba'in An-Nawawi",
    category: "audio",
    presenter: "Ustadz Muhammad Rizki",
    summary: "Pembahasan lengkap tentang 40 hadits pilihan dalam kitab Arba'in An-Nawawi",
    fileUrl: "audio1.mp3",
    createdAt: "2023-03-17T10:15:00",
  },
  {
    id: 3,
    title: "Shahih Bukhari: Hadits ke-1",
    category: "hadist",
    presenter: "Ustadz Zainuddin",
    summary: "Penjelasan mendetail tentang hadits pertama dalam kitab Shahih Bukhari",
    fileUrl: "hadist1.txt",
    createdAt: "2023-03-19T09:45:00",
  },
  {
    id: 4,
    title: "Sirah Nabawiyah: Kelahiran Rasulullah",
    category: "video",
    presenter: "Ustadzah Fatimah",
    summary: "Kisah detil tentang kelahiran dan masa kecil Rasulullah SAW",
    fileUrl: "video2.mp4",
    createdAt: "2023-03-20T14:30:00",
  },
  {
    id: 5,
    title: "Tafsir Surah Al-Fatihah",
    category: "audio",
    presenter: "Ustadz Abdullah",
    summary: "Pembahasan mendalam tentang makna dan tafsir surah Al-Fatihah",
    fileUrl: "audio2.mp3",
    createdAt: "2023-03-22T16:00:00",
  },
  {
    id: 6,
    title: "Shahih Muslim: Hadits Pilihan",
    category: "hadist",
    presenter: "Ustadz Hasan",
    summary: "Kumpulan hadits-hadits pilihan dari kitab Shahih Muslim dengan penjelasan",
    fileUrl: "hadist2.txt",
    createdAt: "2023-03-25T11:30:00",
  },
];

// Get collections from localStorage or use initial data if not available
export const getCollections = (): Collection[] => {
  const storedCollections = localStorage.getItem('collections');
  if (storedCollections) {
    return JSON.parse(storedCollections);
  }
  
  // If no collections in localStorage, initialize with default data
  localStorage.setItem('collections', JSON.stringify(INITIAL_COLLECTIONS));
  return INITIAL_COLLECTIONS;
};

// Save collections to localStorage
export const saveCollections = (collections: Collection[]): void => {
  localStorage.setItem('collections', JSON.stringify(collections));
};

// Add a new collection
export const addCollection = (collection: Omit<Collection, 'id' | 'createdAt'>): Collection => {
  const collections = getCollections();
  
  // Generate a new ID (max ID + 1)
  const newId = collections.length > 0 
    ? Math.max(...collections.map(c => c.id)) + 1 
    : 1;
  
  const newCollection: Collection = {
    ...collection,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  
  collections.push(newCollection);
  saveCollections(collections);
  
  return newCollection;
};

// Delete a collection by ID
export const deleteCollection = (id: number): void => {
  const collections = getCollections();
  const updatedCollections = collections.filter(c => c.id !== id);
  saveCollections(updatedCollections);
};

// Update a collection
export const updateCollection = (id: number, updates: Partial<Omit<Collection, 'id' | 'createdAt'>>): Collection | null => {
  const collections = getCollections();
  const index = collections.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  collections[index] = {
    ...collections[index],
    ...updates,
  };
  
  saveCollections(collections);
  return collections[index];
};

// Get a collection by ID
export const getCollectionById = (id: number): Collection | undefined => {
  const collections = getCollections();
  return collections.find(c => c.id === id);
};
