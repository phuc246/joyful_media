import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JOYFUL MEDIA | Celebrity & KOL Booking Vietnam",
  description:
    "JOYFUL MEDIA – Đơn vị hàng đầu về Celebrity Booking, KOL/KOC, Social Campaign và Production House tại Việt Nam. Đối tác chiến lược của Samsung, Yeah1, BYD, V.Rohto.",
  keywords: "joyful media, celebrity booking vietnam, KOL booking, KOC, social campaign, production house",
  authors: [{ name: "JOYFUL MEDIA" }],
  openGraph: {
    title: "JOYFUL MEDIA | Celebrity & KOL Booking Vietnam",
    description: "Đơn vị hàng đầu về Celebrity Booking, KOL/KOC & Production House tại Việt Nam",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-jakarta bg-white text-joyful-black antialiased">
        {children}
      </body>
    </html>
  );
}
