import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

// Define types for tree nodes
export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

interface FileSystemTreeViewProps {
  nodes: TreeNode[];
  onSelectNode?: (node: TreeNode) => void;
  initiallyOpen?: boolean; // Whether to open all folders initially
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  onSelectNode?: (node: TreeNode) => void;
  isInitiallyOpen: boolean;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, level, onSelectNode, isInitiallyOpen }) => {
  const [isOpen, setIsOpen] = useState(node.type === 'folder' && isInitiallyOpen);

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = () => {
    if (onSelectNode) {
      onSelectNode(node);
    }
  };

  const Icon = node.type === 'folder' ? Folder : File;
  const ToggleIcon = isOpen ? ChevronDown : ChevronRight;

  return (
    <div>
      <div
        className="flex items-center py-1 px-2 rounded hover:bg-gray-100 cursor-pointer"
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }} // Indentation
        onClick={node.type === 'file' ? handleSelect : handleToggle}
      >
        {node.type === 'folder' && (
          <ToggleIcon className="w-4 h-4 mr-1 text-gray-500" />
        )}
        <Icon className={`w-4 h-4 mr-2 ${node.type === 'folder' ? 'text-blue-500' : 'text-gray-600'}`} />
        <span className="text-sm select-none">{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map(childNode => (
            <TreeItem key={childNode.id} node={childNode} level={level + 1} onSelectNode={onSelectNode} isInitiallyOpen={isInitiallyOpen}/>
          ))}
        </div>
      )}
    </div>
  );
};

const FileSystemTreeView: React.FC<FileSystemTreeViewProps> = ({ nodes, onSelectNode, initiallyOpen = false }) => {
  console.log("Rendering FileSystemTreeView with", nodes.length, "root nodes.");
  return (
    <div className="text-sm">
      {nodes.map(node => (
        <TreeItem key={node.id} node={node} level={0} onSelectNode={onSelectNode} isInitiallyOpen={initiallyOpen} />
      ))}
    </div>
  );
}
export default FileSystemTreeView;