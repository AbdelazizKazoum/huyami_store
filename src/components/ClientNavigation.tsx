"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";

export default function ClientNavigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href={`/${locale}`}
              className="text-xl font-bold text-gray-900"
            >
              Huyami Store
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href={`/${locale}`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("shop")}
              </Link>
              <Link
                href={`/${locale}/categories`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("categories")}
              </Link>
              <Link
                href={`/${locale}/cart`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("cart")}
              </Link>
            </div>
          </div>

          {/* Right side - Language and Account */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href={`/${locale}/login`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("login")}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {t("register")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
