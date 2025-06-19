/**
 * Utilitaire pour gérer les chemins d'assets - Version simplifiée
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/lol-worlds-champions" : "";

export function getImagePath(
  imageName: string,
  category: "teams" | "roles" | "players" = "teams"
): string {
  return `${basePath}/images/${category}/${imageName}`;
}

export function getAssetPath(path: string): string {
  // Enlever le slash initial si présent pour éviter les doubles slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}
