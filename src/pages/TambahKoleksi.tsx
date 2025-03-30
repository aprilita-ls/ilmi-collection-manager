
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FilePenIcon,
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
import { addCollection } from '@/utils/collectionUtils';
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

const TambahKoleksi = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<"video" | "audio" | "hadist">('video');
  const [summary, setSummary] = useState('');
  const [presenter, setPresenter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
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
    
    // Validation
    if (!title || !category || !summary || !presenter || !file) {
      toast({
        title: "Form tidak lengkap",
        description: "Harap isi semua field yang diperlukan.",
        variant: "destructive"
      });
      return;
    }

    if (fileError) {
      toast({
        title: "File tidak valid",
        description: fileError,
        variant: "destructive"
      });
      return;
    }

    // Submit logic
    setIsSubmitting(true);
    
    // Add the collection to storage
    try {
      const fileUrl = URL.createObjectURL(file);
      
      // Add to collection
      addCollection({
        title,
        category,
        presenter,
        summary,
        fileUrl: file.name, // In a real app, we'd use the actual uploaded file URL
      });
      
      toast({
        title: "Koleksi berhasil ditambahkan!",
        description: `${title} telah berhasil ditambahkan ke koleksi.`,
      });
      
      // Reset form
      setTitle('');
      setCategory('video');
      setSummary('');
      setPresenter('');
      setFile(null);
      
      // Redirect to the view collections page
      setTimeout(() => {
        navigate('/lihat-koleksi');
      }, 1500);
    } catch (error) {
      toast({
        title: "Gagal menambahkan koleksi",
        description: "Terjadi kesalahan saat menambahkan koleksi.",
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

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-daarul-blue mb-2">Tambah Koleksi Baru</h1>
            <p className="text-gray-600">Lengkapi informasi untuk menambahkan konten ke koleksi Daarul Ilmi</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-full">
            <FilePenIcon className="w-8 h-8 text-daarul-blue" />
          </div>
        </div>

        {/* Main Form Container */}
        <Card className="p-8 bg-white border-gray-100 shadow-lg rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 w-full">
              {/* Left Column */}
              <div className="space-y-6 w-full">
                <FormField 
                  icon={<TypeIcon className="w-6 h-6 text-daarul-blue" />} 
                  label="Judul Koleksi"
                >
                  <Input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Masukkan judul koleksi" 
                    className="border-gray-300 focus:border-daarul-blue focus:ring-daarul-blue/30"
                  />
                </FormField>
                
                <FormField 
                  icon={<RadioIcon className="w-6 h-6 text-daarul-blue" />} 
                  label="Pilih Kategori"
                >
                  <CategorySelector 
                    value={category} 
                    onChange={setCategory} 
                  />
                </FormField>
                
                <FormField 
                  icon={<UserIcon className="w-6 h-6 text-daarul-blue" />} 
                  label="Nama Pemateri"
                >
                  <Input 
                    value={presenter} 
                    onChange={(e) => setPresenter(e.target.value)} 
                    placeholder="Masukkan nama pemateri" 
                    className="border-gray-300 focus:border-daarul-blue focus:ring-daarul-blue/30"
                  />
                </FormField>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6 w-full">
                <FormField 
                  icon={<FileTextIcon className="w-6 h-6 text-daarul-blue" />} 
                  label="Rangkuman Konten"
                >
                  <Textarea 
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value)} 
                    placeholder="Tuliskan rangkuman singkat tentang koleksi ini" 
                    className="min-h-[180px] border-gray-300 focus:border-daarul-blue focus:ring-daarul-blue/30"
                  />
                </FormField>
                
                <FormField 
                  icon={<Upload className="w-6 h-6 text-daarul-blue" />} 
                  label="Unggah File"
                >
                  <FileUploadField
                    file={file}
                    fileError={fileError}
                    onFileChange={handleFileChange}
                    onFileRemove={() => setFile(null)}
                    acceptTypes={getAcceptedFileTypes()}
                    fileTypeDescription={getFileTypeDescription()}
                  />
                </FormField>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                className="px-12 py-3 text-base rounded-xl bg-gradient-to-r from-daarul-blue to-blue-500 hover:from-blue-500 hover:to-daarul-blue transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Koleksi'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TambahKoleksi;
