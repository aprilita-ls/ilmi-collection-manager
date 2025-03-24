
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-daarul-blue mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Halaman tidak ditemukan</p>
        <p className="text-gray-500 mb-8">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Button asChild className="flex items-center gap-2 mx-auto">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
