
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Search, MessageSquare, Tabs } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tabs as TabsComponent,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for feedback
const mockFeedback = [
  {
    id: 1,
    name: 'Ahmad Rasyid',
    rating: 5,
    comment: 'Koleksi hadist sangat lengkap dan mudah diakses, sangat membantu pembelajaran saya.',
    date: '2023-06-15T14:30:00',
    category: 'hadist'
  },
  {
    id: 2,
    name: 'Siti Aisyah',
    rating: 4,
    comment: 'Video dan audio berkualitas baik, namun akan lebih baik jika ada fitur download.',
    date: '2023-06-15T10:15:00',
    category: 'video'
  },
  {
    id: 3,
    name: 'Muhammad Faisal',
    rating: 5,
    comment: 'Sangat bermanfaat untuk rujukan kajian harian. Terima kasih Daarul Ilmi!',
    date: '2023-06-14T16:45:00',
    category: 'audio'
  },
  {
    id: 4,
    name: 'Annisa Rahmawati',
    rating: 3,
    comment: 'Aplikasi bagus, tapi masih ada beberapa bug saat memutar video.',
    date: '2023-06-13T09:20:00',
    category: 'video'
  },
  {
    id: 5,
    name: 'Umar Abdullah',
    rating: 5,
    comment: 'Sangat membantu dalam mencari referensi hadist dengan cepat dan tepat.',
    date: '2023-06-12T13:10:00',
    category: 'hadist'
  },
  {
    id: 6,
    name: 'Fatimah Azzahra',
    rating: 4,
    comment: 'Koleksi audio kajian sangat bermutu, suara jernih dan materi lengkap.',
    date: '2023-06-11T15:30:00',
    category: 'audio'
  },
  {
    id: 7,
    name: 'Zainab Putri',
    rating: 5,
    comment: 'Alhamdulillah, banyak ilmu yang bisa didapat dari koleksi ini. Semoga terus bertambah.',
    date: '2023-06-10T11:45:00',
    category: 'hadist'
  },
  {
    id: 8,
    name: 'Ibrahim Hassan',
    rating: 4,
    comment: 'Desain aplikasi sangat user-friendly, mudah digunakan dan nyaman dilihat.',
    date: '2023-06-09T10:15:00',
    category: 'general'
  }
];

const AllFeedbacks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredFeedback = mockFeedback
    .filter(feedback => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          feedback.name.toLowerCase().includes(searchLower) ||
          feedback.comment.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(feedback => {
      // Apply rating filter
      if (ratingFilter !== null) {
        return feedback.rating === ratingFilter;
      }
      return true;
    })
    .filter(feedback => {
      // Apply category filter based on active tab
      if (activeTab !== 'all') {
        return feedback.category === activeTab;
      }
      return true;
    });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  const getTabStats = () => {
    const videoCount = mockFeedback.filter(f => f.category === 'video').length;
    const audioCount = mockFeedback.filter(f => f.category === 'audio').length;
    const hadistCount = mockFeedback.filter(f => f.category === 'hadist').length;
    const generalCount = mockFeedback.filter(f => f.category === 'general').length;
    
    return {
      all: mockFeedback.length,
      video: videoCount,
      audio: audioCount,
      hadist: hadistCount,
      general: generalCount
    };
  };

  const stats = getTabStats();

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/feedbacks')}
                className="p-0 hover:bg-transparent"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
              </Button>
              <h1 className="text-2xl font-bold">Semua Ulasan</h1>
            </div>
            <p className="text-gray-500 mt-1">Lihat semua ulasan berdasarkan kategori</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <MessageSquare className="w-6 h-6 text-daarul-blue" />
          </div>
        </div>
        
        <div className="mb-8">
          <TabsComponent defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto bg-white border-b p-0 h-auto">
              <TabsTrigger value="all" className="py-3 px-5 rounded-none data-[state=active]:bg-blue-50 border-b-2 data-[state=active]:border-daarul-blue data-[state=active]:shadow-none">
                Semua <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{stats.all}</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="py-3 px-5 rounded-none data-[state=active]:bg-blue-50 border-b-2 data-[state=active]:border-daarul-blue data-[state=active]:shadow-none">
                Video <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{stats.video}</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="py-3 px-5 rounded-none data-[state=active]:bg-blue-50 border-b-2 data-[state=active]:border-daarul-blue data-[state=active]:shadow-none">
                Audio <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{stats.audio}</span>
              </TabsTrigger>
              <TabsTrigger value="hadist" className="py-3 px-5 rounded-none data-[state=active]:bg-blue-50 border-b-2 data-[state=active]:border-daarul-blue data-[state=active]:shadow-none">
                Hadist <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{stats.hadist}</span>
              </TabsTrigger>
              <TabsTrigger value="general" className="py-3 px-5 rounded-none data-[state=active]:bg-blue-50 border-b-2 data-[state=active]:border-daarul-blue data-[state=active]:shadow-none">
                Umum <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{stats.general}</span>
              </TabsTrigger>
            </TabsList>
          </TabsComponent>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari ulasan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRatingFilter(null)}>
                Semua Rating
              </DropdownMenuItem>
              {[5, 4, 3, 2, 1].map(rating => (
                <DropdownMenuItem 
                  key={rating} 
                  onClick={() => setRatingFilter(rating)}
                  className="flex items-center gap-2"
                >
                  <div className="flex">
                    {Array(5).fill(0).map((_, index) => (
                      <svg 
                        key={index} 
                        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span>({rating} bintang)</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-4">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map(feedback => (
              <Card key={feedback.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{feedback.name}</h3>
                  <span className="text-sm text-gray-500">{formatDate(feedback.date)}</span>
                </div>
                <div className="flex mb-3">
                  {renderStars(feedback.rating)}
                </div>
                <p className="text-gray-700">{feedback.comment}</p>
                {feedback.category && (
                  <div className="mt-3">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      feedback.category === 'video' 
                        ? 'bg-blue-100 text-blue-800' 
                        : feedback.category === 'audio'
                        ? 'bg-green-100 text-green-800'
                        : feedback.category === 'hadist'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {feedback.category === 'general' ? 'umum' : feedback.category}
                    </span>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Tidak ada ulasan yang ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllFeedbacks;
