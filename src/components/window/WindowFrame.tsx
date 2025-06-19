import React from 'react';
import { X, Minus,Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // For conditional classes

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isActive?: boolean;
  className?: string;
  initialPosition?: { x: number; y: number }; // For draggable (not implemented here)
  initialSize?: { width: string | number; height: string | number }; // For resizable (not implemented here)
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  isActive = true,
  className,
  initialSize = { width: '600px', height: '400px' },
}) => {
  console.log("Rendering WindowFrame:", title, "Active:", isActive);

  // Basic drag functionality (very simplified)
  // For real drag, use a library like react-draggable

  return (
    <div
      className={cn(
        "absolute bg-gray-100/90 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden flex flex-col border",
        isActive ? "border-gray-400" : "border-gray-300",
        className
      )}
      style={{ width: initialSize.width, height: initialSize.height }}
      // Add top/left for initialPosition if implementing drag
    >
      {/* Title Bar */}
      <div
        className={cn(
            "h-8 flex items-center justify-between px-2 border-b select-none",
            isActive ? "bg-gray-200/70 border-gray-300" : "bg-gray-150/70 border-gray-250"
        )}
        // onMouseDown, onMouseMove, onMouseUp for dragging
      >
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600" aria-label="Close" />
          <button onClick={onMinimize} className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-500" aria-label="Minimize" />
          <button onClick={onMaximize} className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600" aria-label="Maximize" />
        </div>
        <span className={cn("text-xs font-medium", isActive ? "text-gray-800" : "text-gray-500")}>{title}</span>
        <div className="w-16" /> {/* Spacer to balance title */}
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-auto p-1 bg-white"> {/* Added padding and bg-white */}
        {children}
      </div>
    </div>
  );
}
export default WindowFrame;