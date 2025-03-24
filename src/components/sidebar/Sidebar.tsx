
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, List, Edit, Settings, LogOut, BarChart } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { title: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { title: 'Tambah Koleksi', path: '/tambah-koleksi', icon: <PlusCircle className="w-5 h-5" /> },
    { title: 'Lihat Koleksi', path: '/lihat-koleksi', icon: <List className="w-5 h-5" /> },
    { title: 'Edit Koleksi', path: '/edit-koleksi', icon: <Edit className="w-5 h-5" /> },
    { title: 'Statistics', path: '/statistics', icon: <BarChart className="w-5 h-5" /> },
    { title: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-[240px] h-screen border-r p-4 flex flex-col animate-fade-in">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-daarul-blue rounded-lg w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
          DI
        </div>
        <h1 className="text-xl font-bold">Daarul Ilmi</h1>
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t">
        <button className="menu-item w-full text-red-500 justify-start">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
