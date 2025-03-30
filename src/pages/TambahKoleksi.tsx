
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  CheckCircle2,
  FilePenIcon,
  AlertCircle,
  TypeIcon,
  UserIcon,
  FileTextIcon,
  RadioIcon,
  LayoutGridIcon
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { addCollection } from '@/utils/collectionUtils';

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
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-105 transition-transform">
                      <TypeIcon className="w-5 h-5 text-daarul-blue" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="title" className="text-base font-medium">Judul</Label>
                      <Input 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Masukkan judul koleksi" 
                        className="mt-2 border-gray-300 focus:border-blue-400 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-105 transition-transform">
                      <RadioIcon className="w-5 h-5 text-daarul-blue" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base font-medium">Kategori</Label>
                      <RadioGroup 
                        value={category} 
                        onValueChange={(value) => setCategory(value as "video" | "audio" | "hadist")}
                        className="grid grid-cols-3 gap-3 mt-3"
                      >
                        <div className={`flex flex-col items-center p-4 border ${category === 'video' ? 'border-daarul-blue bg-blue-50' : 'border-gray-200'} rounded-xl hover:bg-blue-50 transition-colors cursor-pointer`}>
                          <RadioGroupItem value="video" id="video" className="text-daarul-blue sr-only" />
                          <Label htmlFor="video" className="cursor-pointer text-center">
                            <LayoutGridIcon className={`w-10 h-10 mx-auto mb-2 ${category === 'video' ? 'text-daarul-blue' : 'text-gray-400'}`} />
                            <span className={`font-medium ${category === 'video' ? 'text-daarul-blue' : 'text-gray-600'}`}>Video</span>
                          </Label>
                        </div>
                        <div className={`flex flex-col items-center p-4 border ${category === 'audio' ? 'border-daarul-blue bg-blue-50' : 'border-gray-200'} rounded-xl hover:bg-blue-50 transition-colors cursor-pointer`}>
                          <RadioGroupItem value="audio" id="audio" className="text-daarul-blue sr-only" />
                          <Label htmlFor="audio" className="cursor-pointer text-center">
                            <RadioIcon className={`w-10 h-10 mx-auto mb-2 ${category === 'audio' ? 'text-daarul-blue' : 'text-gray-400'}`} />
                            <span className={`font-medium ${category === 'audio' ? 'text-daarul-blue' : 'text-gray-600'}`}>Audio</span>
                          </Label>
                        </div>
                        <div className={`flex flex-col items-center p-4 border ${category === 'hadist' ? 'border-daarul-blue bg-blue-50' : 'border-gray-200'} rounded-xl hover:bg-blue-50 transition-colors cursor-pointer`}>
                          <RadioGroupItem value="hadist" id="hadist" className="text-daarul-blue sr-only" />
                          <Label htmlFor="hadist" className="cursor-pointer text-center">
                            <FileTextIcon className={`w-10 h-10 mx-auto mb-2 ${category === 'hadist' ? 'text-daarul-blue' : 'text-gray-400'}`} />
                            <span className={`font-medium ${category === 'hadist' ? 'text-daarul-blue' : 'text-gray-600'}`}>Hadist</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-105 transition-transform">
                      <UserIcon className="w-5 h-5 text-daarul-blue" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="presenter" className="text-base font-medium">Pemateri</Label>
                      <Input 
                        id="presenter" 
                        value={presenter} 
                        onChange={(e) => setPresenter(e.target.value)} 
                        placeholder="Masukkan nama pemateri" 
                        className="mt-2 border-gray-300 focus:border-blue-400 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-105 transition-transform">
                      <FileTextIcon className="w-5 h-5 text-daarul-blue" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="summary" className="text-base font-medium">Rangkuman</Label>
                      <Textarea 
                        id="summary" 
                        value={summary} 
                        onChange={(e) => setSummary(e.target.value)} 
                        placeholder="Masukkan rangkuman singkat tentang koleksi ini" 
                        className="mt-2 min-h-[150px] border-gray-300 focus:border-blue-400 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-105 transition-transform">
                      <Upload className="w-5 h-5 text-daarul-blue" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base font-medium">Upload File</Label>
                      {fileError && (
                        <Alert variant="destructive" className="mb-3 py-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">{fileError}</AlertDescription>
                        </Alert>
                      )}
                      <div className="mt-3 border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
                        {file ? (
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-3 animate-scale-in">
                              <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">{file.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setFile(null)}
                              className="mt-3 text-red-500 hover:text-red-700 border-red-200 hover:bg-red-50"
                            >
                              Hapus File
                            </Button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center cursor-pointer">
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3 hover:scale-105 transition-transform">
                              <Upload className="h-10 w-10 text-daarul-blue" />
                            </div>
                            <span className="text-sm font-medium text-gray-800">Klik untuk upload atau drag and drop</span>
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
                </div>
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
