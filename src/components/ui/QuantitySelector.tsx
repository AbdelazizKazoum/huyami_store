import React from "react";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className = "",
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const sizeClasses = {
    sm: {
      container: "text-sm",
      button: "p-1",
      icon: 12,
      text: "px-2",
    },
    md: {
      container: "text-base",
      button: "p-2",
      icon: 16,
      text: "px-3",
    },
    lg: {
      container: "text-lg",
      button: "p-3",
      icon: 20,
      text: "px-4",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`flex items-center border border-theme-light rounded-full ${currentSize.container} ${className}`}
    >
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className={`${currentSize.button} text-theme-muted hover:bg-theme-tertiary rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
      >
        <Minus size={currentSize.icon} />
      </button>
      <span className={`${currentSize.text} font-bold text-theme-primary`}>
        {value}
      </span>
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className={`${currentSize.button} text-theme-muted hover:bg-theme-tertiary rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
      >
        <Plus size={currentSize.icon} />
      </button>
    </div>
  );
};

export default QuantitySelector;
