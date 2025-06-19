import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { playersData } from "@/lib/data/players";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";
import {
  getAverageViewership,
  getPlayerTitles,
  getRegionStats,
  getTeamTitles,
} from "@/lib/utils/stats";
import {
  BarChart3,
  Calendar,
  Crown,
  Globe,
  MapPin,
  Search,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Link from "next/link";

import { RegionStatsChart } from "@/components/charts/regions-stats-chart";
import { TeamsDoughnutChart } from "@/components/charts/teams-doughnut-chart";
import { RoleIcon } from "@/components/icons/role-icon";
import { TeamIcon } from "@/components/icons/team-icon";
import { TimelineChart } from "@/components/search/timeline-chart";

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

export default function HomePage() {
  const regionStats = getRegionStats();
  const playerTitles = getPlayerTitles().slice(0, 5); // Top 5
  const teamTitles = getTeamTitles();
  const avgViewership = getAverageViewership();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-slate-800">
              Worlds Champions
            </h1>
            <Badge variant="secondary" className="ml-2">
              <Star className="h-3 w-3 mr-1" />
              2011-2024
            </Badge>
          </div>
          <p className="text-slate-600 mt-2">
            {worldsChampionsData.length} tournois
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Search className="h-4 w-4" />
              Rechercher joueurs & équipes
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Championships
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {worldsChampionsData.length}
              </div>
              <p className="text-xs text-muted-foreground">Depuis 2011</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Région Dominante
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{regionStats[0]?.region}</div>
              <p className="text-xs text-muted-foreground">
                {regionStats[0]?.count} titres
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Champion Actuel
              </CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link href={`/team/${worldsChampionsData[0].teamId}`}>
                <div className="text-2xl font-bold hover:text-blue-600 transition-colors cursor-pointer">
                  {teamsData[worldsChampionsData[0].teamId].name}
                </div>
              </Link>
              <p className="text-xs text-muted-foreground">2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Viewership Moyen
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(avgViewership / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Spectateurs</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-semibold text-slate-800">
              Analyses et statistiques
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RegionStatsChart />
            <TeamsDoughnutChart />
          </div>

          <div className="mb-8">
            <TimelineChart />
          </div>
        </div>

        {/* Top Players */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-semibold text-slate-800">
              Joueurs les plus titrés
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {playerTitles.map((entry, index) => (
              <Link key={entry.player.id} href={`/player/${entry.player.id}`}>
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="text-2xl mb-2">
                      {index === 0 ? "👑" : `#${index + 1}`}
                    </div>
                    <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {entry.player.gameName}
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      {flagEmojis[entry.player.nationality]}{" "}
                      {entry.player.realName}
                    </div>
                    <Badge variant="secondary">
                      {entry.titles} titre{entry.titles > 1 ? "s" : ""}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Region Stats */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-slate-800">
              Statistiques par région
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {regionStats.map((stat) => (
              <Card key={stat.region}>
                <CardContent className="p-4 text-center">
                  <Badge
                    className={`mb-2 ${
                      regionColors[stat.region as keyof typeof regionColors]
                    }`}
                  >
                    {stat.region}
                  </Badge>
                  <div className="text-2xl font-bold text-slate-800">
                    {stat.count}
                  </div>
                  <div className="text-sm text-slate-600">
                    titre{stat.count > 1 ? "s" : ""}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Champions Timeline */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="h-6 w-6 text-slate-600" />
            <h2 className="text-2xl font-semibold text-slate-800">
              Timeline des Champions
            </h2>
          </div>

          <div className="space-y-6">
            {worldsChampionsData.map((champion) => {
              const team = teamsData[champion.teamId];

              if (!team) {
                console.warn(`Team not found for teamId: ${champion.teamId}`);
                return null;
              }

              const roster = champion.playerIds
                .map((id) => playersData[id])
                .filter(Boolean);

              return (
                <Card
                  key={champion.year}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-slate-700 min-w-[80px]">
                            {champion.year}
                          </div>
                          <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                            <TeamIcon
                              teamName={team.name}
                              teamId={team.id}
                              className="h-6 w-6 text-amber-500"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Link href={`/team/${team.id}`}>
                              <h3 className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer">
                                {team.name}
                              </h3>
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

                          <div className="flex items-center gap-4 text-slate-600 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{champion.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              <span>
                                {champion.viewership
                                  ? `${(champion.viewership / 1000000).toFixed(
                                      1
                                    )}M viewers`
                                  : "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium">
                                Final: {champion.finalScore}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Roster */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {roster.map((player) => (
                          <Link
                            key={`${player.id}-${champion.year}`}
                            href={`/player/${player.id}`}
                          >
                            <Card className="bg-slate-50 hover:shadow-md transition-shadow cursor-pointer group">
                              <CardContent className="p-4">
                                <div className="text-center">
                                  <div className="mb-2 flex justify-center">
                                    <RoleIcon
                                      role={player.role}
                                      className="w-8 h-8 text-slate-600"
                                    />
                                  </div>
                                  <div className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {player.gameName}
                                  </div>
                                  <div className="text-xs text-slate-600 mb-1">
                                    {player.role}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {flagEmojis[player.nationality]}{" "}
                                    {player.realName}
                                  </div>
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
        </div>

        {/* Fun Facts */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-900">
                  Le saviez-vous ?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-amber-800 text-sm">
                <div>
                  <Link href="/player/faker" className="hover:underline">
                    <strong>Faker</strong>
                  </Link>{" "}
                  est le seul joueur à avoir gagné 5 fois les Worlds (2013,
                  2015, 2016, 2023, 2024)
                </div>
                <div>
                  <Link href="/team/skt" className="hover:underline">
                    <strong>T1</strong>
                  </Link>{" "}
                  {"est l'équipe la plus titrée avec"} {teamTitles[0]?.titles}{" "}
                  victoires
                </div>
                <div>
                  La <strong>LCK</strong> domine avec {regionStats[0]?.count}{" "}
                  titres sur {worldsChampionsData.length} tournois
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-600">
          <p>© 2024 Worlds Champions - Dataset complet et vérifié</p>
          <p className="text-sm mt-2">
            League of Legends est une marque déposée de Riot Games
          </p>
        </div>
      </footer>
    </div>
  );
}
