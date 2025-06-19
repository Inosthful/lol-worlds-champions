import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worlds Champions",
  description: "Découvrez les champions du monde de League of Legends",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
