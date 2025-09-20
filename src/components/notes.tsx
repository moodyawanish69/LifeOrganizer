import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Search, Filter, Tag, Calendar, MoreVertical, Edit, Trash2, Pin } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const sampleNotes = [
  {
    id: 1,
    title: "Project Meeting Notes",
    content: "Discussed new feature requirements and timeline. Key decisions made regarding the UI redesign and backend architecture...",
    category: "Work",
    tags: ["meeting", "project", "decisions"],
    date: "2024-01-15",
    isPinned: true,
    color: "blue"
  },
  {
    id: 2,
    title: "Learning React Patterns",
    content: "Compound components pattern allows you to create flexible and reusable component APIs. Examples include...",
    category: "Learning",
    tags: ["react", "patterns", "programming"],
    date: "2024-01-14",
    isPinned: false,
    color: "green"
  },
  {
    id: 3,
    title: "Vacation Planning",
    content: "Planning trip to Japan for next summer. Research destinations, book flights, check visa requirements...",
    category: "Personal",
    tags: ["travel", "vacation", "planning"],
    date: "2024-01-13",
    isPinned: false,
    color: "orange"
  },
  {
    id: 4,
    title: "Health Goals 2024",
    content: "Setting up a sustainable workout routine. Focus on strength training 3x/week and cardio 2x/week...",
    category: "Health",
    tags: ["fitness", "goals", "routine"],
    date: "2024-01-12",
    isPinned: true,
    color: "purple"
  }
];

const categories = ["All", "Work", "Personal", "Learning", "Health"];
const colors = [
  { name: "blue", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800" },
  { name: "green", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800" },
  { name: "orange", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800" },
  { name: "purple", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800" },
];

export function Notes() {
  const [notes, setNotes] = useState(sampleNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "Work",
    tags: "",
    color: "blue"
  });

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const regularNotes = filteredNotes.filter(note => !note.isPinned);

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Date.now(),
        ...newNote,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        date: new Date().toISOString().split('T')[0],
        isPinned: false
      };
      setNotes([note, ...notes]);
      setNewNote({ title: "", content: "", category: "Work", tags: "", color: "blue" });
      setIsCreating(false);
    }
  };

  const togglePin = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getColorClasses = (colorName: string) => {
    const color = colors.find(c => c.name === colorName);
    return color ? `${color.bg} ${color.border}` : "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800";
  };

  const NoteCard = ({ note }: { note: any }) => (
    <Card className={`group transition-all duration-200 hover:shadow-md ${getColorClasses(note.color)} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="w-3 h-3" />
              {new Date(note.date).toLocaleDateString()}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => togglePin(note.id)}>
                <Pin className="w-4 h-4 mr-2" />
                {note.isPinned ? "Unpin" : "Pin"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteNote(note.id)} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
          {note.content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Badge variant="outline" className="text-xs">
            {note.category}
          </Badge>
        </div>
        {note.isPinned && (
          <div className="flex justify-end mt-2">
            <Pin className="w-4 h-4 text-amber-500 fill-current" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Notes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Capture and organize your thoughts and ideas
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription>
                Add a new note to your collection. You can organize it with tags and categories.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Write your note content here..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={6}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select value={newNote.category} onValueChange={(value) => setNewNote({ ...newNote, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newNote.color} onValueChange={(value) => setNewNote({ ...newNote, color: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color.name} value={color.name}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${color.name}-500`} />
                          {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Tags (comma separated)"
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNote} className="bg-blue-600 hover:bg-blue-700">
                  Create Note
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-5 sm:w-auto">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Notes Grid */}
      <div className="space-y-6">
        {pinnedNotes.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Pin className="w-4 h-4 text-amber-500 fill-current" />
              Pinned Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-6">
              {pinnedNotes.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {regularNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h3 className="text-lg font-medium mb-4">All Notes</h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-6">
              {regularNotes.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No notes found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Start by creating your first note"}
            </p>
            <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}