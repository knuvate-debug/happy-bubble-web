import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happy Bubble English",
  description: "Happy Bubble English Web Learning MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
