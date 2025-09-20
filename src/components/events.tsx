import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Bell,
  Upload,
  FileText,
  Save,
  Grid3X3
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
// Mock date functions for this demo
const format = (date: Date, formatString: string) => {
  if (formatString === "PPP") return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  if (formatString === "yyyy-MM-dd") return date.toISOString().split('T')[0];
  if (formatString === "EEEE, MMMM d, yyyy") return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  if (formatString === "EEE") return date.toLocaleDateString('en-US', { weekday: 'short' });
  if (formatString === "d") return date.getDate().toString();
  if (formatString === "MMMM d, yyyy") return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  if (formatString === "HH:mm") {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return date.toLocaleDateString();
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const startOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day;
  result.setDate(diff);
  return result;
};

const addWeeks = (date: Date, weeks: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + (weeks * 7));
  return result;
};

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const parseISO = (dateString: string) => {
  return new Date(dateString);
};

// Sample timetable data
const sampleTimetable = {
  name: "Fall Semester 2024",
  timeSlots: [
    "09:00-10:00",
    "10:00-11:00", 
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00"
  ],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  schedule: {
    "Monday": {
      "09:00-10:00": { subject: "Mathematics", room: "Room 101", notes: "" },
      "10:00-11:00": { subject: "Physics", room: "Lab A", notes: "Bring calculator" },
      "11:00-12:00": { subject: "", room: "", notes: "" },
      "12:00-13:00": { subject: "Lunch Break", room: "", notes: "" },
      "13:00-14:00": { subject: "Computer Science", room: "Room 203", notes: "Assignment due today" },
      "14:00-15:00": { subject: "Computer Science", room: "Room 203", notes: "" },
      "15:00-16:00": { subject: "", room: "", notes: "" },
      "16:00-17:00": { subject: "", room: "", notes: "" }
    },
    "Tuesday": {
      "09:00-10:00": { subject: "Chemistry", room: "Lab B", notes: "Lab coat required" },
      "10:00-11:00": { subject: "Mathematics", room: "Room 101", notes: "" },
      "11:00-12:00": { subject: "English", room: "Room 105", notes: "" },
      "12:00-13:00": { subject: "Lunch Break", room: "", notes: "" },
      "13:00-14:00": { subject: "History", room: "Room 202", notes: "" },
      "14:00-15:00": { subject: "Physics", room: "Lab A", notes: "" },
      "15:00-16:00": { subject: "", room: "", notes: "" },
      "16:00-17:00": { subject: "", room: "", notes: "" }
    },
    "Wednesday": {
      "09:00-10:00": { subject: "Mathematics", room: "Room 101", notes: "" },
      "10:00-11:00": { subject: "English", room: "Room 105", notes: "Essay submission" },
      "11:00-12:00": { subject: "Computer Science", room: "Room 203", notes: "" },
      "12:00-13:00": { subject: "Lunch Break", room: "", notes: "" },
      "13:00-14:00": { subject: "Chemistry", room: "Lab B", notes: "" },
      "14:00-15:00": { subject: "Physics", room: "Lab A", notes: "" },
      "15:00-16:00": { subject: "", room: "", notes: "" },
      "16:00-17:00": { subject: "", room: "", notes: "" }
    },
    "Thursday": {
      "09:00-10:00": { subject: "History", room: "Room 202", notes: "" },
      "10:00-11:00": { subject: "Chemistry", room: "Lab B", notes: "" },
      "11:00-12:00": { subject: "Mathematics", room: "Room 101", notes: "Quiz today" },
      "12:00-13:00": { subject: "Lunch Break", room: "", notes: "" },
      "13:00-14:00": { subject: "English", room: "Room 105", notes: "" },
      "14:00-15:00": { subject: "Computer Science", room: "Room 203", notes: "" },
      "15:00-16:00": { subject: "", room: "", notes: "" },
      "16:00-17:00": { subject: "", room: "", notes: "" }
    },
    "Friday": {
      "09:00-10:00": { subject: "Physics", room: "Lab A", notes: "" },
      "10:00-11:00": { subject: "Computer Science", room: "Room 203", notes: "Project presentation" },
      "11:00-12:00": { subject: "Chemistry", room: "Lab B", notes: "" },
      "12:00-13:00": { subject: "Lunch Break", room: "", notes: "" },
      "13:00-14:00": { subject: "Mathematics", room: "Room 101", notes: "" },
      "14:00-15:00": { subject: "History", room: "Room 202", notes: "" },
      "15:00-16:00": { subject: "", room: "", notes: "" },
      "16:00-17:00": { subject: "", room: "", notes: "" }
    }
  }
};

