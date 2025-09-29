import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  badge?: string | number;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className = "",
      icon,
      badge,
      variant = "default",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary relative";

    const variantClasses = {
      default:
        "text-theme-secondary hover:text-primary-dark hover:bg-theme-tertiary",
      ghost:
        "text-theme-muted hover:text-theme-primary hover:bg-theme-tertiary",
      outline:
        "border border-theme-light text-theme-secondary hover:text-primary-dark hover:bg-theme-tertiary",
    };

    const sizeClasses = {
      sm: "p-1.5",
      md: "p-2",
      lg: "p-3",
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} {...props}>
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-primary text-theme-inverse text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {badge}
          </span>
        )}
        {children && <span className="ml-2 rtl:ml-0 rtl:mr-2">{children}</span>}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
