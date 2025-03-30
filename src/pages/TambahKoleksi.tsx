
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
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-daarul-blue to-blue-600 bg-clip-text text-transparent">Tambah Koleksi</h1>
            <p className="text-gray-500 mt-1">Tambahkan video, audio, atau hadist baru ke koleksi Daarul Ilmi</p>
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
                    fileError={fileError}
                    onFileChange={handleFileChange}
                    onFileRemove={() => setFile(null)}
                    acceptTypes={getAcceptedFileTypes()}
                    fileTypeDescription={getFileTypeDescription()}
                  />
                </FormField>
              </div>
            </div>
            
            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="px-10 py-2.5 rounded-lg bg-gradient-to-r from-daarul-blue to-blue-600 hover:from-blue-600 hover:to-daarul-blue transition-all shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Koleksi'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TambahKoleksi;
