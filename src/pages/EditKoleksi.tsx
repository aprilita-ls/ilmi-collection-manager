
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  CheckCircle2,
  FilePenIcon,
  AlertCircle,
  Save,
  ArrowLeft
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
import { getCollectionById, updateCollection } from '@/utils/collectionUtils';

interface FileTypeConfig {
  accept: string;
  maxSize: number; // In bytes
  types: string[];
}

const categoryFileTypes: Record<string, FileTypeConfig> = {
  video: {
    accept: '.mp4',
    maxSize: 1024 * 1024 * 1024, // 1GB
    types: ['video/mp4']
  },
  audio: {
    accept: '.mp3',
    maxSize: 1024 * 1024 * 1024, // 1GB
    types: ['audio/mpeg']
  },
  hadist: {
    accept: '.jpg,.jpeg,.png',
    maxSize: 1024 * 1024 * 1024, // 1GB
    types: ['image/jpeg', 'image/png']
  }
};

const EditKoleksi = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<"video" | "audio" | "hadist">('video');
  const [summary, setSummary] = useState('');
  const [presenter, setPresenter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentFileName, setCurrentFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  
  const { toast } = useToast();

  // Load collection data
  useEffect(() => {
    if (id) {
      const collection = getCollectionById(Number(id));
      
      if (collection) {
        setTitle(collection.title);
        setCategory(collection.category);
        setSummary(collection.summary);
        setPresenter(collection.presenter);
        setCurrentFileName(collection.fileUrl);
      } else {
        setNotFound(true);
        toast({
          title: "Koleksi tidak ditemukan",
          description: "Koleksi yang Anda cari tidak ditemukan.",
          variant: "destructive"
        });
      }
    }
  }, [id, toast]);

  // Update file validation when category changes
  useEffect(() => {
    if (file) {
      validateFile(file);
    }
  }, [category]);

  const validateFile = (file: File): boolean => {
    setFileError(null);
    
    const config = categoryFileTypes[category];
    
    // Check file type
    const mimeType = file.type;
    
    if (!config.types.includes(mimeType)) {
      const allowedExtensions = config.accept.replace(/\./g, '').split(',').join(', ');
      setFileError(`File harus berformat ${allowedExtensions} untuk kategori ${category}`);
      return false;
    }
    
    // Check file size
    if (file.size > config.maxSize) {
      setFileError(`Ukuran file maksimal 1GB. File saat ini: ${(file.size / (1024 * 1024 * 1024)).toFixed(2)}GB`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    // Validation
    if (!title || !category || !summary || !presenter) {
      toast({
        title: "Form tidak lengkap",
        description: "Harap isi semua field yang diperlukan.",
        variant: "destructive"
      });
      return;
    }

    if (file && fileError) {
      toast({
        title: "File tidak valid",
        description: fileError,
        variant: "destructive"
      });
      return;
    }

    // Submit logic
    setIsSubmitting(true);
    
    try {
      // Update collection
      const fileUrl = file ? file.name : currentFileName;
      
      updateCollection(Number(id), {
        title,
        category,
        presenter,
        summary,
        fileUrl
      });
      
      toast({
        title: "Koleksi berhasil diperbarui!",
        description: `${title} telah berhasil diperbarui.`,
      });
      
      // Redirect to the view collections page
      setTimeout(() => {
        navigate('/lihat-koleksi');
      }, 1500);
    } catch (error) {
      toast({
        title: "Gagal memperbarui koleksi",
        description: "Terjadi kesalahan saat memperbarui koleksi.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      } else {
        e.target.value = ''; // Reset input
      }
    }
  };

  const getAcceptedFileTypes = () => {
    return categoryFileTypes[category].accept;
  };

  const getFileTypeDescription = () => {
    switch (category) {
      case 'video':
        return 'Format MP4 (Max 1GB)';
      case 'audio':
        return 'Format MP3 (Max 1GB)';
      case 'hadist':
        return 'Format JPG, PNG (Max 1GB)';
      default:
        return '';
    }
  };

  if (notFound) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Koleksi Tidak Ditemukan</h1>
          <p className="text-gray-500 mb-6">Koleksi yang Anda cari tidak dapat ditemukan.</p>
          <Button onClick={() => navigate('/lihat-koleksi')}>
            Kembali ke Daftar Koleksi
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Edit Koleksi</h1>
            <p className="text-gray-500 mt-1">Perbarui detail koleksi yang sudah ada</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <FilePenIcon className="w-6 h-6 text-daarul-blue" />
          </div>
        </div>
        
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
                  onValueChange={(value) => setCategory(value as "video" | "audio" | "hadist")}
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
                {fileError && (
                  <Alert variant="destructive" className="mb-3 py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">{fileError}</AlertDescription>
                  </Alert>
                )}
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
                        onClick={() => setFile(null)}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </Button>
                    </div>
                  ) : currentFileName ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-sm font-medium">{currentFileName}</p>
                      <p className="text-xs text-gray-500 mt-1">File saat ini</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-blue-500"
                          onClick={() => document.getElementById('fileUpload')?.click()}
                        >
                          Ganti File
                        </Button>
                      </div>
                      <Input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept={getAcceptedFileTypes()}
                      />
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium">Klik untuk upload atau drag and drop</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {getFileTypeDescription()}
                      </span>
                      <Input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept={getAcceptedFileTypes()}
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
                className="px-6 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
              
              <Button 
                type="submit" 
                className="px-6 flex items-center gap-2"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Menyimpan...' : 'Perbarui Koleksi'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditKoleksi;
