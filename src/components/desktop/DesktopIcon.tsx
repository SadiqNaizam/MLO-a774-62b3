import React from 'react';
import { FileText, Folder } from 'lucide-react'; // Example icons

interface DesktopIconProps {
  id: string;
  label: string;
  iconType: 'file' | 'folder' | React.ReactNode; // Allow custom icon node
  onDoubleClick?: (id: string) => void;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  iconType,
  onDoubleClick,
  isSelected,
  onClick,
}) => {
  console.log("Rendering DesktopIcon:", label, "Selected:", isSelected);

  const IconComponent = () => {
    if (React.isValidElement(iconType)) {
      return React.cloneElement(iconType as React.ReactElement, { className: "w-12 h-12 mb-1" });
    }
    switch (iconType) {
      case 'file':
        return <FileText className="w-12 h-12 mb-1" />;
      case 'folder':
        return <Folder className="w-12 h-12 mb-1" />;
      default:
        return <FileText className="w-12 h-12 mb-1" />; // Default icon
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-2 rounded cursor-pointer select-none w-24 h-28 text-center ${
        isSelected ? 'bg-blue-500/30' : 'hover:bg-white/20'
      }`}
      onDoubleClick={() => onDoubleClick && onDoubleClick(id)}
      onClick={() => onClick && onClick(id)}
    >
      <IconComponent />
      <span className="text-xs text-white shadow-black [text-shadow:0_1px_1px_var(--tw-shadow-color)] break-words line-clamp-2">
        {label}
      </span>
    </div>
  );
}
export default DesktopIcon;