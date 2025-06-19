import React from 'react';

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ children, className }) => {
  console.log("Rendering Toolbar");
  return (
    <div className={`flex items-center h-12 px-2 py-1 bg-gray-100 border-b border-gray-300 space-x-2 ${className || ''}`}>
      {children}
    </div>
  );
}
export default Toolbar;