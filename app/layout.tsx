import type { Metadata } from "next";
import "./globals.css";

// Utilitaire pour les chemins d'assets
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/lol-worlds-champions" : "";

export const metadata: Metadata = {
  title: "Worlds Champions",
  description: "Découvrez les champions du monde de League of Legends",
  generator: "v0.dev",
  icons: {
    icon: `${basePath}/images/teams/worlds.png`,
    shortcut: `${basePath}/images/teams/worlds.png`,
    apple: `${basePath}/images/teams/worlds.png`,
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
        <link
          rel="icon"
          href={`${basePath}/images/teams/worlds.png`}
          type="image/png"
        />
        <link
          rel="shortcut icon"
          href={`${basePath}/images/teams/worlds.png`}
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href={`${basePath}/images/teams/worlds.png`}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
