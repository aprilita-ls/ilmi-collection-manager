import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  FilterIcon, 
  FilmIcon,
  MusicIcon,
  BookOpenIcon,
  SearchIcon,
  AlertTriangle
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Collection, getCollections, deleteCollection } from '@/utils/collectionUtils';

const LihatKoleksi = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<number | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    const loadedCollections = getCollections();
    setCollections(loadedCollections);
  }, []);

  const handleDeleteClick = (id: number) => {
    setCollectionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (collectionToDelete !== null) {
      deleteCollection(collectionToDelete);
      
      setCollections(collections.filter(collection => collection.id !== collectionToDelete));
      
      toast({
        title: "Koleksi dihapus",
        description: "Koleksi telah berhasil dihapus.",
      });
      
      setDeleteDialogOpen(false);
      setCollectionToDelete(null);
    }
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            collection.presenter.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return collection.category === activeTab && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'video':
        return <FilmIcon className="w-5 h-5 text-blue-500" />;
      case 'audio':
        return <MusicIcon className="w-5 h-5 text-green-500" />;
      case 'hadist':
        return <BookOpenIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'video':
        return 'Video';
      case 'audio':
        return 'Audio';
      case 'hadist':
        return 'Hadist';
      default:
        return '';
    }
  };

  const renderCollectionCard = (collection: Collection) => (
    <Card key={collection.id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getCategoryIcon(collection.category)}
            <span className="text-sm text-gray-500 font-medium">
              {getCategoryLabel(collection.category)}
            </span>
          </div>
          <h3 className="text-lg font-semibold">{collection.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Pemateri: {collection.presenter}
          </p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {collection.summary}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Ditambahkan pada {formatDate(collection.createdAt)}
          </p>
        </div>
        
        <div className="flex md:flex-col justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
            asChild
          >
            <Link to={`/edit-koleksi/${collection.id}`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => handleDeleteClick(collection.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Hapus
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Semua Koleksi</h1>
          <p className="text-gray-500 mt-1">Kelola semua konten yang telah ditambahkan</p>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari koleksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FilterIcon className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab('all')}>
                  Semua Kategori
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab('video')}>
                  <FilmIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Video</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('audio')}>
                  <MusicIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Audio</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('hadist')}>
                  <BookOpenIcon className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>Hadist</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button asChild>
              <Link to="/tambah-koleksi">+ Tambah Koleksi</Link>
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="hadist">Hadist</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredCollections.length > 0 ? (
                filteredCollections.map(renderCollectionCard)
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Tidak ada koleksi yang ditemukan</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredCollections.length > 0 ? (
                filteredCollections.map(renderCollectionCard)
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Tidak ada video yang ditemukan</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredCollections.length > 0 ? (
                filteredCollections.map(renderCollectionCard)
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Tidak ada audio yang ditemukan</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="hadist" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredCollections.length > 0 ? (
                filteredCollections.map(renderCollectionCard)
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Tidak ada hadist yang ditemukan</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto bg-red-100 p-3 rounded-full mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-center">Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Apakah Anda yakin ingin menghapus koleksi ini? 
              <br />
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center justify-center space-x-2">
            <AlertDialogCancel className="border-gray-200">Batal</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600" 
              onClick={handleDeleteConfirm}
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default LihatKoleksi;
