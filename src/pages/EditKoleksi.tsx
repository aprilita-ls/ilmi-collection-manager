
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  CheckCircle2,
  ArrowLeft,
  FilePenIcon,
  Save
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Mock data for collections
const mockCollections = [
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
  }
];

const EditKoleksi = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [presenter, setPresenter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch collection data
    setIsLoading(true);
    
    setTimeout(() => {
      const collectionId = parseInt(id || '0');
      const collection = mockCollections.find(c => c.id === collectionId);
      
      if (collection) {
        setTitle(collection.title);
        setCategory(collection.category);
        setSummary(collection.summary);
        setPresenter(collection.presenter);
        setExistingFileName(collection.fileUrl);
      } else {
        toast({
          title: "Koleksi tidak ditemukan",
          description: "Koleksi yang Anda cari tidak ditemukan.",
          variant: "destructive"
        });
        navigate('/lihat-koleksi');
      }
      
      setIsLoading(false);
    }, 800);
  }, [id, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !category || !summary || !presenter) {
      toast({
        title: "Form tidak lengkap",
        description: "Harap isi semua field yang diperlukan.",
        variant: "destructive"
      });
      return;
    }

    // Submit logic
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Show success toast
      toast({
        title: "Koleksi berhasil diperbarui!",
        description: `${title} telah berhasil diperbarui.`,
      });
      
      // Show success alert
      setShowSuccessAlert(true);
      
      // Auto-hide the alert after 5 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExistingFileName('');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/lihat-koleksi')}
                className="p-0 hover:bg-transparent"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
              </Button>
              <h1 className="text-2xl font-bold">Edit Koleksi</h1>
            </div>
            <p className="text-gray-500 mt-1">Perbarui informasi koleksi</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <FilePenIcon className="w-6 h-6 text-daarul-blue" />
          </div>
        </div>
        
        {showSuccessAlert && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Berhasil!</AlertTitle>
            <AlertDescription className="text-green-700">
              Koleksi {title} telah berhasil diperbarui.
            </AlertDescription>
          </Alert>
        )}
        
        <Card className="p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Masukkan judul koleksi" 
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Kategori</Label>
                <RadioGroup 
                  value={category} 
                  onValueChange={setCategory}
                  className="flex flex-wrap gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="cursor-pointer">Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="audio" id="audio" />
                    <Label htmlFor="audio" className="cursor-pointer">Audio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hadist" id="hadist" />
                    <Label htmlFor="hadist" className="cursor-pointer">Hadist</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="summary">Rangkuman</Label>
                <Textarea 
                  id="summary" 
                  value={summary} 
                  onChange={(e) => setSummary(e.target.value)} 
                  placeholder="Masukkan rangkuman singkat tentang koleksi ini" 
                  className="mt-1 min-h-[120px]"
                />
              </div>
              
              <div>
                <Label htmlFor="presenter">Pemateri</Label>
                <Input 
                  id="presenter" 
                  value={presenter} 
                  onChange={(e) => setPresenter(e.target.value)} 
                  placeholder="Masukkan nama pemateri" 
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Upload File</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {file ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setFile(null);
                          setExistingFileName('');
                        }}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </Button>
                    </div>
                  ) : existingFileName ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-sm font-medium">{existingFileName}</p>
                      <p className="text-xs text-gray-500 mt-1">File yang sudah ada</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setExistingFileName('')}
                          className="text-red-500 hover:text-red-700"
                        >
                          Hapus
                        </Button>
                        <label>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="cursor-pointer"
                          >
                            Ganti
                          </Button>
                          <Input 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange}
                            accept=".mp4,.mp3,.png,.jpg,.jpeg"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium">Click to upload or drag and drop</span>
                      <span className="text-xs text-gray-500 mt-1">
                        Support for MP4, MP3, PNG, JPG (Max 50MB)
                      </span>
                      <Input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept=".mp4,.mp3,.png,.jpg,.jpeg"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/lihat-koleksi')}
              >
                Kembali
              </Button>
              
              <Button 
                type="submit" 
                className="px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Memperbarui...' : 'Perbarui Koleksi'}
                {!isSubmitting && <Save className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditKoleksi;
