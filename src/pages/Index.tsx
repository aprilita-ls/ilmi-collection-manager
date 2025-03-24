
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Daarul Ilmi Collection Manager</h1>
        <p className="text-xl text-gray-600 mb-8">Manage your collection with ease</p>
        <Link to="/dashboard">
          <Button variant="default" className="bg-daarul-blue hover:bg-blue-700">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
