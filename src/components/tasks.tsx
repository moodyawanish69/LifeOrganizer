import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Plus, Calendar as CalendarIcon, Clock, Flag, GripVertical, MoreVertical, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
// Mock format function for this demo
const format = (date: Date, formatString: string) => {
  if (formatString === "PPP") return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  if (formatString === "yyyy-MM-dd") return date.toISOString().split('T')[0];
  if (formatString === "MMM dd") return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  return date.toLocaleDateString();
};

const sampleTasks = [
  {
    id: 1,
    title: "Review project proposal",
    description: "Go through the new client proposal and provide feedback",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-16",
    category: "Work",
    completed: false,
    progress: 60
  },
  {
    id: 2,
    title: "Grocery shopping",
    description: "Buy weekly groceries including fruits and vegetables",
    priority: "medium",
    status: "pending",
    dueDate: "2024-01-15",
    category: "Personal",
    completed: false,
    progress: 0
  },
  {
    id: 3,
    title: "Complete React tutorial",
    description: "Finish the advanced React patterns course",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-20",
    category: "Learning",
    completed: false,
    progress: 80
  },
  {
    id: 4,
    title: "Morning workout",
    description: "30-minute cardio session",
    priority: "low",
    status: "completed",
    dueDate: "2024-01-15",
    category: "Health",
    completed: true,
    progress: 100
  },
  {
    id: 5,
    title: "Client meeting preparation",
    description: "Prepare slides and agenda for tomorrow's client call",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-16",
    category: "Work",
    completed: false,
    progress: 0
  }
];

const priorities = [
  { value: "low", label: "Low", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
  { value: "high", label: "High", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" }
];

const statuses = ["all", "pending", "in-progress", "completed"];
const categories = ["All", "Work", "Personal", "Learning", "Health"];

export function Tasks() {
  const [tasks, setTasks] = useState(sampleTasks);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCreating, setIsCreating] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "Work",
    dueDate: new Date()
  });

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  const tasksByStatus = {
    pending: tasks.filter(t => t.status === "pending").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length
  };

  const completionRate = Math.round((tasksByStatus.completed / tasks.length) * 100);

  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        category: newTask.category,
        dueDate: format(newTask.dueDate, "yyyy-MM-dd"),
        status: "pending",
        completed: false,
        progress: 0
      };
      setTasks([task, ...tasks]);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        category: "Work",
        dueDate: new Date()
      });
      setIsCreating(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed, 
            status: !task.completed ? "completed" : "pending",
            progress: !task.completed ? 100 : 0
          } 
        : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskProgress = (id: number, progress: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            progress,
            status: progress === 100 ? "completed" : progress > 0 ? "in-progress" : "pending",
            completed: progress === 100
          } 
        : task
    ));
  };

  const getPriorityConfig = (priority: string) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  const TaskCard = ({ task }: { task: any }) => {
    const priorityConfig = getPriorityConfig(task.priority);
    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

    return (
      <Card className={`group transition-all duration-200 hover:shadow-md ${
        isOverdue ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10' : ''
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1"
            />
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                  )}
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
                    <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <Badge className={priorityConfig.color}>
                  <Flag className="w-3 h-3 mr-1" />
                  {priorityConfig.label}
                </Badge>
                <div className="flex items-center gap-1 text-gray-500">
                  <CalendarIcon className="w-3 h-3" />
                  {format(new Date(task.dueDate), "MMM dd")}
                  {isOverdue && <span className="text-red-500 ml-1">(Overdue)</span>}
                </div>
                <Badge variant="outline">{task.category}</Badge>
              </div>

              {!task.completed && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-1" />
                  <div className="flex gap-1">
                    {[0, 25, 50, 75, 100].map(value => (
                      <Button
                        key={value}
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => updateTaskProgress(task.id, value)}
                      >
                        {value}%
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
          <h1>Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your tasks and track progress
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your list with priority and due date.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                placeholder="Description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(newTask.dueDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newTask.dueDate}
                    onSelect={(date) => date && setNewTask({ ...newTask, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700">
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-6">
        <Card className="xl:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold">{tasksByStatus.pending}</p>
              </div>
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold">{tasksByStatus.inProgress}</p>
              </div>
              <div className="h-6 w-6 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold">{tasksByStatus.completed}</p>
              </div>
              <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
              <Progress value={completionRate} className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            {statuses.map(status => (
              <TabsTrigger key={status} value={status} className="text-xs sm:text-sm">
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
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

      {/* Tasks List */}
      <div className="columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 gap-6 space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="break-inside-avoid mb-4">
            <TaskCard task={task} />
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No tasks found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start by creating your first task
            </p>
            <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}