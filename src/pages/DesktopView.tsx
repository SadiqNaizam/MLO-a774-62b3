import React, { useState } from 'react';
import MenuBar from '@/components/desktop/MenuBar';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import DockItem from '@/components/desktop/DockItem';
import WindowFrame from '@/components/window/WindowFrame'; // Example: to show how a window might appear
import SpotlightSearchViewComponent from '@/components/search/SpotlightSearchView'; // Renamed import to avoid conflict

import { Layers, FileText, Folder, Settings, Search, TerminalSquare, Mail, MessageSquare } from 'lucide-react'; // Example icons

// Placeholder for Spotlight search logic
const mockSpotlightSearch = async (query: string): Promise<any[]> => {
  console.log("Spotlight searching for:", query);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  if (query.toLowerCase().includes("app")) {
    return [
      { id: "app1", title: "TextEdit Application", description: "A simple text editor", icon: <FileText size={24}/> },
      { id: "app2", title: "System Settings App", description: "Configure your system", icon: <Settings size={24}/> },
    ];
  }
  if (query.toLowerCase().includes("doc")) {
     return [{ id: "doc1", title: "My Important Document.docx", description: "Work in progress", icon: <FileText size={24}/> }];
  }
  return [];
};


const DesktopView = () => {
  console.log('DesktopView loaded');
  const [activeAppName, setActiveAppName] = useState('Finder');
  const [windows, setWindows] = useState<{ id: string; title: string; content: React.ReactNode; initialPosition: {x: number, y: number} }[]>([]);
  const [showSpotlight, setShowSpotlight] = useState(false);

  const desktopIcons = [
    { id: 'doc1', label: 'My Report.docx', iconType: 'file' as const, onDoubleClick: () => openWindow('doc1-window', 'My Report.docx', <div className="p-4">Contents of My Report.docx</div>) },
    { id: 'folder1', label: 'Projects', iconType: 'folder' as const, onDoubleClick: () => openWindow('folder1-window', 'Projects', <div className="p-4">Contents of Projects folder</div>, { x: 150, y: 150}) },
    { id: 'app-icon', label: 'Launch App', iconType: <Layers size={48} className="text-blue-400" />, onDoubleClick: () => openWindow('generic-app-window', 'Generic App', <div className="p-4">This is a generic application window.</div>, {x: 200, y: 200}) },
  ];

  const dockItems = [
    { id: 'finder', label: 'Finder', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Finder_Icon_macOS_Big_Sur.png/120px-Finder_Icon_macOS_Big_Sur.png" alt="Finder" className="w-10 h-10"/>, onClick: () => setActiveAppName('Finder') },
    { id: 'launchpad', label: 'Launchpad', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Launchpad_icon_iOS_7-_macOS_Catalina.png/120px-Launchpad_icon_iOS_7-_macOS_Catalina.png" alt="Launchpad" className="w-10 h-10"/>, onClick: () => console.log('Launchpad clicked') },
    { id: 'textedit', label: 'TextEdit', icon: <FileText size={36} />, onClick: () => openWindow('textedit-window', 'Untitled TextEdit', <textarea className="w-full h-full p-2 border-none focus:ring-0" placeholder="Start typing..."/>, {x: 250, y: 100}) },
    { id: 'settings', label: 'System Settings', icon: <Settings size={36} />, onClick: () => openWindow('settings-window', 'System Settings', <div className="p-4">System Settings content would load here. For a full view, navigate to /system-settings.</div>, {x: 300, y: 150}) },
    { id: 'terminal', label: 'Terminal', icon: <TerminalSquare size={36} />, onClick: () => openWindow('terminal-window', 'Terminal', <div className="p-2 bg-black text-green-400 font-mono h-full">user@macos-clone:~$ _</div>, {x: 350, y: 200})},
    { id: 'mail', label: 'Mail', icon: <Mail size={36} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={36} />, hasNotification: true },
  ];

  const openWindow = (id: string, title: string, content: React.ReactNode, initialPosition = { x: 100, y: 100 }) => {
    if (windows.find(w => w.id === id)) {
      // Bring to front logic would be here
      return;
    }
    setWindows(prev => [...prev, { id, title, content, initialPosition }]);
    setActiveAppName(title.split(' ')[0]); // Simple app name detection
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (windows.length <= 1) setActiveAppName('Finder'); // Revert to Finder if last window closed
  };
  
  const handleSpotlightSelect = (item: any) => {
    console.log("Spotlight item selected:", item);
    openWindow(item.id, item.title, <div className="p-4">{item.description || item.title}</div>);
    setShowSpotlight(false);
  };

  // Toggle spotlight with a keyboard shortcut (e.g., Cmd+Space or Ctrl+Space)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === ' ') {
        event.preventDefault();
        setShowSpotlight(prev => !prev);
      }
      if (event.key === 'Escape' && showSpotlight) {
        setShowSpotlight(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSpotlight]);


  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?macos,wallpaper,nature')" }}
    >
      <MenuBar appName={activeAppName} />

      {/* Desktop Area */}
      <main className="flex-grow pt-7 relative"> {/* pt-7 for MenuBar height */}
        {/* Desktop Icons */}
        <div className="absolute top-8 left-4 flex flex-col space-y-2 p-4">
          {desktopIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              iconType={icon.iconType}
              onDoubleClick={icon.onDoubleClick}
            />
          ))}
        </div>

        {/* Windows */}
        {windows.map((win, index) => (
          <WindowFrame
            key={win.id}
            title={win.title}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => console.log(`Minimize ${win.id}`)}
            onMaximize={() => console.log(`Maximize ${win.id}`)}
            isActive={index === windows.length - 1} // Simplistic active state: last opened is active
            className="absolute" // Position controlled by draggable library in a real app
            initialPosition={win.initialPosition}
          >
            {win.content}
          </WindowFrame>
        ))}
        
        {/* Spotlight Search Overlay */}
        {showSpotlight && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-32 z-50" onClick={(e) => { if(e.target === e.currentTarget) setShowSpotlight(false); }}>
            <div className="w-full max-w-xl" onClick={e => e.stopPropagation()}>
              <SpotlightSearchViewComponent
                onSearch={mockSpotlightSearch}
                onSelectResult={handleSpotlightSelect}
              />
            </div>
          </div>
        )}
      </main>

      {/* Dock */}
      <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-end space-x-2 p-2 bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl">
          {dockItems.map(item => (
            <DockItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              onClick={() => item.onClick ? item.onClick() : console.log(`${item.label} clicked`)}
              isActive={item.id === 'finder' && activeAppName === 'Finder'} // Simple active state
              hasNotification={item.hasNotification}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default DesktopView;