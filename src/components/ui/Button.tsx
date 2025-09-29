import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      children,
      fullWidth = false,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "bg-primary-dark text-theme-inverse hover:bg-primary-darker shadow-md",
      secondary:
        "bg-secondary text-theme-inverse hover:bg-secondary-dark shadow-md",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-theme-inverse",
      ghost: "text-primary hover:bg-primary-light",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-md",
      lg: "px-8 py-3 text-lg",
      xl: "px-10 py-4 text-xl",
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            جاري التحميل...
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
