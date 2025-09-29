import React, { useState, useRef, useEffect } from "react";

interface DropdownItem {
  id: string;
  label: string;
  value: string;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  position?: "left" | "right" | "center";
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  className = "",
  position = "right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const positionClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-40 bg-theme-primary rounded-lg shadow-xl border border-theme-light z-50 ${positionClasses[position]}`}
        >
          {items.map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                item.onClick?.();
                setIsOpen(false);
              }}
              className="block px-4 py-2 text-theme-primary hover:bg-theme-tertiary first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
