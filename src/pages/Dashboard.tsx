
import React from 'react';
import { 
  FilmIcon, 
  MusicIcon, 
  BookOpenIcon, 
  UsersIcon, 
  EyeIcon, 
  ThumbsUpIcon, 
  ChevronRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusCircleIcon,
  ListIcon,
  PencilIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // Mock data for statistics
  const stats = [
    { 
      title: 'Total Koleksi', 
      value: 83, 
      change: 12, 
      isPositive: true,
      icon: <BookOpenIcon className="w-8 h-8 text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-100'
    },
    { 
      title: 'Selesai', 
      value: 77, 
      change: 5, 
      isPositive: true,
      icon: <ThumbsUpIcon className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100'
    },
    { 
      title: 'Dilihat', 
      value: 91, 
      change: 8, 
      isPositive: false,
      icon: <EyeIcon className="w-8 h-8 text-pink-500" />,
      color: 'bg-pink-50 border-pink-100'
    },
    { 
      title: 'Total Pengguna', 
      value: 126, 
      change: 28, 
      isPositive: true,
      icon: <UsersIcon className="w-8 h-8 text-purple-500" />,
      color: 'bg-purple-50 border-purple-100'
    },
  ];

  // Mock data for feedback
  const feedbacks = [
    {
      id: 1,
      name: 'Ahmad Rasyid',
      rating: 5,
      comment: 'Koleksi hadist sangat lengkap dan mudah diakses, sangat membantu pembelajaran saya.',
      date: '3 jam yang lalu'
    },
    {
      id: 2,
      name: 'Siti Aisyah',
      rating: 4,
      comment: 'Video dan audio berkualitas baik, namun akan lebih baik jika ada fitur download.',
      date: '5 jam yang lalu'
    },
    {
      id: 3,
      name: 'Muhammad Faisal',
      rating: 5,
      comment: 'Sangat bermanfaat untuk rujukan kajian harian. Terima kasih Daarul Ilmi!',
      date: '1 hari yang lalu'
    }
  ];

  // Quick action links
  const quickActions = [
    { 
      title: 'Tambah Koleksi', 
      description: 'Tambahkan video, audio, atau hadist baru',
      icon: <PlusCircleIcon className="w-10 h-10 text-daarul-blue" />, 
      path: '/tambah-koleksi',
      color: 'bg-blue-50'
    },
    { 
      title: 'Lihat Koleksi', 
      description: 'Kelola semua konten yang telah ditambahkan',
      icon: <ListIcon className="w-10 h-10 text-daarul-blue" />, 
      path: '/lihat-koleksi',
      color: 'bg-blue-50'
    },
    { 
      title: 'Edit Koleksi', 
      description: 'Perbarui konten yang sudah ada',
      icon: <PencilIcon className="w-10 h-10 text-daarul-blue" />, 
      path: '/edit-koleksi',
      color: 'bg-blue-50'
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Greeting section */}
        <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-between overflow-hidden relative animate-fade-in">
          <div className="z-10">
            <h1 className="text-3xl font-bold mb-2">Hai, Admin</h1>
            <p className="text-gray-600">Selamat datang kembali di dashboard Daarul Ilmi Collection Manager</p>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-200 opacity-50 rounded-full -translate-y-1/3 translate-x-1/3"></div>
          <div className="absolute right-20 bottom-0 w-40 h-40 bg-blue-300 opacity-30 rounded-full translate-y-1/2"></div>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link 
              key={index} 
              to={action.path}
              className="group"
            >
              <Card className={`p-6 h-full border transition-all duration-300 hover:shadow-md hover:border-daarul-blue ${action.color}`}>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-daarul-blue transition-colors">{action.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{action.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Statistics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Statistik Pengunjung</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className={`stat-card border ${stat.color}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  {stat.isPositive ? (
                    <div className="flex items-center text-green-600">
                      <ArrowUpIcon className="w-4 h-4 mr-1" />
                      <span>{stat.change}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <ArrowDownIcon className="w-4 h-4 mr-1" />
                      <span>{Math.abs(stat.change)}%</span>
                    </div>
                  )}
                  <span className="text-gray-500 ml-1">dari bulan lalu</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Feedback Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Feedback Terbaru</h2>
            <Link 
              to="/feedbacks"
              className="text-daarul-blue hover:underline flex items-center"
            >
              <span>Lihat Semua Feedback</span>
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <h3 className="font-medium">{feedback.name}</h3>
                  <span className="text-gray-500 text-sm">{feedback.date}</span>
                </div>
                <div className="flex mt-1 mb-2">
                  {renderStars(feedback.rating)}
                </div>
                <p className="text-gray-600">{feedback.comment}</p>
              </Card>
            ))}
            
            <div className="flex justify-center mt-6">
              <Link to="/feedbacks">
                <Button variant="outline" className="flex items-center">
                  <span>Lihat Semua Feedback</span>
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
