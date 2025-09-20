import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock, TrendingUp, Calendar, FileText, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const taskData = [
  { name: 'Mon', completed: 8, pending: 3 },
  { name: 'Tue', completed: 12, pending: 2 },
  { name: 'Wed', completed: 6, pending: 8 },
  { name: 'Thu', completed: 15, pending: 1 },
  { name: 'Fri', completed: 10, pending: 4 },
  { name: 'Sat', completed: 4, pending: 2 },
  { name: 'Sun', completed: 2, pending: 1 },
];

const categoryData = [
  { name: 'Work', value: 45, color: 'var(--productivity-blue)' },
  { name: 'Personal', value: 30, color: 'var(--success-green)' },
  { name: 'Health', value: 15, color: 'var(--warm-orange)' },
  { name: 'Learning', value: 10, color: '#8b5cf6' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/30 flex-1 sm:flex-initial">
          <h1 className="font-poppins text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Good morning! 👋
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12% this week
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 xl:gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Tasks Completed</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">24</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">+3 from yesterday</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Projects</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">8</p>
                <p className="text-xs text-green-600 dark:text-green-400">2 due this week</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Notes Created</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">156</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">+12 this week</p>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Events Today</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">5</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Next in 2 hours</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Task Progress */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Task Progress</CardTitle>
            <CardDescription>
              Track your daily task completion over the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="completed" fill="var(--success-green)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="var(--warm-orange)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Categories */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Task Categories</CardTitle>
            <CardDescription>
              Distribution of your tasks by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category.name}: {category.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Focus */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today's Focus
          </CardTitle>
          <CardDescription>
            Your most important tasks and goals for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="font-medium">Complete project proposal review</span>
              </div>
              <Progress value={75} className="w-24" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-medium">Team standup meeting at 10 AM</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
                Scheduled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="font-medium">Update client documentation</span>
              </div>
              <Progress value={20} className="w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}