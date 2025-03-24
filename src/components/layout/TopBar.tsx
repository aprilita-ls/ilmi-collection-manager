
import React from 'react';
import { Bell, Mail, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TopBar = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out.",
    });
    // Handle actual logout logic here
  };

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
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
