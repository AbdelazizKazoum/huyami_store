"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { IconButton } from "./";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  size = "md",
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <IconButton
        icon={<Moon size={24} />}
        onClick={() => {}}
        variant="ghost"
        size={size}
        className={`transition-transform duration-300 hover:scale-110 ${className} opacity-0`}
        aria-label="Loading theme toggle"
      />
    );
  }

  return (
    <IconButton
      icon={theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
      onClick={toggleTheme}
      variant="ghost"
      size={size}
      className={`transition-transform duration-300 hover:scale-110 ${className}`}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      title={
        theme === "light" ? "التبديل للوضع الليلي" : "التبديل للوضع النهاري"
      }
    />
  );
};

export default ThemeToggle;
