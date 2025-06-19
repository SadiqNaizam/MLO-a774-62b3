import React, { useState } from 'react';
import WindowFrame from '@/components/window/WindowFrame';
import Toolbar from '@/components/shared/Toolbar';
import Sidebar from '@/components/shared/Sidebar';
import FileSystemTreeView, { TreeNode } from '@/components/finder/FileSystemTreeView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowLeft, ArrowRight, List, Grid, Home, Star, Clock, Download, FileText, Folder } from 'lucide-react';

const initialFileSystem: TreeNode[] = [
  { id: 'desktop', name: 'Desktop', type: 'folder', children: [
    { id: 'img1', name: 'Nature.jpg', type: 'file' },
    { id: 'report', name: 'Annual Report.pdf', type: 'file' },
  ]},
  { id: 'documents', name: 'Documents', type: 'folder', children: [
    { id: 'work', name: 'Work', type: 'folder', children: [
      { id: 'project-alpha', name: 'Project Alpha', type: 'folder', children: [
        { id: 'spec', name: 'Specifications.docx', type: 'file' },
      ]},
    ]},
    { id: 'personal', name: 'Personal', type: 'folder', children: [
        { id: 'todo', name: 'Todo.txt', type: 'file' },
    ] }
  ]},
  { id: 'downloads', name: 'Downloads', type: 'folder', children: [
     { id: 'installer', name: 'AppInstaller.dmg', type: 'file' },
  ]},
  { id: 'applications', name: 'Applications', type: 'folder', children: [
    { id: 'textedit-app', name: 'TextEdit.app', type: 'file'}, // Simplified
    { id: 'calculator-app', name: 'Calculator.app', type: 'file'},
  ]},
];

const FinderWindowView = () => {
  console.log('FinderWindowView loaded');
  const [currentPath, setCurrentPath] = useState<TreeNode[]>( [initialFileSystem.find(n => n.id === 'documents')!] );
  const [searchTerm, setSearchTerm] = useState('');

  const selectedNode = currentPath[currentPath.length - 1];
  const itemsToShow = selectedNode?.type === 'folder' ? selectedNode.children || [] : [];
  
  const filteredItems = itemsToShow.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNodeSelect = (node: TreeNode) => {
    // This function would update the currentPath to navigate
    // For simplicity, we'll just log it for now, and assume a flat display of the selected folder.
    // To implement full navigation, you'd need to traverse the tree and update currentPath.
    console.log("Selected node for main view:", node);
    if (node.type === 'folder') {
        // Find the node in the tree and build the path to it
        const findPath = (nodes: TreeNode[], targetId: string, path: TreeNode[] = []): TreeNode[] | null => {
            for (const n of nodes) {
                const currentPath = [...path, n];
                if (n.id === targetId) return currentPath;
                if (n.children) {
                    const foundPath = findPath(n.children, targetId, currentPath);
                    if (foundPath) return foundPath;
                }
            }
            return null;
        }
        const newPathArray = findPath(initialFileSystem, node.id);
        if (newPathArray) {
            setCurrentPath(newPathArray);
        }
    } else {
        console.log("File selected:", node.name);
        // Potentially open the file or show preview
    }
  };

  const navigateToPathItem = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };


  return (
    <div className="p-10 bg-slate-300 h-screen flex items-center justify-center"> {/* Mock page background */}
      <WindowFrame title="Finder" initialSize={{ width: '800px', height: '600px' }}>
        <div className="flex flex-col h-full">
          <Toolbar>
            <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><ArrowRight className="h-4 w-4" /></Button>
            <div className="ml-2 flex-grow">
                 <Breadcrumb>
                    <BreadcrumbList>
                        {currentPath.map((node, index) => (
                            <React.Fragment key={node.id}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); navigateToPathItem(index);}}>
                                        {node.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < currentPath.length - 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Input 
              placeholder="Search" 
              className="w-48 h-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="ghost" size="icon"><Grid className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="bg-gray-200"><List className="h-4 w-4" /></Button>
          </Toolbar>

          <div className="flex flex-grow overflow-hidden">
            <Sidebar title="Favorites" widthClass="w-52">
                <button className="flex items-center w-full text-left px-2 py-1.5 rounded hover:bg-gray-200 text-sm" onClick={() => handleNodeSelect(initialFileSystem.find(n => n.id === 'applications')!)}>
                    <Home size={16} className="mr-2 text-gray-600" /> Applications
                </button>
                <button className="flex items-center w-full text-left px-2 py-1.5 rounded hover:bg-gray-200 text-sm bg-blue-100 text-blue-700 font-medium" onClick={() => handleNodeSelect(initialFileSystem.find(n => n.id === 'desktop')!)}>
                    <Star size={16} className="mr-2 text-gray-600" /> Desktop
                </button>
                 <button className="flex items-center w-full text-left px-2 py-1.5 rounded hover:bg-gray-200 text-sm" onClick={() => handleNodeSelect(initialFileSystem.find(n => n.id === 'documents')!)}>
                    <FileText size={16} className="mr-2 text-gray-600" /> Documents
                </button>
                <button className="flex items-center w-full text-left px-2 py-1.5 rounded hover:bg-gray-200 text-sm" onClick={() => handleNodeSelect(initialFileSystem.find(n => n.id === 'downloads')!)}>
                    <Download size={16} className="mr-2 text-gray-600" /> Downloads
                </button>
                <div className="mt-4 pt-2 border-t">
                    <span className="px-2 text-xs text-gray-500 font-semibold"> iCloud </span>
                     <button className="flex items-center w-full text-left px-2 py-1.5 rounded hover:bg-gray-200 text-sm mt-1">
                        <Clock size={16} className="mr-2 text-gray-600" /> Recents
                    </button>
                </div>
                <div className="mt-4 pt-2 border-t">
                     <span className="px-2 text-xs text-gray-500 font-semibold">Locations</span>
                     {/* FileSystemTreeView for locations/devices */}
                     <div className="mt-1">
                        <FileSystemTreeView nodes={initialFileSystem} onSelectNode={handleNodeSelect} initiallyOpen={false} />
                     </div>
                </div>
            </Sidebar>

            <ScrollArea className="flex-grow p-0"> {/* Remove padding from ScrollArea, add to Table parent if needed */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date Modified</TableHead>
                    <TableHead>Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map(item => (
                    <TableRow key={item.id} onDoubleClick={() => item.type === 'folder' ? handleNodeSelect(item) : console.log('Open file:', item.name)}>
                      <TableCell className="p-2">
                        {item.type === 'folder' ? <Folder size={20} className="text-blue-500" /> : <FileText size={20} className="text-gray-500" />}
                      </TableCell>
                      <TableCell className="font-medium p-2">{item.name}</TableCell>
                      <TableCell className="p-2 text-xs text-gray-600">Yesterday</TableCell>
                      <TableCell className="p-2 text-xs text-gray-600">{item.type === 'folder' ? '--' : `${Math.floor(Math.random() * 1000)} KB`}</TableCell>
                    </TableRow>
                  ))}
                  {filteredItems.length === 0 && searchTerm && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">No items match "{searchTerm}"</TableCell>
                    </TableRow>
                  )}
                   {filteredItems.length === 0 && !searchTerm && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">This folder is empty.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
           <div className="h-6 border-t bg-gray-50 flex items-center px-3 text-xs text-gray-600">
            {itemsToShow.length} items
          </div>
        </div>
      </WindowFrame>
    </div>
  );
};

export default FinderWindowView;