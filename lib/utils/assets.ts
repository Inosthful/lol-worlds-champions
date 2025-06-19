/**
 * Utilitaire pour gérer les chemins d'assets en production et développement
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/lol-worlds-champions" : ""; // Remplacez par votre nom de repo

export function getAssetPath(path: string): string {
  // Assurer que le chemin commence par /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function getImagePath(
  imageName: string,
  category: "teams" | "roles" | "players" = "teams"
): string {
  return getAssetPath(`/images/${category}/${imageName}`);
}
