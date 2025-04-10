import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import ProgressLoader from "@/providers/ProgressLoader";
import { Suspense } from "react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Garage B2B",
    template: "%s | Garage B2B",
  },
  description:
    "Дижитал Гараж B2B – авто засвар, сэлбэгийн бизнесүүдэд зориулсан захиалга, нийлүүлэлт, менежментийн нэгдсэн платформ.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "https://example.com",
    siteName: "Garage B2B",
    title: "Garage B2B",
    description:
      "Дижитал Гараж B2B – авто засвар, сэлбэгийн бизнесүүдэд зориулсан захиалга, нийлүүлэлт, менежментийн нэгдсэн платформ.",
    images: [
      {
        url: "/Head.png",
        width: 1200,
        height: 630,
        alt: "Garage B2B Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage B2B",
    description:
      "Дижитал Гараж B2B – авто засвар, сэлбэгийн бизнесүүдэд зориулсан захиалга, нийлүүлэлт, менежментийн нэгдсэн платформ.",
    images: ["/Head.png"],
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<div></div>}>
          {/* <ProgressLoader /> */}
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
