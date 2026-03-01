import type { Metadata } from "next";
import { Nanum_Myeongjo, Rubik, Libre_Franklin } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-subtitle",
});

const libreFranklin = Libre_Franklin({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "TastyRoad",
  description: "Application mobile de partage d'itinéraires gourmands",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nanumMyeongjo.variable} ${rubik.variable} ${libreFranklin.variable} antialiased`}
      >
        <Header />
        <main className="pb-24 pt-30 min-h-screen">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
