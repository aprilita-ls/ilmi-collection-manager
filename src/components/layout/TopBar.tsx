
import React from 'react';
import { Bell, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TopBar = () => {
  const { toast } = useToast();
  
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="h-16 border-b bg-white px-6 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium text-gray-500">{currentDate}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Mail className="w-5 h-5 text-gray-500" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
