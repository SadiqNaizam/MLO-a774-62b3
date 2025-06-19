import React from 'react';
import SpotlightSearchViewComponent from '@/components/search/SpotlightSearchView'; // Renamed import
import { FileText, Settings, FolderOpen } from 'lucide-react';

// This is a page that *uses* the SpotlightSearchView component.
// In a real app, Spotlight might be an overlay triggered by a shortcut,
// not necessarily a full page route, but this fulfills the requirement.

const mockSearch = async (query: string): Promise<any[]> => {
  console.log("Spotlight page searching for:", query);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const results = [
    { id: 'app-textedit', title: 'TextEdit', description: 'Application - A simple text editor', icon: <FileText size={24} className="text-blue-500"/> },
    { id: 'app-settings', title: 'System Settings', description: 'Application - Configure your system', icon: <Settings size={24} className="text-gray-500"/> },
    { id: 'folder-docs', title: 'Documents', description: 'Folder - Your personal documents', icon: <FolderOpen size={24} className="text-yellow-600"/> },
    { id: 'file-report', title: 'Annual Report.pdf', description: 'PDF Document - Financials', icon: <FileText size={24} className="text-red-500"/> },
  ];

  if (!query) return results.slice(0,2); // Show some initial results maybe

  return results.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.description.toLowerCase().includes(query.toLowerCase())
  );
};

const handleSelect = (item: any) => {
  alert(`Selected: ${item.title}\nDescription: ${item.description}\nID: ${item.id}`);
  // In a real app, this would navigate or open the item
};

const SpotlightSearchViewPage = () => {
  console.log('SpotlightSearchViewPage loaded');
  return (
    <div className="h-screen w-screen bg-black/50 backdrop-blur-md flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-xl">
         <SpotlightSearchViewComponent
            onSearch={mockSearch}
            onSelectResult={handleSelect}
          />
      </div>
    </div>
  );
};

export default SpotlightSearchViewPage;