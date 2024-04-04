import "./globals.css";
import type { Metadata } from "next";
import NextAuthProvider from "@/providers/NextAuth";
import Navbar from "./components/commonComponents/navigation/navbar";
import Sidebar from "./components/commonComponents/navigation/leftbar";
import GoogleAnalytics from "./components/commonComponents/GA4/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Footer from "./components/commonComponents/navigation/footer";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Image-Gallery",
  description: "shi0n0が個人で開発している画像投稿サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
      </head>
      <body className="bg-white">
        <NextAuthProvider>
          <Navbar />
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
