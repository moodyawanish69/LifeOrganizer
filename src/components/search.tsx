import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Search as SearchIcon, 
  Filter, 
  Clock, 
  FileText, 
  CheckSquare, 
  Calendar,
  Tag,
  TrendingUp,
  History,
  X
} from "lucide-react";

// Mock data that would come from your notes, tasks, and events
const mockData = [
  // Notes
  {
    id: 1,
    type: "note",
    title: "Project Meeting Notes",
    content: "Discussed new feature requirements and timeline. Key decisions made regarding the UI redesign and backend architecture.",
    category: "Work",
    tags: ["meeting", "project", "decisions"],
    date: "2024-01-15",
    relevance: 0.95
  },
  {
    id: 2,
    type: "note",
    title: "Learning React Patterns",
    content: "Compound components pattern allows you to create flexible and reusable component APIs. Examples include accordion, tabs, and dropdown menus.",
    category: "Learning",
    tags: ["react", "patterns", "programming"],
    date: "2024-01-14",
    relevance: 0.88
  },
  
  // Tasks
  {
    id: 3,
    type: "task",
    title: "Review project proposal",
    content: "Go through the new client proposal and provide feedback on technical feasibility",
    category: "Work",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-16",
    relevance: 0.92
  },
  {
    id: 4,
    type: "task",
    title: "Complete React tutorial",
    content: "Finish the advanced React patterns course including hooks and context",
    category: "Learning",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-20",
    relevance: 0.85
  },
  
  // Events
  {
    id: 5,
    type: "event",
    title: "Client Presentation",
    content: "Present quarterly results to key client and discuss next phase",
    category: "Work",
    date: "2024-01-16",
    time: "14:00",
    location: "Virtual - Zoom",
    relevance: 0.90
  },
  {
    id: 6,
    type: "event",
    title: "Code Review Session",
    content: "Review pull requests and discuss code improvements with the team",
    category: "Work",
    date: "2024-01-18",
    time: "10:30",
    location: "Dev Room",
    relevance: 0.83
  }
];

const searchFilters = [
  { value: "all", label: "All Results", icon: SearchIcon },
  { value: "note", label: "Notes", icon: FileText },
  { value: "task", label: "Tasks", icon: CheckSquare },
  { value: "event", label: "Events", icon: Calendar }
];

const categories = ["All", "Work", "Personal", "Learning", "Health"];

const recentSearches = [
  "project meeting",
  "react patterns",
  "client presentation",
  "code review",
  "fitness goals"
];

const trendingSearches = [
  "quarterly review",
  "team standup",
  "backend architecture",
  "UI redesign",
  "productivity tips"
];

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        performSearch(searchQuery);
        setIsSearching(false);
        setHasSearched(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [searchQuery, selectedFilter, selectedCategory]);

  const performSearch = (query: string) => {
    let results = mockData.filter(item => {
      const matchesQuery = 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase())));
      
      const matchesFilter = selectedFilter === "all" || item.type === selectedFilter;
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      
      return matchesQuery && matchesFilter && matchesCategory;
    });

    // Sort by relevance (in a real app, this would be more sophisticated)
    results = results.sort((a, b) => b.relevance - a.relevance);
    setSearchResults(results);
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "note":
        return FileText;
      case "task":
        return CheckSquare;
      case "event":
        return Calendar;
      default:
        return SearchIcon;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case "note":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "task":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "event":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const highlightSearchTerm = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const SearchResultItem = ({ item }: { item: any }) => {
    const ItemIcon = getItemIcon(item.type);
    
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getItemColor(item.type)}`}>
              <ItemIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">
                  {highlightSearchTerm(item.title, searchQuery)}
                </h4>
                <Badge variant="outline" className="text-xs">
                  {Math.round(item.relevance * 100)}% match
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {highlightSearchTerm(item.content, searchQuery)}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <Badge className={getItemColor(item.type)}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Badge>
                
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
                
                {item.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                )}
                
                {item.priority && (
                  <Badge 
                    variant="outline" 
                    className={
                      item.priority === "high" 
                        ? "border-red-200 text-red-700 dark:border-red-800 dark:text-red-300"
                        : item.priority === "medium"
                        ? "border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300"
                        : "border-gray-200 text-gray-700 dark:border-gray-800 dark:text-gray-300"
                    }
                  >
                    {item.priority}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Search</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Find notes, tasks, and events quickly across all your content
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search across all your content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-12 text-lg"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Advanced Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                {searchFilters.map(filter => {
                  const Icon = filter.icon;
                  return (
                    <TabsTrigger key={filter.value} value={filter.value} className="text-xs sm:text-sm">
                      <Icon className="w-3 h-3 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{filter.label}</span>
                      <span className="sm:hidden">{filter.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Search Results or Default Content */}
      {hasSearched ? (
        <div className="space-y-4">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">
                  Search Results ({searchResults.length})
                </h2>
                {searchResults.length > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Found in {Math.random() * 100 + 50 | 0}ms
                  </p>
                )}
              </div>
              
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map(item => (
                    <SearchResultItem key={`${item.type}-${item.id}`} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Searches
              </CardTitle>
              <CardDescription>
                Your recently searched items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleQuickSearch(search)}
                    className="w-full justify-start h-auto p-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Searches
              </CardTitle>
              <CardDescription>
                Popular searches this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {trendingSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleQuickSearch(search)}
                    className="w-full justify-start h-auto p-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search Tips */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Search Tips</CardTitle>
              <CardDescription>
                Get the most out of your search experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Quick Filters</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use the filter tabs to search within specific content types (Notes, Tasks, Events)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Category Search</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Filter by category (Work, Personal, Learning, Health) to narrow down results
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Search Syntax</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Search works across titles, content, and tags for comprehensive results
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Relevance Scoring</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Results are ranked by relevance to help you find what you're looking for faster
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}