import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../globals.css";
import { Locale, locales } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Huyami Store",
  description: "Your premier shopping destination",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <main
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="antialiased"
    >
      <NextIntlClientProvider messages={messages}>
        {/* <ClientNavigation /> */}
        <main className="min-h-screen">{children}</main>
        {/* <Footer /> */}
      </NextIntlClientProvider>
    </main>
  );
}
