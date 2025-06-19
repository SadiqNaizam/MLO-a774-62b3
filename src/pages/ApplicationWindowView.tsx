import React from 'react';
import WindowFrame from '@/components/window/WindowFrame';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea'; // Example application content

const ApplicationWindowView = () => {
  console.log('ApplicationWindowView loaded');
  const appName = "TextEdit"; // Example, could be passed as prop or from route
  
  return (
    <div className="p-10 bg-slate-300 h-screen flex items-center justify-center"> {/* Mock page background */}
      <WindowFrame title={appName} initialSize={{ width: '500px', height: '350px' }}>
        <ScrollArea className="h-full bg-white">
          {/* Content depends on the application. Example: TextEdit */}
          {appName === "TextEdit" ? (
            <Textarea 
              className="w-full h-full p-3 text-base border-none focus-visible:ring-0 resize-none" 
              placeholder="Type something..." 
              defaultValue="This is a simulated application window. You can type here."
            />
          ) : (
            <div className="p-4">
              <h2 className="text-lg font-semibold">Welcome to {appName}</h2>
              <p className="mt-2 text-gray-700">This is the main content area for the application.</p>
              <img src={`https://source.unsplash.com/random/400x200/?${appName},abstract`} alt={`${appName} placeholder image`} className="mt-4 rounded"/>
            </div>
          )}
        </ScrollArea>
      </WindowFrame>
    </div>
  );
};

export default ApplicationWindowView;