import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { playersData } from "@/lib/data/players";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";

import {
  ArrowLeft,
  Crown,
  MapPin,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RoleIcon } from "@/components/icons/role-icon";
import { TeamIcon } from "@/components/icons/team-icon";

const regionColors = {
  LCK: "bg-red-100 text-red-800",
  LPL: "bg-yellow-100 text-yellow-800",
  LEC: "bg-blue-100 text-blue-800",
  LCS: "bg-green-100 text-green-800",
  LMS: "bg-purple-100 text-purple-800",
};

const flagEmojis: Record<string, string> = {
  KR: "🇰🇷",
  CN: "🇨🇳",
  TW: "🇹🇼",
  ES: "🇪🇸",
  FI: "🇫🇮",
  FR: "🇫🇷",
  EE: "🇪🇪",
};

interface TeamPageProps {
  params: { id: string };
}

export default function TeamPage({ params }: TeamPageProps) {
  const team = teamsData[params.id];

  if (!team) {
    notFound();
  }

  // Calculer les titres et informations de l'équipe
  const teamChampionships = worldsChampionsData.filter(
    (championship) => championship.teamId === team.id
  );

  // Tous les joueurs qui ont gagné avec cette équipe
  const allChampionPlayers = Array.from(
    new Set(teamChampionships.flatMap((championship) => championship.playerIds))
  )
    .map((id) => playersData[id])
    .filter(Boolean);

  // Statistiques
  const totalViewership = teamChampionships.reduce(
    (sum, championship) => sum + (championship.viewership || 0),
    0
  );
  const avgViewership =
    teamChampionships.length > 0
      ? totalViewership / teamChampionships.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Accueil
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Recherche
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-3xl">
              <TeamIcon
                teamName={team.name}
                teamId={team.id}
                className="h-8 w-8 text-slate-600"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{team.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  className={
                    regionColors[team.region as keyof typeof regionColors]
                  }
                >
                  {team.region}
                </Badge>
                {team.disbanded && (
                  <Badge variant="destructive">Équipe dissoute</Badge>
                )}
                {teamChampionships.length > 0 && (
                  <Badge className="bg-amber-100 text-amber-800">
                    <Crown className="h-3 w-3 mr-1" />
                    {teamChampionships.length} titre
                    {teamChampionships.length > 1 ? "s" : ""} Worlds
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations générales */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-600">Région</div>
                  <div className="font-medium">{team.region}</div>
                </div>

                {team.founded && (
                  <div>
                    <div className="text-sm text-slate-600">Fondée</div>
                    <div className="font-medium">{team.founded}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-slate-600">Statut</div>
                  <div className="font-medium">
                    {team.disbanded ? "Dissoute" : "Active"}
                    {teamChampionships.length > 0 && " • Championne du monde"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-600">
                    Joueurs champions
                  </div>
                  <div className="font-medium">
                    {allChampionPlayers.length} joueurs différents
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Titres Worlds</span>
                  <span className="font-bold text-amber-600">
                    {teamChampionships.length}
                  </span>
                </div>

                {teamChampionships.length > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Premier titre</span>
                      <span className="font-bold">
                        {Math.min(...teamChampionships.map((c) => c.year))}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-600">Dernier titre</span>
                      <span className="font-bold">
                        {Math.max(...teamChampionships.map((c) => c.year))}
                      </span>
                    </div>

                    {avgViewership > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Audience moyenne</span>
                        <span className="font-bold">
                          {(avgViewership / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Joueurs les plus titrés */}
            {allChampionPlayers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Top Joueurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allChampionPlayers
                      .map((player) => ({
                        player,
                        titles: teamChampionships.filter((c) =>
                          c.playerIds.includes(player.id)
                        ).length,
                      }))
                      .sort((a, b) => b.titles - a.titles)
                      .slice(0, 5)
                      .map(({ player, titles }) => (
                        <Link key={player.id} href={`/player/${player.id}`}>
                          <div className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <RoleIcon
                                role={player.role}
                                className="w-5 h-5 text-slate-600"
                              />
                              <div>
                                <div className="font-medium text-sm">
                                  {player.gameName}
                                </div>
                                <div className="text-xs text-slate-600">
                                  {player.role}
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {titles} titre{titles > 1 ? "s" : ""}
                            </Badge>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Palmarès et historique */}
          <div className="lg:col-span-2 space-y-6">
            {teamChampionships.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TeamIcon
                      teamName={team.name}
                      teamId={team.id}
                      className="h-5 w-5 text-amber-500"
                    />
                    Palmarès Worlds ({teamChampionships.length} titre
                    {teamChampionships.length > 1 ? "s" : ""})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teamChampionships
                      .sort((a, b) => b.year - a.year)
                      .map((championship) => {
                        const roster = championship.playerIds
                          .map((id) => playersData[id])
                          .filter(Boolean);

                        return (
                          <Card
                            key={championship.year}
                            className="bg-gradient-to-r from-amber-50 to-yellow-50"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="text-3xl font-bold text-amber-700">
                                    {championship.year}
                                  </div>
                                  <div>
                                    <div className="text-lg font-semibold text-slate-800">
                                      Champions du monde
                                    </div>
                                    <div className="text-sm text-slate-600">
                                      Finale : {championship.finalScore} vs{" "}
                                      {championship.runnerUp}
                                    </div>
                                  </div>
                                </div>
                                <TeamIcon
                                  teamName={team.name}
                                  teamId={team.id}
                                  className="h-10 w-10 text-amber-500"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                                <div>
                                  <div className="text-slate-600 mb-1">
                                    Lieu de la finale
                                  </div>
                                  <div className="flex items-center gap-1 font-medium">
                                    <MapPin className="h-4 w-4" />
                                    {championship.location}
                                  </div>
                                </div>

                                {championship.viewership && (
                                  <div>
                                    <div className="text-slate-600 mb-1">
                                      Audience
                                    </div>
                                    <div className="font-medium">
                                      {(
                                        championship.viewership / 1000000
                                      ).toFixed(1)}
                                      M spectateurs
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <div className="text-slate-600 mb-1">
                                    Prize Pool
                                  </div>
                                  <div className="font-medium">
                                    ${championship.prizePool.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="text-slate-600 mb-3">
                                  Roster champion
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                  {roster.map((player) => (
                                    <Link
                                      key={player.id}
                                      href={`/player/${player.id}`}
                                    >
                                      <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white">
                                        <CardContent className="p-3 text-center">
                                          <div className="text-xl mb-1">
                                            <RoleIcon
                                              role={player.role}
                                              className="w-8 h-8 text-slate-600"
                                            />
                                          </div>
                                          <div className="font-medium text-sm text-slate-800">
                                            {player.gameName}
                                          </div>
                                          <div className="text-xs text-slate-600">
                                            {player.role}
                                          </div>
                                          <div className="text-xs text-slate-500 mt-1">
                                            {flagEmojis[player.nationality]}{" "}
                                            {player.realName}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">
                    Aucun titre Worlds
                  </h3>
                  <p className="text-slate-500">
                    {
                      "Cette équipe n'a pas encore remporté de championnat du monde."
                    }
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tous les joueurs champions */}
            {allChampionPlayers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Tous les joueurs champions ({allChampionPlayers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {allChampionPlayers
                      .sort((a, b) => {
                        const aTitles = teamChampionships.filter((c) =>
                          c.playerIds.includes(a.id)
                        ).length;
                        const bTitles = teamChampionships.filter((c) =>
                          c.playerIds.includes(b.id)
                        ).length;
                        return bTitles - aTitles;
                      })
                      .map((player) => {
                        const playerTitles = teamChampionships.filter((c) =>
                          c.playerIds.includes(player.id)
                        );
                        return (
                          <Link key={player.id} href={`/player/${player.id}`}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                              <CardContent className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">
                                    <RoleIcon
                                      role={player.role}
                                      className="w-8 h-8 text-slate-600"
                                    />
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">
                                      {player.gameName}
                                    </div>
                                    <div className="text-xs text-slate-600">
                                      {player.role} •{" "}
                                      {flagEmojis[player.nationality]}
                                    </div>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {playerTitles.length}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Générer les pages statiques pour toutes les équipes
export async function generateStaticParams() {
  return Object.keys(teamsData).map((id) => ({
    id,
  }));
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: TeamPageProps) {
  const team = teamsData[params.id];

  if (!team) {
    return {
      title: "Équipe non trouvée",
    };
  }

  const championships = worldsChampionsData.filter(
    (championship) => championship.teamId === team.id
  );

  return {
    title: `${team.name} (${team.region}) - Worlds Champions`,
    description: `Profil détaillé de ${team.name}, équipe ${team.region}. ${
      championships.length > 0
        ? `Championne du monde ${championships.length} fois (${championships
            .map((c) => c.year)
            .join(", ")}).`
        : "Équipe professionnelle de League of Legends."
    }`,
  };
}
