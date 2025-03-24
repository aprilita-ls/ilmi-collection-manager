
import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2,
  FilePenIcon 
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const TambahKoleksi = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('video');
  const [summary, setSummary] = useState('');
  const [presenter, setPresenter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

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

    // Submit logic
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
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
      setIsSubmitting(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tambah Koleksi</h1>
            <p className="text-gray-500 mt-1">Tambahkan video, audio, atau hadist baru ke koleksi Daarul Ilmi</p>
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
                        onClick={() => setFile(null)}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </Button>
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
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="px-6"
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