const sampleEvents = [
  {
    id: 1,
    title: "Team Standup",
    description: "Daily team synchronization meeting",
    date: "2024-01-16",
    time: "09:00",
    duration: 30,
    type: "meeting",
    location: "Conference Room A",
    attendees: ["John Doe", "Jane Smith", "Mike Johnson"],
    isRecurring: true,
    color: "blue"
  },
  {
    id: 2,
    title: "Client Presentation",
    description: "Present quarterly results to key client",
    date: "2024-01-16",
    time: "14:00",
    duration: 60,
    type: "presentation",
    location: "Virtual - Zoom",
    attendees: ["Sarah Wilson", "Client Team"],
    isRecurring: false,
    color: "green"
  },
  {
    id: 3,
    title: "Gym Session",
    description: "Strength training workout",
    date: "2024-01-17",
    time: "18:00",
    duration: 90,
    type: "personal",
    location: "Fitness Center",
    attendees: [],
    isRecurring: true,
    color: "orange"
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review pull requests and discuss improvements",
    date: "2024-01-18",
    time: "10:30",
    duration: 45,
    type: "work",
    location: "Dev Room",
    attendees: ["Tech Team"],
    isRecurring: false,
    color: "purple"
  },
  {
    id: 5,
    title: "Doctor Appointment",
    description: "Annual health checkup",
    date: "2024-01-19",
    time: "15:30",
    duration: 60,
    type: "health",
    location: "Medical Center",
    attendees: [],
    isRecurring: false,
    color: "red"
  }
];

const eventTypes = [
  { value: "meeting", label: "Meeting", icon: Users },
  { value: "presentation", label: "Presentation", icon: Video },
  { value: "personal", label: "Personal", icon: CalendarIcon },
  { value: "work", label: "Work", icon: Clock },
  { value: "health", label: "Health", icon: Bell }
];

