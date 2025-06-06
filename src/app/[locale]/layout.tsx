import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";
import ClientProvider from "@/providers/ClientProvider";
import Header from "@/components/Header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { User } from "firebase/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mikomiko",
  description: "next genereation ai web app",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header initialUser={currentUser ? currentUser.toJSON() as User : null} />
        <ClientProvider>
          <NextIntlClientProvider>
            <ConfigProvider
              theme={{
                token: {
                  // Add any theme tokens you need
                },
              }}
            >
              {children}
            </ConfigProvider>
          </NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
