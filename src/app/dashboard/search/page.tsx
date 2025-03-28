"use client";

import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  SearchIcon, 
  TagIcon, 
  XIcon, 
  EyeIcon, 
  Pencil, 
  LayersIcon,
  PlusIcon
} from "lucide-react";
import { getAgents, searchAgents } from "@/apis/registry";
import { Agent, Capabilities } from "@/apis/registry/types";

// Suggested tags for autocomplete
const suggestedTags = [
  "Text", "Voice", "Video", "Email", "SMS", 
  "Language Processing", "Image Recognition", "Decision Making", "Planning", 
  "Storage", "Analysis", "Visualization", "Integration", 
  "Authentication", "Encryption", "Access Control", "Auditing"
];

export default function TagSearchPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Tag input state
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true);
        const response = await searchAgents({capabilities: selectedTags.join(","), status: "ACTIVE", limit: 50 });
        setAgents(response.data);
        setFilteredAgents(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load agents");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  // Update suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestedTags.filter(tag => 
        tag.toLowerCase().includes(inputValue.toLowerCase()) && 
        !selectedTags.includes(tag)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, selectedTags]);

  // Filter agents based on active tags
  useEffect(() => {
    if (activeTags.length === 0) {
      setFilteredAgents(agents);
      return;
    }
    
    const filtered = agents.filter(agent => {
      // Get all capability values from all categories
      const agentCapabilities = Object.values(agent.capabilities || {}).flat();
      
      // Check if every active tag is included in the agent's capabilities
      return activeTags.every(tag => 
        agentCapabilities.some(capability => 
          capability.toLowerCase().includes(tag.toLowerCase())
        )
      );
    });
    
    setFilteredAgents(filtered);
  }, [activeTags, agents]);

  // Handle key press in the input field
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      // Remove the last tag when backspace is pressed in an empty input
      setSelectedTags(prev => prev.slice(0, -1));
    }
  };

  // Add a tag to selected tags
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Remove a tag from selected tags
  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    inputRef.current?.focus();
  };

  // Perform search
  const handleSearch = () => {
    setActiveTags([...selectedTags]);
  };

  // Clear all tags
  const clearTags = () => {
    setSelectedTags([]);
    setActiveTags([]);
    setInputValue("");
    inputRef.current?.focus();
  };

  // Remove a tag from active tags
  const removeActiveTag = (tagToRemove: string) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Helper function to highlight matching capabilities in the table
  const renderAgentCapabilities = (capabilities?: Capabilities) => {
    if (!capabilities || Object.keys(capabilities).length === 0) {
      return <span className="text-gray-400 italic text-xs">No capabilities</span>;
    }
    
    // Flatten capabilities for display
    const allCapabilities = Object.entries(capabilities).flatMap(([category, items]) => 
      items.map(item => ({ category, capability: item }))
    );
    
    // Show first 5 capabilities, prioritizing matches with active tags
    let prioritizedCapabilities = [...allCapabilities];
    
    if (activeTags.length > 0) {
      // Sort capabilities to show matches first
      prioritizedCapabilities.sort((a, b) => {
        const aIsMatch = activeTags.some(tag => 
          a.capability.toLowerCase().includes(tag.toLowerCase())
        );
        const bIsMatch = activeTags.some(tag => 
          b.capability.toLowerCase().includes(tag.toLowerCase())
        );
        
        if (aIsMatch && !bIsMatch) return -1;
        if (!aIsMatch && bIsMatch) return 1;
        return 0;
      });
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {prioritizedCapabilities.slice(0, 5).map((item, idx) => {
          // Check if this capability matches any active tag
          const isMatch = activeTags.some(tag => 
            item.capability.toLowerCase().includes(tag.toLowerCase())
          );
          
          return (
            <Badge 
              key={idx} 
              variant="outline" 
              className={`
                text-xs
                ${isMatch
                  ? "bg-[#7678ed20] text-[#7678ed] border-[#7678ed40]" 
                  : "bg-gradient-to-r from-[#7678ed10] to-[#3B82F610] text-[#3B82F6] border-[#3B82F620]"
                }
              `}
            >
              <span className="text-gray-500 mr-1">{item.category}:</span>
              {item.capability}
            </Badge>
          );
        })}
        {allCapabilities.length > 5 && (
          <Badge className="bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 text-xs">
            +{allCapabilities.length - 5} more
          </Badge>
        )}
      </div>
    );
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-emerald-200";
      case "INACTIVE":
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border-gray-200";
      default:
        return "bg-gradient-to-r from-red-50 to-orange-50 text-red-600 border-red-200";
    }
  };

  return (
    <div className="space-y-6 bg-white text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">Capability Search</h2>
          <p className="text-gray-500 mt-1">Find agents by their capability tags</p>
        </div>
      </div>

      {/* Tag Search Section */}
      <Card className="bg-white border border-gray-200 overflow-hidden shadow-sm">
        <CardHeader className="bg-gradient-to-r from-[#7678ed10] to-white border-b border-gray-200 py-4">
          <CardTitle className="text-black text-xl">Search by Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="bg-white text-black py-6">
          <div className="space-y-6">
            {/* Tag input */}
            <div>
              <label htmlFor="tagInput" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <TagIcon className="h-4 w-4 mr-2 text-gray-500" />
                Enter capability tags
              </label>
              
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-gray-200 rounded-md focus-within:border-[#7678ed] focus-within:ring-1 focus-within:ring-[#7678ed]">
                  {selectedTags.map(tag => (
                    <Badge 
                      key={tag} 
                      className="bg-[#7678ed20] text-[#7678ed] border-[#7678ed40] pl-2 pr-1 py-1 flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 h-4 w-4 rounded-full bg-[#7678ed10] hover:bg-[#7678ed20] inline-flex items-center justify-center"
                        onClick={() => removeTag(tag)}
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  
                  <input
                    ref={inputRef}
                    id="tagInput"
                    type="text"
                    className="flex-1 min-w-[120px] outline-none border-none focus:ring-0 text-black bg-transparent p-0.5"
                    placeholder={selectedTags.length ? "Add more tags..." : "Type capability tags (e.g., Text, Storage, Authentication)..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => inputValue && setSuggestions(
                      suggestedTags.filter(tag => 
                        tag.toLowerCase().includes(inputValue.toLowerCase()) && 
                        !selectedTags.includes(tag)
                      )
                    )}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>
                
                {/* Tag suggestions */}
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                    {suggestions.map(suggestion => (
                      <div 
                        key={suggestion}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-sm"
                        onClick={() => addTag(suggestion)}
                      >
                        <PlusIcon className="h-3 w-3 mr-2 text-[#7678ed]" />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="mt-2 text-xs text-gray-500">
                Press Enter to add a tag. Use backspace to remove the last tag.
              </p>
            </div>
            
            {/* Search button and actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button 
                  className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white px-6"
                  onClick={handleSearch}
                  disabled={selectedTags.length === 0}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </Button>
                
                {selectedTags.length > 0 && (
                  <Button 
                    variant="outline"
                    className="bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    onClick={clearTags}
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="text-gray-500 text-sm">
                {selectedTags.length} {selectedTags.length === 1 ? 'tag' : 'tags'} selected
              </div>
            </div>
            
            {/* Active search filters */}
            {activeTags.length > 0 && (
              <div className="pt-5 mt-5 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Active Search Filters</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeTags.map(tag => (
                    <Badge 
                      key={tag} 
                      className="bg-blue-50 text-blue-700 border-blue-200 pl-2 pr-1 py-1 flex items-center gap-1"
                    >
                      {tag}
                      <button
                        className="ml-1 h-4 w-4 rounded-full bg-blue-100 hover:bg-blue-200 inline-flex items-center justify-center"
                        onClick={() => removeActiveTag(tag)}
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="bg-white border border-gray-200 overflow-hidden shadow-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 py-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-black text-xl">Search Results</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">
                {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'} found
              </span>
              {activeTags.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-gray-500 hover:text-gray-700 bg-white"
                  onClick={clearTags}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white text-black p-0">
          {loading ? (
            <div className="flex justify-center items-center py-16 text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7678ed]"></div>
              <span className="ml-3">Loading agents...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 py-8 px-4 m-6 rounded-lg text-center">
              <span className="font-medium">{error}</span>
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 m-6 text-center">
              <LayersIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-black">No matching agents found</h3>
              <p className="mt-1 text-gray-500">
                Try different capability tags or clear your filters.
              </p>
              {activeTags.length > 0 && (
                <Button 
                  onClick={clearTags}
                  className="mt-4 bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="border-b border-gray-200">
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider py-4">Name</TableHead>
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider">Capabilities</TableHead>
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow 
                      key={agent.id} 
                      className="hover:bg-blue-50/40 border-b border-gray-200 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="font-medium text-black">{agent.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 font-mono truncate max-w-[250px]">{agent.didIdentifier}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`font-medium ${getStatusBadgeStyle(agent.status)}`}>
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {renderAgentCapabilities(agent.capabilities)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2 justify-end">
                          <Link href={`/dashboard/agents/${agent.id}`}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-white text-[#3B82F6] border-[#3B82F640] hover:bg-[#3B82F610] h-8 px-3"
                            >
                              <EyeIcon className="h-3.5 w-3.5" />
                              <span className="ml-1.5">View</span>
                            </Button>
                          </Link>
                          <Link href={`/dashboard/agents/${agent.id}/edit`}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50 h-8 px-3"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span className="ml-1.5">Edit</span>
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}