const colors = [
  { name: "blue", bg: "bg-blue-500", light: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300" },
  { name: "green", bg: "bg-green-500", light: "bg-green-100 dark:bg-green-900/20", text: "text-green-700 dark:text-green-300" },
  { name: "orange", bg: "bg-orange-500", light: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-300" },
  { name: "purple", bg: "bg-purple-500", light: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-300" },
  { name: "red", bg: "bg-red-500", light: "bg-red-100 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300" }
];

export function Events() {
  const [events, setEvents] = useState(sampleEvents);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [view, setView] = useState("calendar");
  const [isCreating, setIsCreating] = useState(false);
  const [timetable, setTimetable] = useState(sampleTimetable);
  const [editingCell, setEditingCell] = useState<{day: string, time: string} | null>(null);
  const [cellNotes, setCellNotes] = useState("");
  const [isUploadingTimetable, setIsUploadingTimetable] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    duration: 60,
    type: "meeting",
    location: "",
    color: "blue"
  });

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const getColorConfig = (colorName: string) => {
    return colors.find(c => c.name === colorName) || colors[0];
  };

  const getTypeIcon = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.icon : CalendarIcon;
  };

  const handleCreateEvent = () => {
    if (newEvent.title.trim()) {
      const event = {
        id: Date.now(),
        ...newEvent,
        date: format(newEvent.date, "yyyy-MM-dd"),
        attendees: [],
        isRecurring: false
      };
      setEvents([...events, event]);
      setNewEvent({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        duration: 60,
        type: "meeting",
        location: "",
        color: "blue"
      });
      setIsCreating(false);
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const updateTimetableNotes = (day: string, time: string, notes: string) => {
    setTimetable(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...(prev.schedule as any)[day],
          [time]: {
            ...(prev.schedule as any)[day][time],
            notes
          }
        }
      }
    }));
  };

  const handleEditCell = (day: string, time: string) => {
    setEditingCell({ day, time });
    setCellNotes((timetable.schedule as any)[day][time].notes);
  };

  const handleSaveNotes = () => {
    if (editingCell) {
      updateTimetableNotes(editingCell.day, editingCell.time, cellNotes);
      setEditingCell(null);
      setCellNotes("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would parse the file here
      // For demo purposes, we'll just show a success message
      alert(`Timetable "${file.name}" uploaded successfully! You can now edit your schedule and add notes.`);
      setIsUploadingTimetable(false);
    }
  };

  const EventCard = ({ event, compact = false }: { event: any; compact?: boolean }) => {
    const colorConfig = getColorConfig(event.color);
    const TypeIcon = getTypeIcon(event.type);
    const endTime = new Date(`2000-01-01T${event.time}:00`);
    endTime.setMinutes(endTime.getMinutes() + event.duration);

    return (
      <Card className={`group transition-all duration-200 hover:shadow-md ${colorConfig.light} border-l-4 ${colorConfig.bg.replace('bg-', 'border-l-')}`}>
        <CardContent className={compact ? "p-3" : "p-4"}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TypeIcon className="w-4 h-4" />
                <h4 className={`font-medium ${compact ? 'text-sm' : ''}`}>{event.title}</h4>
                {event.isRecurring && (
                  <Badge variant="outline" className="text-xs">
                    Recurring
                  </Badge>
                )}
              </div>
              
              {!compact && event.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {event.description}
                </p>
              )}
              
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>
                    {event.time} - {format(endTime, "HH:mm")} ({event.duration}min)
                  </span>
                </div>
                
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {event.attendees.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees.length} attendees</span>
                  </div>
                )}
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteEvent(event.id)} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Events</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your schedule and upcoming events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="timetable">Timetable</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Schedule a new event or meeting with details and attendees.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(newEvent.date, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newEvent.date}
                        onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Duration (min)"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({ ...newEvent, duration: parseInt(e.target.value) || 60 })}
                  />
                </div>
                <Input
                  placeholder="Location (optional)"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
                <Select value={newEvent.color} onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color.name} value={color.name}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${color.bg}`} />
                          {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700">
                    Create Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content based on view */}
      <div className="space-y-6">
        {view === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="lg:col-span-1 xl:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border-0"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2 xl:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Events for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </CardTitle>
                  <CardDescription>
                    {getEventsForDate(selectedDate).length} events scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {getEventsForDate(selectedDate).map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                      {getEventsForDate(selectedDate).length === 0 && (
                        <div className="text-center py-8">
                          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400">
                            No events scheduled for this day
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {view === "week" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Week of {format(currentWeek, "MMMM d, yyyy")}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}>
                  Previous
                </Button>
                <Button variant="outline" onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
                  Next
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 xl:grid-cols-7 gap-4 xl:gap-6">
              {weekDays.map(day => (
                <Card key={day.toISOString()} className="h-[300px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {format(day, "EEE")}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold">
                      {format(day, "d")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <ScrollArea className="h-[220px]">
                      <div className="space-y-2">
                        {getEventsForDate(day).map(event => (
                          <EventCard key={event.id} event={event} compact />
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === "list" && (
          <div className="columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 gap-6 space-y-4">
            {events.length > 0 ? (
              events
                .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
                .map(event => (
                  <div key={event.id} className="break-inside-avoid mb-4">
                    <EventCard event={event} />
                  </div>
                ))
            ) : (
              <div className="text-center py-12 col-span-full">
                <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No events scheduled</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start by creating your first event
                </p>
                <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            )}
          </div>
        )}

        {view === "timetable" && (
          <div className="space-y-6">
            {/* Timetable Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{timetable.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Click on any cell to add personal notes about your classes
                </p>
              </div>
              <div className="flex gap-3">
                <Dialog open={isUploadingTimetable} onOpenChange={setIsUploadingTimetable}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Timetable
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Timetable</DialogTitle>
                      <DialogDescription>
                        Upload your class schedule in CSV, Excel, or image format. We'll help you convert it to an editable timetable.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          accept=".csv,.xlsx,.xls,.jpg,.jpeg,.png,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="timetable-upload"
                        />
                        <label htmlFor="timetable-upload" className="cursor-pointer">
                          <Grid3X3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium mb-2">Choose file to upload</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Supported formats: CSV, Excel, Images, PDF
                          </p>
                        </label>
                      </div>
                      <Button variant="outline" onClick={() => setIsUploadingTimetable(false)} className="w-full">
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Timetable Grid */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="border border-gray-200 dark:border-gray-700 p-4 text-left font-medium min-w-[120px]">
                          Time
                        </th>
                        {timetable.days.map(day => (
                          <th key={day} className="border border-gray-200 dark:border-gray-700 p-4 text-left font-medium min-w-[200px]">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timetable.timeSlots.map(timeSlot => (
                        <tr key={timeSlot}>
                          <td className="border border-gray-200 dark:border-gray-700 p-4 font-medium bg-gray-50 dark:bg-gray-800">
                            {timeSlot}
                          </td>
                          {timetable.days.map(day => {
                            const cell = (timetable.schedule as any)[day][timeSlot];
                            const isEmpty = !cell.subject || cell.subject === "Lunch Break";
                            const isBreak = cell.subject === "Lunch Break";
                            
                            return (
                              <td 
                                key={`${day}-${timeSlot}`} 
                                className={`border border-gray-200 dark:border-gray-700 p-2 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                  isBreak ? 'bg-orange-50 dark:bg-orange-900/20' : 
                                  isEmpty ? 'bg-gray-25 dark:bg-gray-900/50' : 'bg-white dark:bg-gray-900'
                                }`}
                                onClick={() => !isBreak && handleEditCell(day, timeSlot)}
                              >
                                <div className="space-y-1">
                                  {cell.subject && (
                                    <div className={`font-medium text-sm ${isBreak ? 'text-orange-700 dark:text-orange-300' : ''}`}>
                                      {cell.subject}
                                    </div>
                                  )}
                                  {cell.room && (
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                      {cell.room}
                                    </div>
                                  )}
                                  {cell.notes && (
                                    <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded px-2 py-1 mt-1">
                                      <FileText className="w-3 h-3 inline mr-1" />
                                      {cell.notes}
                                    </div>
                                  )}
                                  {!isEmpty && !isBreak && !cell.notes && (
                                    <div className="text-xs text-gray-400 italic">
                                      Click to add notes
                                    </div>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Edit Notes Dialog */}
            <Dialog open={editingCell !== null} onOpenChange={() => setEditingCell(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Notes</DialogTitle>
                  <DialogDescription>
                    {editingCell && `Add personal notes for ${(timetable.schedule as any)[editingCell.day][editingCell.time].subject || 'this time slot'} on ${editingCell.day} at ${editingCell.time}`}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {editingCell && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{editingCell.time}</span>
                        <span className="text-gray-600 dark:text-gray-400">•</span>
                        <span className="font-medium">{editingCell.day}</span>
                      </div>
                      {(timetable.schedule as any)[editingCell.day][editingCell.time].subject && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Subject:</strong> {(timetable.schedule as any)[editingCell.day][editingCell.time].subject}
                        </div>
                      )}
                      {(timetable.schedule as any)[editingCell.day][editingCell.time].room && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Room:</strong> {(timetable.schedule as any)[editingCell.day][editingCell.time].room}
                        </div>
                      )}
                    </div>
                  )}
                  <Textarea
                    placeholder="Add your personal notes here... (e.g., 'Bring calculator', 'Assignment due', 'Quiz today', etc.)"
                    value={cellNotes}
                    onChange={(e) => setCellNotes(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setEditingCell(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveNotes} className="bg-blue-600 hover:bg-blue-700 gap-2">
                      <Save className="w-4 h-4" />
                      Save Notes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}