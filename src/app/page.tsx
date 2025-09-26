"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Function to get user's preferred language
    const getPreferredLanguage = (): string => {
      const supportedLanguages = ["en", "fr", "ar"];
      const defaultLanguage = "en";

      // Check if we're in the browser
      if (typeof window !== "undefined") {
        // Check for saved language preference in localStorage
        const savedLanguage = localStorage.getItem("preferred-language");
        if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
          return savedLanguage;
        }

        // Check browser language
        const browserLanguage = navigator.language.split("-")[0];
        if (supportedLanguages.includes(browserLanguage)) {
          return browserLanguage;
        }

        // Check if any of the browser languages are supported
        const browserLanguages = navigator.languages || [navigator.language];
        for (const lang of browserLanguages) {
          const langCode = lang.split("-")[0];
          if (supportedLanguages.includes(langCode)) {
            return langCode;
          }
        }
      }

      return defaultLanguage;
    };

    const preferredLanguage = getPreferredLanguage();

    // Save the detected/preferred language
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", preferredLanguage);
    }

    // Redirect to the appropriate language
    router.replace(`/${preferredLanguage}`);
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">🛍️</div>
        <h1 className="text-4xl font-bold mb-4">Huyami Store</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-lg opacity-90">Loading...</p>
      </div>
    </div>
  );
}
