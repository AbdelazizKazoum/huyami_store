"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/products", label: "Products", icon: "📦" },
    { href: "/admin/categories", label: "Categories", icon: "📁" },
    { href: "/admin/orders", label: "Orders", icon: "🛒" },
    { href: "/admin/customers", label: "Customers", icon: "👥" },
    { href: "/admin/analytics", label: "Analytics", icon: "📈" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg border-r overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Admin Panel
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-t">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          Quick Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Products</span>
            <span className="font-semibold text-gray-900">1,234</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Active Orders</span>
            <span className="font-semibold text-green-600">56</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Customers</span>
            <span className="font-semibold text-gray-900">8,901</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
