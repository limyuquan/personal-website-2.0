import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Archivo } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { StructuredData } from "./_components/StructuredData";
import { GoogleAnalytics } from "./_components/GoogleAnalytics";
import { env } from "~/env";

export const metadata: Metadata = {
  title: {
    default:
      "Yu Quan Lim - Full-Stack Software Engineer & Computer Science Student",
    template: "%s | Yu Quan Lim",
  },
  description:
    "Yu Quan Lim is a Full-Stack Software Engineer and Computer Science student at NUS, Singapore. View my projects, experience, and work across modern web and backend systems.",
  keywords: [
    "Yu Quan Lim",
    "Full-Stack Software Engineer",
    "Computer Science",
    "NUS",
    "Singapore",
    "React",
    "Next.js",
    "Python",
    "Go",
    "Django",
    "FastAPI",
    "Web Development",
    "Software Developer",
    "Portfolio",
    "Projects",
    "ByteDance",
    "Backend Software Engineer",
    "Razer",
    "Multitwitcher",
    "Reflective Minds",
  ],
  authors: [{ name: "Yu Quan Lim", url: "https://www.limyuquan.com" }],
  creator: "Yu Quan Lim",
  publisher: "Yu Quan Lim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.limyuquan.com"),
  alternates: {
    canonical: "https://www.limyuquan.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.limyuquan.com",
    title:
      "Yu Quan Lim - Full-Stack Software Engineer & Computer Science Student",
    description:
      "Yu Quan Lim is a Full-Stack Software Engineer and Computer Science student at NUS, Singapore. View my projects, experience, and work across modern web and backend systems.",
    siteName: "Yu Quan Lim Portfolio",
    images: [
      {
        url: "https://www.limyuquan.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yu Quan Lim - Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Yu Quan Lim - Full-Stack Software Engineer & Computer Science Student",
    description:
      "Yu Quan Lim is a Full-Stack Software Engineer and Computer Science student at NUS, Singapore. View my projects, experience, and work across modern web and backend systems.",
    images: ["https://www.limyuquan.com/images/og-image.jpg"],
    creator: "@limyuquan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code-here",
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${archivo.variable}`}
    >
      <body className="bg-black">
        <StructuredData />
        {env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics gtag={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
