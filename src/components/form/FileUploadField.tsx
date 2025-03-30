
import React from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface FileUploadFieldProps {
  file: File | null;
  currentFileName?: string;
  fileError: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
  acceptTypes: string;
  fileTypeDescription: string;
}

const FileUploadField = ({
  file,
  currentFileName,
  fileError,
  onFileChange,
  onFileRemove,
  acceptTypes,
  fileTypeDescription
}: FileUploadFieldProps) => {
  return (
    <>
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
              onClick={onFileRemove}
              className="mt-3 text-red-500 hover:text-red-700 border-red-200 hover:bg-red-50"
            >
              Hapus File
            </Button>
          </div>
        ) : currentFileName ? (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-800">{currentFileName}</p>
            <p className="text-xs text-gray-500 mt-1">File saat ini</p>
            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500 border-blue-200 hover:bg-blue-50"
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                Ganti File
              </Button>
            </div>
            <Input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={onFileChange}
              accept={acceptTypes}
            />
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3 hover:scale-105 transition-transform">
              <Upload className="h-10 w-10 text-daarul-blue" />
            </div>
            <span className="text-sm font-medium text-gray-800">Klik untuk upload atau drag and drop</span>
            <span className="text-xs text-gray-500 mt-1">
              {fileTypeDescription}
            </span>
            <Input 
              type="file" 
              className="hidden" 
              onChange={onFileChange}
              accept={acceptTypes}
            />
          </label>
        )}
      </div>
    </>
  );
};

export default FileUploadField;
