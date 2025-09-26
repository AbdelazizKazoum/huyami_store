"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { locales } from "@/i18n/config";

export default function LanguageSelector() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    // Save the language preference in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", newLocale);
    }

    // Get the path without the current locale
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the locale segment
    const newPath = segments.join("/");
    router.push(newPath);
  };

  const currentLocale = pathname.split("/")[1];

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale === "en" && "🇺🇸 English"}
            {locale === "fr" && "🇫🇷 Français"}
            {locale === "ar" && "🇸🇦 العربية"}
          </option>
        ))}
      </select>
    </div>
  );
}
