"use client";

import { useEffect, useState } from "react";

export default function LanguagePreference() {
  const [savedLanguage, setSavedLanguage] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("preferred-language") || "en";
      setSavedLanguage(saved);
    }
  }, []);

  if (!savedLanguage) return null;

  return (
    <div className="text-sm text-gray-500 text-center py-2">
      Preferred language: {savedLanguage.toUpperCase()}
    </div>
  );
}
