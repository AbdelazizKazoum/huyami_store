import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hover = false,
}) => {
  const baseClasses = "bg-theme-primary rounded-lg transition-all duration-300";

  const variantClasses = {
    default: "shadow-sm border border-theme-light",
    elevated: "shadow-lg border border-theme-light",
    outlined: "border-2 border-theme-medium",
    flat: "border border-theme-light",
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const hoverClasses = hover
    ? "hover:shadow-xl hover:-translate-y-2 transform"
    : "";

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hoverClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

export default Card;
