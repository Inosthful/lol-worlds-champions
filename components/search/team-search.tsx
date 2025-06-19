"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { playersData } from "@/lib/data/players";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";
import {
  Calendar,
  ExternalLink,
  MapPin,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const regionColors = {
  LCK: "bg-red-100 text-red-800",
  LPL: "bg-yellow-100 text-yellow-800",
  LEC: "bg-blue-100 text-blue-800",
  LCS: "bg-green-100 text-green-800",
  LMS: "bg-purple-100 text-purple-800",
};

export function TeamSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculer les titres et informations pour chaque équipe
  const teamsWithTitles = useMemo(() => {
    const teamTitles: Record<
      string,
      { years: number[]; players: Set<string>; locations: string[] }
    > = {};

    worldsChampionsData.forEach((champion) => {
      if (!teamTitles[champion.teamId]) {
        teamTitles[champion.teamId] = {
          years: [],
          players: new Set(),
          locations: [],
        };
      }
      teamTitles[champion.teamId].years.push(champion.year);
      teamTitles[champion.teamId].locations.push(champion.location);
      champion.playerIds.forEach((playerId) => {
        teamTitles[champion.teamId].players.add(playerId);
      });
    });

    return Object.values(teamsData).map((team) => ({
      ...team,
      titles: teamTitles[team.id]?.years.length || 0,
      titleYears: teamTitles[team.id]?.years || [],
      championPlayers: Array.from(teamTitles[team.id]?.players || [])
        .map((id) => playersData[id])
        .filter(Boolean),
      locations: teamTitles[team.id]?.locations || [],
    }));
  }, []);

  // Filtrer les équipes basé sur la recherche
  const filteredTeams = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return teamsWithTitles
      .filter(
        (team) =>
          team.name.toLowerCase().includes(term) ||
          team.region.toLowerCase().includes(term) ||
          team.championPlayers.some(
            (player) =>
              player.gameName.toLowerCase().includes(term) ||
              player.realName.toLowerCase().includes(term)
          )
      )
      .sort((a, b) => b.titles - a.titles); // Trier par nombre de titres
  }, [searchTerm, teamsWithTitles]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Rechercher une équipe (nom, région, joueur...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {searchTerm.trim() && (
        <div className="text-sm text-slate-600 mb-4">
          {filteredTeams.length} équipe{filteredTeams.length !== 1 ? "s" : ""}{" "}
          trouvée
          {filteredTeams.length !== 1 ? "s" : ""}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Link key={team.id} href={`/team/${team.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {team.name}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {team.titles > 0 && (
                          <Badge variant="secondary">
                            <Trophy className="h-3 w-3 mr-1" />
                            {team.titles} titre{team.titles > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            regionColors[
                              team.region as keyof typeof regionColors
                            ]
                          }
                        >
                          {team.region}
                        </Badge>
                        {team.disbanded && (
                          <Badge variant="destructive">Dissoute</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Informations générales */}
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    {team.founded && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Fondée en {team.founded}</span>
                      </div>
                    )}
                  </div>

                  {/* Titres Worlds */}
                  {team.titles > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-700">
                        Titres Worlds:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {team.titleYears.map((year, index) => (
                          <div key={year} className="flex items-center gap-2">
                            <Badge variant="secondary">{year}</Badge>
                            <span className="text-xs text-slate-500">
                              <MapPin className="h-3 w-3 inline mr-1" />
                              {team.locations[index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Joueurs champions */}
                  {team.championPlayers.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-700">
                        Joueurs champions:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {team.championPlayers.slice(0, 8).map((player) => (
                          <Badge
                            key={player.id}
                            variant="outline"
                            className="text-xs"
                          >
                            {player.gameName}
                          </Badge>
                        ))}
                        {team.championPlayers.length > 8 && (
                          <Badge variant="outline" className="text-xs">
                            +{team.championPlayers.length - 8} autres
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pas de titres */}
                  {team.titles === 0 && (
                    <div className="text-sm text-slate-500 italic">
                      Aucun titre Worlds remporté
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {searchTerm.trim() && filteredTeams.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>{`Aucune équipe trouvée pour "${searchTerm}"`}</p>
          <p className="text-sm mt-2">
            {"Essayez avec un nom d'équipe, région ou joueur"}
          </p>
        </div>
      )}
    </div>
  );
}
