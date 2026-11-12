import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Alexandria } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://romanygeorge.com"),
  title: {
    default: "روماني جورج | Romany Goerge - فلوجات سفر واستكشاف ومغامرات في مصر",
    template: "%s | روماني جورج - Romany Goerge",
  },
  description:
    "الموقع الرسمي للرحالة وصانع المحتوى روماني جورج (Romany Goerge). فلوجات سفر حقيقية واستكشاف في دهب والإسكندرية ومصر، تجارب دايفنج، كياك، وسفاري، وأسرار السفر بأقل ميزانية.",
  keywords: [
    "Romany Goerge",
    "روماني جورج",
    "سياحة في مصر",
    "السفر في مصر",
    "دليل السفر في مصر",
    "سياحة داخلية",
    "فلوج دهب",
    "الدايفنج في دهب",
    "ارخص شاطئ في الاسكندرية",
    "اماكن الخروج في رأس السنه في مصر",
    "سفاري بيتش باجي دهب",
    "كياك دهب",
    "الاكل في دهب",
    "تطبيقات السفر",
    "رحلات اقتصادية في مصر",
    "Egypt travel vlog",
    "tourism in Egypt",
    "budget travel Egypt",
    "Dahab travel guide",
    "Alexandria beach guide",
  ],
  authors: [{ name: "روماني جورج (Romany Goerge)", url: "https://www.youtube.com/@RomanyGoerge25" }],
  creator: "روماني جورج",
  publisher: "Romany Goerge Studio",
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
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "googlefd279e11798c7168",
  },
  openGraph: {
    title: "روماني جورج | Romany Goerge - فلوجات سفر واستكشاف ومغامرات في مصر",
    description:
      "فلوجات سفر حقيقية واستكشاف في دهب والإسكندرية وكل مكان في مصر. شاهد أحدث الفيديوهات، أدلة السفر الاقتصادية، والأنشطة البحرية والجبلية.",
    url: "https://romanygeorge.com",
    siteName: "Romany Goerge Travel & Adventure",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "https://i.ytimg.com/vi/HBQn5QBOYpU/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "روماني جورج - فلوجات سفر ومغامرات في مصر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "روماني جورج | Romany Goerge - فلوجات سفر ومغامرات",
    description:
      "شاهد أحدث مغامرات واستكشافات السفر في مصر بأقل ميزانية مع روماني جورج على يوتيوب.",
    images: ["https://i.ytimg.com/vi/HBQn5QBOYpU/maxresdefault.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${alexandria.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="antialiased bg-[#fafafa] text-[#09090b]">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
