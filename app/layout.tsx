import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import EnquiryProvider from "@/components/enquiry/EnquiryProvider";
import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Fonts are self-hosted (latin subset, downloaded from Google Fonts) so the
// build never has to reach fonts.googleapis.com, which can fail on CI.
const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "./fonts/Poppins-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});

const montserrat = localFont({
  variable: "--font-montserrat",
  src: "./fonts/Montserrat-Variable.woff2",
  weight: "100 900",
});

const cinzel = localFont({
  variable: "--font-cinzel",
  src: "./fonts/Cinzel-Variable.woff2",
  weight: "400 900",
  adjustFontFallback: "Times New Roman",
});

const krona = localFont({
  variable: "--font-krona",
  src: "./fonts/KronaOne-Regular.woff2",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "KM Developers | Creating Timeless Destinations",
    template: "%s | KM Developers",
  },
  description:
    "KM Developers – 50+ completed projects, 3,000+ units sold and 17+ years of building quality homes across Boisar, Naigaon and Mira-Bhayandar since 2009.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "KM Developers | Creating Timeless Destinations",
    description: "A history of building, a future of lasting value.",
    images: ["/images/cover.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#43461a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${cinzel.variable} ${krona.variable} antialiased`}
    >
      <body className="min-h-full font-sans">
        <EnquiryProvider>
          {children}
          <Footer />
          <FloatingActions />
        </EnquiryProvider>
      </body>
    </html>
  );
}
