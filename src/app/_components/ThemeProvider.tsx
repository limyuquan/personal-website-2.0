"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setThemeState(initialTheme);
    updateTheme(initialTheme);
  }, []);

  const updateTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.style.setProperty("--bg-primary", "0 0 0"); // black
      root.style.setProperty("--bg-secondary", "17 24 39"); // gray-900
      root.style.setProperty("--bg-tertiary", "31 41 55"); // gray-800
      root.style.setProperty("--bg-card", "255 255 255 / 0.05"); // white/5
      root.style.setProperty("--bg-card-hover", "255 255 255 / 0.1"); // white/10
      
      root.style.setProperty("--text-primary", "255 255 255"); // white
      root.style.setProperty("--text-secondary", "209 213 219"); // gray-300
      root.style.setProperty("--text-tertiary", "156 163 175"); // gray-400
      root.style.setProperty("--text-muted", "107 114 128"); // gray-500
      
      root.style.setProperty("--border-primary", "255 255 255 / 0.1"); // white/10
      root.style.setProperty("--border-secondary", "255 255 255 / 0.2"); // white/20
      root.style.setProperty("--border-hover", "255 255 255 / 0.3"); // white/30
      
      root.style.setProperty("--nav-bg", "0 0 0 / 0.8"); // black/80
      root.style.setProperty("--nav-border", "255 255 255 / 0.1"); // white/10
      
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.style.setProperty("--bg-primary", "255 255 255"); // white
      root.style.setProperty("--bg-secondary", "249 250 251"); // gray-50
      root.style.setProperty("--bg-tertiary", "243 244 246"); // gray-100
      root.style.setProperty("--bg-card", "0 0 0 / 0.05"); // black/5
      root.style.setProperty("--bg-card-hover", "0 0 0 / 0.1"); // black/10
      
      root.style.setProperty("--text-primary", "17 24 39"); // gray-900
      root.style.setProperty("--text-secondary", "55 65 81"); // gray-700
      root.style.setProperty("--text-tertiary", "107 114 128"); // gray-500
      root.style.setProperty("--text-muted", "156 163 175"); // gray-400
      
      root.style.setProperty("--border-primary", "0 0 0 / 0.1"); // black/10
      root.style.setProperty("--border-secondary", "0 0 0 / 0.2"); // black/20
      root.style.setProperty("--border-hover", "0 0 0 / 0.3"); // black/30
      
      root.style.setProperty("--nav-bg", "255 255 255 / 0.8"); // white/80
      root.style.setProperty("--nav-border", "0 0 0 / 0.1"); // black/10
      
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    updateTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return <div className="bg-black text-white">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 