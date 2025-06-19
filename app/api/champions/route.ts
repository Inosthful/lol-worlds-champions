import { NextResponse } from "next/server"
import { worldsChampionsData } from "@/lib/data/worlds-champions"
import { enrichPlayersWithRiotData } from "@/lib/services/riot-api"

export async function GET() {
  try {
    // Pour la démo, on enrichit seulement les 2 dernières années pour éviter le rate limiting
    const recentChampions = worldsChampionsData.slice(0, 2)
    const staticChampions = worldsChampionsData.slice(2)

    const enrichedChampions = await enrichPlayersWithRiotData(recentChampions)

    return NextResponse.json([...enrichedChampions, ...staticChampions])
  } catch (error) {
    console.error("Erreur lors de l'enrichissement des données:", error)
    return NextResponse.json(worldsChampionsData)
  }
}
