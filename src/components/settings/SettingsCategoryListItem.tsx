import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsCategoryListItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: (id: string) => void;
  isActive?: boolean; // To highlight the active/selected category
  description?: string;
}

const SettingsCategoryListItem: React.FC<SettingsCategoryListItemProps> = ({
  id,
  label,
  icon,
  onClick,
  isActive,
  description,
}) => {
  console.log("Rendering SettingsCategoryListItem:", label, "Active:", isActive);

  return (
    <button
      className={cn(
        "flex items-center w-full text-left px-3 py-2.5 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150",
        isActive ? "bg-gray-200 font-semibold" : ""
      )}
      onClick={() => onClick && onClick(id)}
    >
      {icon && <div className="mr-3 w-5 h-5 flex items-center justify-center text-gray-600">{icon}</div>}
      <div className="flex-grow">
        <span className="text-sm">{label}</span>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
    </button>
  );
}
export default SettingsCategoryListItem;