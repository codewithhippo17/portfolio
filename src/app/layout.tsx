import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactMadlibs from "@/components/ContactMadlibs";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import SocialSidebar from "@/components/SocialSidebar";
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
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        {/* Main scrolling content with solid background to cover the sticky footer */}
        <div className="relative z-10 bg-background flex flex-col flex-grow w-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <Nav />
          <div className="max-w-2xl mx-auto w-full px-6 flex flex-col flex-grow relative ">
            {/* Side panel — Scratchpad / Hire Me */}
            <main className="flex-grow pt-16 pb-16">{children}</main>
            <ContactMadlibs />
          </div>
        </div>

        {/* The sticky footer reveal component */}
        <StickyFooterReveal>
          <div className="max-w-2xl mx-auto w-full px-6">
            <Footer />
          </div>
        </StickyFooterReveal>

        <SocialSidebar />
      </body>
    </html>
  );
}
