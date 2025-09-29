import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "new"
    | "discount";
  size?: "sm" | "md" | "lg";
  className?: string;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "static";
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  position = "static",
}) => {
  const baseClasses = "font-semibold rounded-full transition-all duration-300";

  const variantClasses = {
    primary: "bg-primary text-theme-inverse",
    secondary: "bg-secondary text-theme-inverse",
    success: "bg-primary-light text-primary-darker",
    warning: "bg-secondary-light text-theme-primary",
    error: "bg-red-500 text-white",
    new: "bg-secondary text-theme-inverse",
    discount:
      "bg-secondary text-theme-inverse shadow-lg transform group-hover:scale-110 group-hover:-rotate-6",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  const positionClasses = {
    "top-left": "absolute top-3 left-3",
    "top-right": "absolute top-3 right-3",
    "bottom-left": "absolute bottom-3 left-3",
    "bottom-right": "absolute bottom-3 right-3",
    static: "",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    positionClasses[position],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};

export default Badge;
