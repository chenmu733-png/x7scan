import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X7Scan | Hyperliquid Explorer",
  description: "The most comprehensive Hyperliquid blockchain explorer. Track wallets, tokens, trades, liquidations, validators, and more in real-time.",
  keywords: ["Hyperliquid", "blockchain", "explorer", "DeFi", "trading", "crypto"],
  authors: [{ name: "X7Scan" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "X7Scan | Hyperliquid Explorer",
    description: "The most comprehensive Hyperliquid blockchain explorer",
    type: "website",
    locale: "en_US",
    siteName: "X7Scan",
  },
  twitter: {
    card: "summary_large_image",
    title: "X7Scan | Hyperliquid Explorer",
    description: "The most comprehensive Hyperliquid blockchain explorer",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
