// Application constants

export const APP_NAME = "LifeOrganizer";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION = "A modern productivity web application for organizing your life";

// Theme constants
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

// Storage keys
export const STORAGE_KEYS = {
  THEME: "lifeorganizer-theme",
  NOTES: "lifeorganizer-notes",
  TASKS: "lifeorganizer-tasks",
  EVENTS: "lifeorganizer-events",
  TIMETABLE: "lifeorganizer-timetable",
  USER_PREFERENCES: "lifeorganizer-preferences",
} as const;

// Color palette
export const COLORS = {
  PRODUCTIVITY_BLUE: "#3b82f6",
  SUCCESS_GREEN: "#10b981",
  WARM_ORANGE: "#f97316",
  GRAY: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
} as const;

// Event colors
export const EVENT_COLORS = [
  { name: "blue", bg: "bg-blue-500", light: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300" },
  { name: "green", bg: "bg-green-500", light: "bg-green-100 dark:bg-green-900/20", text: "text-green-700 dark:text-green-300" },
  { name: "orange", bg: "bg-orange-500", light: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-300" },
  { name: "purple", bg: "bg-purple-500", light: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-300" },
  { name: "red", bg: "bg-red-500", light: "bg-red-100 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300" },
] as const;

// Task priorities
export const TASK_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

// Task statuses
export const TASK_STATUSES = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;

// Event types
export const EVENT_TYPES = {
  MEETING: "meeting",
  PRESENTATION: "presentation",
  PERSONAL: "personal",
  WORK: "work",
  HEALTH: "health",
} as const;

// File upload settings
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: {
    IMAGES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    DOCUMENTS: ["application/pdf", "text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  },
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: "150ms",
  NORMAL: "300ms",
  SLOW: "500ms",
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  "2XL": "1536px",
} as const;

// Default time slots for timetable
export const DEFAULT_TIME_SLOTS = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
] as const;

// Days of the week
export const WEEKDAYS = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

export const ALL_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday", 
  "Thursday",
  "Friday",
  "Saturday",
] as const;