// Common types for the LifeOrganizer application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  notifications: {
    tasks: boolean;
    events: boolean;
    reminders: boolean;
  };
  defaultView: "dashboard" | "notes" | "tasks" | "events";
}

// Notes types
export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

// Tasks types
export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  tags: string[];
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

// Events types
export type EventType = "meeting" | "presentation" | "personal" | "work" | "health";

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  date: string; // ISO date string
  time: string; // HH:mm format
  duration: number; // minutes
  location?: string;
  attendees: string[];
  isRecurring: boolean;
  color: string;
  reminders?: EventReminder[];
}

export interface EventReminder {
  id: string;
  time: number; // minutes before event
  type: "notification" | "email";
}

// Timetable types
export interface TimetableCell {
  subject: string;
  room: string;
  notes: string;
}

export interface Timetable {
  name: string;
  timeSlots: string[];
  days: string[];
  schedule: Record<string, Record<string, TimetableCell>>;
}

// Search types
export interface SearchResult {
  id: string;
  type: "note" | "task" | "event";
  title: string;
  content: string;
  score: number;
  highlights: string[];
}

export interface SearchFilters {
  type?: "note" | "task" | "event";
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  status?: TaskStatus;
  priority?: TaskPriority;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
}