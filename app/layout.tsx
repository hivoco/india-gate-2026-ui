import type { Metadata } from "next";
import { Overlock } from "next/font/google";
import localFont from "next/font/local";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

const overlock = Overlock({
  variable: "--font-overlock",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// OptimusPrinceps isn't on Google Fonts, so it's self-hosted from local .ttf files.
const optimusPrinceps = localFont({
  variable: "--font-optimus-princeps",
  src: [
    { path: "./fonts/OptimusPrinceps.ttf", weight: "400", style: "normal" },
    {
      path: "./fonts/OptimusPrincepsSemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "India Gate Basmati Rice",
  description: "World's No.1 basmati rice — the gold standard, perfectly aged.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${overlock.variable} ${optimusPrinceps.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Header />
        {children}
        <ScrollToTop className=" mb-2 sm:mr-25 " />
        <Footer />
      </body>
    </html>
  );
}
