
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FormField = ({ icon, label, children, className }: FormFieldProps) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <Label className="text-base font-medium">{label}</Label>
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormField;
