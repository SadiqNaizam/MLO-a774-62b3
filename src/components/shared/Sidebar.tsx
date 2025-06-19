import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';

interface SidebarProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  widthClass?: string; // e.g., 'w-64', 'w-1/4'
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  title,
  className,
  widthClass = 'w-56', // Default width
}) => {
  console.log("Rendering Sidebar, title:", title);
  return (
    <aside className={cn("flex flex-col bg-gray-50 border-r border-gray-200", widthClass, className)}>
      {title && (
        <div className="h-10 flex items-center px-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        </div>
      )}
      <ScrollArea className="flex-grow p-2">
        <div className="space-y-1">
          {children}
        </div>
      </ScrollArea>
    </aside>
  );
}
export default Sidebar;