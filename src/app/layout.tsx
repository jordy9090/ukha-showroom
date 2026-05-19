import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UKHA Showroom",
  description: "A quiet jewelry showroom and archive for UKHA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
