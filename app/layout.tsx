import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worlds Champions",
  description: "Découvrez les champions du monde de League of Legends",
  generator: "v0.dev",
  icons: {
    icon: "/images/teams/worlds.png",
    shortcut: "/images/teams/worlds.png",
    apple: "/images/teams/worlds.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/teams/worlds.png" type="image/png" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
