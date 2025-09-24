import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";
import StartProjectModal from "@/components/ui/StartProjectModal";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Antimatter AI — Digital Solutions That Matter",
    template: "%s | Antimatter AI",
  },
  description:
    "Antimatter AI designs and builds high-impact AI products, secure platforms, and modern web experiences.",
  applicationName: "Antimatter AI",
  metadataBase: new URL("https://www.antimatterai.com"),
  openGraph: {
    title: "Antimatter AI — Digital Solutions That Matter",
    description:
      "We empower organizations with AI that turns complex challenges into real outcomes.",
    url: "https://www.antimatterai.com",
    siteName: "Antimatter AI",
    images: [
      {
        url: "/images/clientsLightCurve.jpg",
        width: 1458,
        height: 86,
        alt: "Antimatter AI light curve graphic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antimatter AI — Digital Solutions That Matter",
    description:
      "We empower organizations with AI that turns complex challenges into real outcomes.",
    images: [
      {
        url: "/images/clientsLightCurve.jpg",
        alt: "Antimatter AI light curve graphic",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/images/glowingCircle2.png", type: "image/png" },
    ],
    shortcut: ["/images/glowingCircle2.png"],
    apple: [
      { url: "/images/glowingCircle2.png", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.className} antialiased overflow-x-hidden`}>
        <NavBar />
        <div className="relative">
          <Providers>{children}</Providers>
        </div>
        <StartProjectModal />
        <Footer />
      </body>
    </html>
  );
}
