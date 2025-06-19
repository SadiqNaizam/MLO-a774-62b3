import React from 'react';
import { AppWindow } from 'lucide-react'; // Example icon

interface DockItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: (id: string) => void;
  isActive?: boolean;
  hasNotification?: boolean;
}

const DockItem: React.FC<DockItemProps> = ({
  id,
  label,
  icon,
  onClick,
  isActive,
  hasNotification,
}) => {
  console.log("Rendering DockItem:", label, "Active:", isActive);

  const IconComponent = icon || <AppWindow className="w-10 h-10" />;

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer group p-1"
      onClick={() => onClick && onClick(id)}
      title={label}
    >
      <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-lg flex items-center justify-center shadow-lg transition-all duration-150 ease-out group-hover:scale-125 group-hover:-translate-y-2">
        {React.isValidElement(IconComponent) ? React.cloneElement(IconComponent as React.ReactElement, { className: "w-10 h-10" }) : IconComponent}
      </div>
      {isActive && (
        <div className="absolute bottom-[-4px] w-1.5 h-1.5 bg-gray-700 rounded-full" />
      )}
      {hasNotification && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white/50" />
      )}
      {/* Tooltip-like label on hover - Tailwind doesn't have this out of box, usually done with a library or custom CSS */}
      <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-black/70 text-white text-xs rounded-md whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
export default DockItem;