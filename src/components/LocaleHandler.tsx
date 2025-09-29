"use client";

import { useEffect } from "react";

interface LocaleHandlerProps {
  locale: string;
}

const LocaleHandler: React.FC<LocaleHandlerProps> = ({ locale }) => {
  useEffect(() => {
    // Update document attributes based on locale
    const htmlElement = document.documentElement;

    // Set language attribute
    htmlElement.setAttribute("lang", locale);

    // Set direction attribute for Arabic
    const direction = locale === "ar" ? "rtl" : "ltr";
    htmlElement.setAttribute("dir", direction);
  }, [locale]);

  // This component doesn't render anything
  return null;
};

export default LocaleHandler;
