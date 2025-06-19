"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { playersData } from "@/lib/data/players";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";
import { Calendar, ExternalLink, Search, Trophy, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RoleIcon } from "../icons/role-icon";

const flagEmojis: Record<string, string> = {
  KR: "🇰🇷",
  CN: "🇨🇳",
  TW: "🇹🇼",
  ES: "🇪🇸",
  FI: "🇫🇮",
  FR: "🇫🇷",
  EE: "🇪🇪",
};

export function PlayerSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculer les titres pour chaque joueur
  const playersWithTitles = useMemo(() => {
    const playerTitles: Record<string, { years: number[]; teams: string[] }> =
      {};

    worldsChampionsData.forEach((champion) => {
      const team = teamsData[champion.teamId];
      champion.playerIds.forEach((playerId) => {
        if (!playerTitles[playerId]) {
          playerTitles[playerId] = { years: [], teams: [] };
        }
        playerTitles[playerId].years.push(champion.year);
        if (!playerTitles[playerId].teams.includes(team.name)) {
          playerTitles[playerId].teams.push(team.name);
        }
      });
    });

    return Object.values(playersData).map((player) => ({
      ...player,
      titles: playerTitles[player.id]?.years.length || 0,
      titleYears: playerTitles[player.id]?.years || [],
      teams: playerTitles[player.id]?.teams || [],
    }));
  }, []);

  // Filtrer les joueurs basé sur la recherche
  const filteredPlayers = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return playersWithTitles
      .filter(
        (player) =>
          player.gameName.toLowerCase().includes(term) ||
          player.realName.toLowerCase().includes(term) ||
          player.nationality.toLowerCase().includes(term) ||
          player.role.toLowerCase().includes(term) ||
          player.teams.some((team) => team.toLowerCase().includes(term))
      )
      .sort((a, b) => b.titles - a.titles); // Trier par nombre de titres
  }, [searchTerm, playersWithTitles]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Rechercher un joueur (nom, pseudo, nationalité, rôle, équipe...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {searchTerm.trim() && (
        <div className="text-sm text-slate-600 mb-4">
          {filteredPlayers.length} joueur
          {filteredPlayers.length !== 1 ? "s" : ""} trouvé
          {filteredPlayers.length !== 1 ? "s" : ""}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => (
          <Link key={player.id} href={`/player/${player.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {" "}
                  <div className="mt-1">
                    <RoleIcon
                      role={player.role}
                      className="w-6 h-6 text-slate-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {player.gameName}
                      </h3>
                      <ExternalLink className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {player.titles > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          <Trophy className="h-3 w-3 mr-1" />
                          {player.titles}
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm text-slate-600 mb-2">
                      {flagEmojis[player.nationality]} {player.realName}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {player.role}
                      </Badge>
                      {player.retiredYear && (
                        <Badge
                          variant="outline"
                          className="text-xs text-red-600"
                        >
                          Retraité {player.retiredYear}
                        </Badge>
                      )}
                    </div>

                    {player.titles > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs text-slate-500">
                          Titres Worlds:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {player.titleYears.map((year) => (
                            <Badge
                              key={year}
                              variant="secondary"
                              className="text-xs"
                            >
                              {year}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Équipes: {player.teams.join(", ")}
                        </div>
                      </div>
                    )}

                    {player.birthYear && (
                      <div className="text-xs text-slate-500 mt-2">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Né en {player.birthYear} (
                        {new Date().getFullYear() - player.birthYear} ans)
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {searchTerm.trim() && filteredPlayers.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>{`Aucun joueur trouvé pour "${searchTerm}"`}</p>
          <p className="text-sm mt-2">
            Essayez avec un nom, pseudo, nationalité ou rôle
          </p>
        </div>
      )}
    </div>
  );
}
