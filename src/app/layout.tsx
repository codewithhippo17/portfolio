import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import SocialSidebar from "@/components/SocialSidebar";
import EmailSidebar from "@/components/EmailSidebar";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  buildUrl,
  siteOpenGraph,
  siteTwitter,
  OG_IMAGE,
} from "@/lib/seo";
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
  metadataBase: new URL(buildUrl("/")),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Hamza El Haiba",
    "software engineer",
    "full-stack developer",
    "systems engineer",
    "architecture",
    "portfolio",
    "Morocco",
  ],
  authors: [{ name: SITE_NAME, url: buildUrl("/") }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: buildUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: siteOpenGraph("/", {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  }),
  twitter: siteTwitter({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  }),
  icons: {
    icon: [
      { url: "/portfolio/favicon.ico", sizes: "any" },
      { url: "/portfolio/icon.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/portfolio/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/portfolio/manifest.webmanifest",
  other: {
    "theme-color": "#1e1e2e", // Catppuccin Macchiato base
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col relative overflow-x-hidden"
      >
        {/* Main scrolling content with solid background to cover the sticky footer */}
        <div suppressHydrationWarning className="relative z-10 bg-background flex flex-col flex-grow w-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <Nav />
          <div className="max-w-3xl mx-auto w-full px-6 flex flex-col flex-grow relative ">
            <main className="flex-grow pt-16 pb-16">{children}</main>
            <div id="contact" className="mt-16 pt-16 pb-16 border-t border-ctp-surface0/50 scroll-mt-24">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* The sticky footer reveal component */}
        <StickyFooterReveal>
          <div className="max-w-3xl mx-auto w-full px-6">
            <Footer />
          </div>
        </StickyFooterReveal>

        <SocialSidebar />
        <EmailSidebar />
      </body>
    </html>
  );
}
