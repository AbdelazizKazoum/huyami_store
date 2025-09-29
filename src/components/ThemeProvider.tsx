"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const locale = params?.locale as string;

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("huyami-theme") as Theme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme to document and handle locale attributes
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;

      // Handle theme
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      localStorage.setItem("huyami-theme", theme);

      // Handle locale attributes
      if (locale) {
        root.setAttribute("lang", locale);
        root.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
        root.classList.add("antialiased");
      }
    }
  }, [theme, mounted, locale]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("huyami-theme")) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent hydration mismatch - but still provide context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {!mounted ? <div className="opacity-0">{children}</div> : children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
