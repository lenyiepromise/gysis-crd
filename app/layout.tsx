import type { Metadata } from "next";
// 1. Import Google Fonts
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

// 2. Configure Fonts
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const ibm = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gysis CRD",
  description: "Product Specification Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply Fonts to Body */}
      <body className={`${jetbrains.variable} ${ibm.variable} font-sans antialiased text-gysis-main bg-slate-50`}>
        
        {/* GLOBAL NAVBAR */}
        <nav className="bg-gysis-main sticky top-0 z-50 shadow-lg border-b border-white/10">
           <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              {/* BRAND AREA */}
              <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition">
                  {/* Logo Icon */}
                  <Image 
                    src="/logo.svg" 
                    alt="Gysis Logo" 
                    width={40} 
                    height={40} 
                    className="w-10 h-10"
                  />
                  {/* Divider */}
                  <div className="h-8 w-[1px] bg-white/20"></div>
                  {/* Wordmark (White filter applied via CSS if SVG is black, or assume SVG is colored) */}
                  {/* If your wordmark is dark, we might need a white version. For now, let's use text fallback or SVG */}
                  <span className="font-mono font-bold text-2xl text-white tracking-tighter">
                    GYSIS<span className="text-gysis-pop">CRD</span>
                  </span>
              </Link>
              
              {/* NAVIGATION */}
              <div className="flex gap-8 items-center">
                 <Link href="/dashboard" className="text-gray-300 hover:text-white font-mono text-sm tracking-wide">
                   {/* DASHBOARD */}
                 </Link>
                 <Link href="/wizard" className="bg-gysis-pop text-gysis-main px-6 py-3 rounded-none font-mono font-bold text-sm hover:bg-white hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                   START_PROJECT
                 </Link>
              </div>
           </div>
        </nav>

        {children}
      </body>
    </html>
  );
}