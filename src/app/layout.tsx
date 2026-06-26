import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamza El Haiba",
  description: "Full-stack engineer building scalable web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`macchiato ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col md:flex-row max-w-5xl mx-auto px-6">
        <aside className="md:w-64 flex-shrink-0 md:h-screen md:sticky md:top-0 py-8 md:py-16 md:pr-8">
          <Nav />
        </aside>
        
        <div className="flex flex-col flex-grow min-w-0 py-8 md:py-16">
          <main className="flex-grow pb-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
