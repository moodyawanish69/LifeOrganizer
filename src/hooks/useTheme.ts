import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Listen for system theme changes when theme is set to "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setLightTheme = () => setTheme("light");
  const setDarkTheme = () => setTheme("dark");
  const setSystemTheme = () => setTheme("system");
  
  const toggleTheme = () => {
    if (theme === "light") {
      setDarkTheme();
    } else if (theme === "dark") {
      setLightTheme();
    } else {
      // If system, toggle to the opposite of current system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(systemTheme === "dark" ? "light" : "dark");
    }
  };

  return {
    theme,
    setTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    toggleTheme,
  };
}