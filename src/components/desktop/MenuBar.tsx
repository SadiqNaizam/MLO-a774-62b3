import React from 'react';
import { Apple, Wifi, BatteryFull, Search } from 'lucide-react'; // Example icons

// Define props if menu items are dynamic
interface MenuBarItemProps {
  label: string;
  onClick?: () => void;
  children?: React.ReactNode; // For submenus, not implemented here
}

const MenuBarItem: React.FC<MenuBarItemProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 text-sm hover:bg-blue-500 hover:text-white rounded"
    >
      {label}
    </button>
  );
};

interface MenuBarProps {
  // Define props if needed, e.g., application-specific menus
  appName?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ appName = "Finder" }) => {
  console.log("Rendering MenuBar for app:", appName);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-4 text-black z-50 select-none">
      <div className="flex items-center space-x-1">
        <Apple className="h-4 w-4" />
        <span className="font-semibold text-sm">{appName}</span>
        <MenuBarItem label="File" />
        <MenuBarItem label="Edit" />
        <MenuBarItem label="View" />
        <MenuBarItem label="Go" />
        <MenuBarItem label="Window" />
        <MenuBarItem label="Help" />
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <Wifi className="h-4 w-4" />
        <BatteryFull className="h-4 w-4" />
        <span>100%</span>
        <Search className="h-4 w-4" />
        <span>{currentTime}</span>
        {/* Placeholder for Control Center icon */}
      </div>
    </div>
  );
}
export default MenuBar;