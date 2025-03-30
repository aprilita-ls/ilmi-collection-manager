
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FilePenIcon,
  Save,
  ArrowLeft,
  TypeIcon,
  UserIcon,
  FileTextIcon,
  RadioIcon,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getCollectionById, updateCollection } from '@/utils/collectionUtils';
import FormField from '@/components/form/FormField';
import FileUploadField from '@/components/form/FileUploadField';
import CategorySelector from '@/components/form/CategorySelector';

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
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-daarul-blue to-blue-600 bg-clip-text text-transparent">Edit Koleksi</h1>
            <p className="text-gray-500 mt-1">Perbarui detail koleksi yang sudah ada</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full shadow-sm">
            <FilePenIcon className="w-6 h-6 text-daarul-blue" />
          </div>
        </div>
        
        <Card className="p-8 border border-gray-200 shadow-lg rounded-xl bg-gradient-to-br from-white to-blue-50">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <FormField 
                  icon={<TypeIcon className="w-5 h-5 text-daarul-blue" />} 
                  label="Judul"
                >
                  <Input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Masukkan judul koleksi" 
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-300"
                  />
                </FormField>
                
                <FormField 
                  icon={<RadioIcon className="w-5 h-5 text-daarul-blue" />} 
                  label="Kategori"
                >
                  <CategorySelector 
                    value={category} 
                    onChange={setCategory} 
                  />
                </FormField>
                
                <FormField 
                  icon={<UserIcon className="w-5 h-5 text-daarul-blue" />} 
                  label="Pemateri"
                >
                  <Input 
                    value={presenter} 
                    onChange={(e) => setPresenter(e.target.value)} 
                    placeholder="Masukkan nama pemateri" 
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-300"
                  />
                </FormField>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <FormField 
                  icon={<FileTextIcon className="w-5 h-5 text-daarul-blue" />} 
                  label="Rangkuman"
                >
                  <Textarea 
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value)} 
                    placeholder="Masukkan rangkuman singkat tentang koleksi ini" 
                    className="min-h-[150px] border-gray-300 focus:border-blue-400 focus:ring-blue-300"
                  />
                </FormField>
                
                <FormField 
                  icon={<Upload className="w-5 h-5 text-daarul-blue" />} 
                  label="Upload File"
                >
                  <FileUploadField
                    file={file}
                    currentFileName={currentFileName}
                    fileError={fileError}
                    onFileChange={handleFileChange}
                    onFileRemove={() => setFile(null)}
                    acceptTypes={getAcceptedFileTypes()}
                    fileTypeDescription={getFileTypeDescription()}
                  />
                </FormField>
              </div>
            </div>
            
            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/lihat-koleksi')}
                className="px-6 flex items-center gap-2 border-gray-300 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
              
              <Button 
                type="submit" 
                className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-daarul-blue to-blue-600 hover:from-blue-600 hover:to-daarul-blue transition-all shadow-md hover:shadow-lg flex items-center gap-2"
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
