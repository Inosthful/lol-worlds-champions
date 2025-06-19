import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { playersData } from "@/lib/data/players";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";

import { RoleIcon } from "@/components/icons/role-icon";
import { TeamIcon } from "@/components/icons/team-icon";
import { ArrowLeft, Crown, MapPin, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const roleDescriptions = {
  TOP: "Top Lane",
  JUNGLE: "Jungle",
  MID: "Mid Lane",
  ADC: "Bot Lane",
  SUPPORT: "Support",
};

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

interface PlayerPageProps {
  params: { id: string };
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const player = playersData[params.id];

  if (!player) {
    notFound();
  }

  // Calculer les titres et informations du joueur
  const playerChampionships = worldsChampionsData.filter((championship) =>
    championship.playerIds.includes(player.id)
  );

  const playerTeams = Array.from(
    new Set(
      playerChampionships.map((championship) => ({
        team: teamsData[championship.teamId],
        year: championship.year,
      }))
    )
  );

  const currentAge = player.birthYear
    ? new Date().getFullYear() - player.birthYear
    : null;

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
              <RoleIcon role={player.role} className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {player.gameName}
              </h1>
              <p className="text-slate-600 text-lg">
                {flagEmojis[player.nationality]} {player.realName}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{player.role}</Badge>
                {player.currentTeam && !player.retiredYear && (
                  <Badge className="bg-green-100 text-green-800">
                    {player.currentTeam}
                  </Badge>
                )}
                {player.retiredYear && (
                  <Badge variant="destructive">
                    Retraité en {player.retiredYear}
                  </Badge>
                )}
                {playerChampionships.length > 0 && (
                  <Badge className="bg-amber-100 text-amber-800">
                    <Crown className="h-3 w-3 mr-1" />
                    {playerChampionships.length} titre
                    {playerChampionships.length > 1 ? "s" : ""} Worlds
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
                  <RoleIcon role={player.role} className="w-5 h-5" />
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-600">Rôle</div>
                  <div className="font-medium">
                    {roleDescriptions[player.role]}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-600">Nationalité</div>
                  <div className="font-medium">
                    {flagEmojis[player.nationality]} {player.nationality}
                  </div>
                </div>

                {player.birthYear && (
                  <div>
                    <div className="text-sm text-slate-600">Âge</div>
                    <div className="font-medium">
                      {currentAge} ans (né en {player.birthYear})
                    </div>
                  </div>
                )}

                {player.retiredYear && (
                  <div>
                    <div className="text-sm text-slate-600">Retraite</div>
                    <div className="font-medium text-red-600">
                      {player.retiredYear}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-slate-600">Statut</div>
                  <div className="font-medium">
                    {player.retiredYear ? "Retraité" : "Actif"}
                    {player.currentTeam &&
                      !player.retiredYear &&
                      ` • ${player.currentTeam}`}
                    {playerChampionships.length > 0 && " • Champion du monde"}
                  </div>
                </div>

                {player.currentTeam && !player.retiredYear && (
                  <div>
                    <div className="text-sm text-slate-600">
                      Équipe actuelle
                    </div>
                    <div className="font-medium text-blue-600">
                      {player.currentTeam}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistiques rapides */}
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
                    {playerChampionships.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Équipes championnes</span>
                  <span className="font-bold">{playerTeams.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Première victoire</span>
                  <span className="font-bold">
                    {playerChampionships.length > 0
                      ? Math.min(...playerChampionships.map((c) => c.year))
                      : "Aucune"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Dernière victoire</span>
                  <span className="font-bold">
                    {playerChampionships.length > 0
                      ? Math.max(...playerChampionships.map((c) => c.year))
                      : "Aucune"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Palmarès et historique */}
          <div className="lg:col-span-2 space-y-6">
            {playerChampionships.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Palmarès Worlds ({playerChampionships.length} titre
                    {playerChampionships.length > 1 ? "s" : ""})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {playerChampionships
                      .sort((a, b) => b.year - a.year)
                      .map((championship) => {
                        const team = teamsData[championship.teamId];
                        const teammates = championship.playerIds
                          .filter((id) => id !== player.id)
                          .map((id) => playersData[id])
                          .filter(Boolean);

                        return (
                          <Card
                            key={championship.year}
                            className="bg-gradient-to-r from-amber-50 to-yellow-50"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="text-2xl font-bold text-amber-700">
                                    {championship.year}
                                  </div>
                                  <div>
                                    <Link href={`/team/${team.id}`}>
                                      <div className="font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer">
                                        {team.name}
                                      </div>
                                    </Link>
                                    <Badge
                                      className={
                                        regionColors[
                                          team.region as keyof typeof regionColors
                                        ]
                                      }
                                    >
                                      {team.region}
                                    </Badge>
                                  </div>
                                </div>
                                <TeamIcon
                                  teamName={team.name}
                                  teamId={team.id}
                                  className="h-8 w-8"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="text-slate-600 mb-1">
                                    Lieu de la finale
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {championship.location}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-slate-600 mb-1">
                                    Score final
                                  </div>
                                  <div className="font-medium">
                                    {championship.finalScore}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-slate-600 mb-1">
                                    Adversaire en finale
                                  </div>
                                  <div className="font-medium">
                                    {championship.runnerUp}
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
                              </div>

                              <div className="mt-4">
                                <div className="text-slate-600 mb-2">
                                  Coéquipiers champions
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {teammates.map((teammate) => (
                                    <Link
                                      key={teammate.id}
                                      href={`/player/${teammate.id}`}
                                    >
                                      <Badge
                                        variant="outline"
                                        className="hover:bg-slate-100 cursor-pointer"
                                      >
                                        <RoleIcon
                                          role={teammate.role}
                                          className="w-4 h-4 mr-1"
                                        />
                                        {teammate.gameName}
                                      </Badge>
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
                      "Ce joueur n'a pas encore remporté de championnat du monde."
                    }{" "}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Équipes */}
            {playerTeams.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Équipes championnes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playerTeams.map(({ team, year }) => (
                      <Link
                        key={`${team.id}-${year}`}
                        href={`/team/${team.id}`}
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-slate-800">
                                  {team.name}
                                </div>
                                <div className="text-sm text-slate-600">
                                  Champion en {year}
                                </div>
                              </div>
                              <Badge
                                className={
                                  regionColors[
                                    team.region as keyof typeof regionColors
                                  ]
                                }
                              >
                                {team.region}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
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

// Générer les pages statiques pour tous les joueurs
export async function generateStaticParams() {
  return Object.keys(playersData).map((id) => ({
    id,
  }));
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: PlayerPageProps) {
  const player = playersData[params.id];

  if (!player) {
    return {
      title: "Joueur non trouvé",
    };
  }

  const championships = worldsChampionsData.filter((championship) =>
    championship.playerIds.includes(player.id)
  );

  return {
    title: `${player.gameName} (${player.realName}) - Worlds Champions`,
    description: `Profil détaillé de ${player.gameName}, ${player.role} ${
      flagEmojis[player.nationality]
    }. ${
      championships.length > 0
        ? `Champion du monde ${championships.length} fois (${championships
            .map((c) => c.year)
            .join(", ")}).`
        : "Joueur professionnel de League of Legends."
    }${
      player.currentTeam && !player.retiredYear
        ? ` Joue actuellement pour ${player.currentTeam}.`
        : ""
    }`,
  };
}
