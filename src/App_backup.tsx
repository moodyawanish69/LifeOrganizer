import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  FileText, 
  CheckSquare, 
  Calendar, 
  Search, 
  Settings, 
  Moon, 
  Sun,
  Bell,
  User,
  HelpCircle,
  BarChart3
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Dashboard } from "@/components/dashboard";
import { Notes } from "@/components/notes";
import { Tasks } from "@/components/tasks";
import { Events } from "@/components/events";
import { Search as SearchComponent } from "@/components/search";

const navigation = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
    badge: null
  },
  {
    title: "Notes",
    icon: FileText,
    id: "notes",
    badge: "156"
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    id: "tasks",
    badge: "12"
  },
  {
    title: "Events",
    icon: Calendar,
    id: "events",
    badge: "5"
  },
  {
    title: "Search",
    icon: Search,
    id: "search",
    badge: null
  }
];

const secondaryNavigation = [
  {
    title: "Analytics",
    icon: BarChart3,
    id: "analytics"
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings"
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    id: "help"
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || 
             (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "notes":
        return <Notes />;
      case "tasks":
        return <Tasks />;
      case "events":
        return <Events />;
      case "search":
        return <SearchComponent />;
      case "analytics":
        return (
          <div className="space-y-6">
            <div>
              <h1>Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your productivity trends and insights
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 text-center">
              <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced analytics and reporting features coming soon. Connect to Supabase to enable data persistence and advanced insights.
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1>Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Customize your LifeOrganizer experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-4">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark Mode</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleTheme}
                      className="gap-2"
                    >
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      {isDark ? "Light" : "Dark"}
                    </Button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Task Reminders</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-4">Account</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">Profile Settings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">Notification Preferences</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-4">Data & Privacy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your data is stored locally. Connect to Supabase for cloud sync and backup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "help":
        return (
          <div className="space-y-6">
            <div>
              <h1>Help & Support</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Get help and learn how to use LifeOrganizer effectively
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-8 text-center">
              <HelpCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Help Center</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Documentation, tutorials, and support resources to help you get the most out of LifeOrganizer.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar 
          className="border-r border-border/50" 
          collapsible="none"
          variant="sidebar"
        >
          <SidebarHeader className="border-b border-border/50 px-6 py-4">
            <Logo size="md" />
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4">
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={isActive}
                      className={`w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className={`text-xs ${
                            isActive 
                              ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20' 
                              : ''
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            <Separator className="my-4" />

            <SidebarMenu className="space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={isActive}
                      className={`w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          {/* Footer */}
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="gap-2"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {isDark ? "Light" : "Dark"}
                </span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header - only show on small screens */}
          <div className="flex h-16 items-center gap-4 border-b border-border/50 px-6 md:hidden">
            <SidebarTrigger className="-ml-2" />
            <Separator orientation="vertical" className="h-6" />
            <Logo size="sm" />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              <div className="animate-fadeIn">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}