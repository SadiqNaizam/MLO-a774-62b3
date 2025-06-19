import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

interface SpotlightResultItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface SpotlightSearchViewProps {
  onSearch: (query: string) => Promise<SpotlightResultItem[]>;
  onSelectResult: (item: SpotlightResultItem) => void;
}

const SpotlightSearchView: React.FC<SpotlightSearchViewProps> = ({ onSearch, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotlightResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log("Rendering SpotlightSearchView, query:", query);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === '') {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const searchResults = await onSearch(newQuery);
    setResults(searchResults);
    setSelectedIndex(0); // Reset selection
    setIsLoading(false);
  };
  
  // Basic keyboard navigation (can be expanded)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter' && results[selectedIndex]) {
      event.preventDefault();
      onSelectResult(results[selectedIndex]);
    }
  };


  return (
    <Card className="w-full max-w-lg shadow-2xl rounded-lg overflow-hidden">
      <div className="flex items-center p-3 border-b">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <Input
          type="text"
          placeholder="Spotlight Search"
          className="text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none p-0 h-auto"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
      {query.trim() !== '' && (
        <CardContent className="p-0">
          {isLoading && <div className="p-4 text-sm text-gray-500">Searching...</div>}
          {!isLoading && results.length === 0 && query.trim() !== '' && (
            <div className="p-4 text-sm text-gray-500">No results for "{query}"</div>
          )}
          {!isLoading && results.length > 0 && (
            <ScrollArea className="h-[300px]"> {/* Max height for results */}
              {results.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-blue-500/10 ${index === selectedIndex ? 'bg-blue-500/20' : ''}`}
                  onClick={() => onSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {item.icon && <div className="mr-3">{item.icon}</div>}
                  <div>
                    <div className="font-medium">{item.title}</div>
                    {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
      )}
    </Card>
  );
}
export default SpotlightSearchView;