import type { Metadata, Viewport } from "next";
import { Cinzel, Krona_One, Montserrat, Poppins } from "next/font/google";
import EnquiryProvider from "@/components/enquiry/EnquiryProvider";
import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const krona = Krona_One({
  variable: "--font-krona",
  subsets: ["latin"],
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
