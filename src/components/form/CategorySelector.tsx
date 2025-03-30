
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LayoutGridIcon, RadioIcon, FileTextIcon } from 'lucide-react';

interface CategorySelectorProps {
  value: "video" | "audio" | "hadist";
  onChange: (value: "video" | "audio" | "hadist") => void;
}

const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  return (
    <RadioGroup 
      value={value} 
      onValueChange={(val) => onChange(val as "video" | "audio" | "hadist")}
      className="grid grid-cols-3 gap-3 mt-3"
    >
      <CategoryOption 
        id="video" 
        value="video" 
        label="Video" 
        icon={<LayoutGridIcon className={`w-10 h-10 mx-auto mb-2 ${value === 'video' ? 'text-daarul-blue' : 'text-gray-400'}`} />}
        isSelected={value === 'video'} 
      />
      <CategoryOption 
        id="audio" 
        value="audio" 
        label="Audio" 
        icon={<RadioIcon className={`w-10 h-10 mx-auto mb-2 ${value === 'audio' ? 'text-daarul-blue' : 'text-gray-400'}`} />}
        isSelected={value === 'audio'} 
      />
      <CategoryOption 
        id="hadist" 
        value="hadist" 
        label="Hadist" 
        icon={<FileTextIcon className={`w-10 h-10 mx-auto mb-2 ${value === 'hadist' ? 'text-daarul-blue' : 'text-gray-400'}`} />}
        isSelected={value === 'hadist'} 
      />
    </RadioGroup>
  );
};

interface CategoryOptionProps {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
}

const CategoryOption = ({ id, value, label, icon, isSelected }: CategoryOptionProps) => {
  return (
    <div className={`flex flex-col items-center p-4 border ${isSelected ? 'border-daarul-blue bg-blue-50' : 'border-gray-200'} rounded-xl hover:bg-blue-50 transition-colors cursor-pointer`}>
      <RadioGroupItem value={value} id={id} className="text-daarul-blue sr-only" />
      <Label htmlFor={id} className="cursor-pointer text-center">
        {icon}
        <span className={`font-medium ${isSelected ? 'text-daarul-blue' : 'text-gray-600'}`}>{label}</span>
      </Label>
    </div>
  );
};

export default CategorySelector;
