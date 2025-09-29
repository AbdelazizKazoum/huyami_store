import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "rounded" | "search";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      type = "text",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-3 text-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300";

    const variantClasses = {
      default: "bg-theme-tertiary rounded-lg",
      rounded: "bg-theme-tertiary rounded-full",
      search: "bg-theme-tertiary rounded-full pl-12 pr-12",
    };

    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      error && "border-red-500 focus:ring-red-500",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-theme-primary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted">
              {leftIcon}
            </div>
          )}
          <input ref={ref} type={type} className={inputClasses} {...props} />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-theme-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
