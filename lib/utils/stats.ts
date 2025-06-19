import { worldsChampionsData } from "@/lib/data/worlds-champions";
import { playersData } from "../data/players";
import { teamsData } from "../data/teams";

export function getRegionStats() {
  const regionCounts: Record<string, number> = {};

  worldsChampionsData.forEach((champion) => {
    const team = teamsData[champion.teamId];
    if (team) {
      regionCounts[team.region] = (regionCounts[team.region] || 0) + 1;
    }
  });

  return Object.entries(regionCounts)
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPlayerTitles() {
  const playerTitles: Record<string, number> = {};

  worldsChampionsData.forEach((champion) => {
    champion.playerIds.forEach((playerId) => {
      playerTitles[playerId] = (playerTitles[playerId] || 0) + 1;
    });
  });

  return Object.entries(playerTitles)
    .map(([playerId, count]) => ({
      player: playersData[playerId],
      titles: count,
    }))
    .filter((entry) => entry.player)
    .sort((a, b) => b.titles - a.titles);
}

export function getTeamTitles() {
  const teamTitles: Record<string, number> = {};

  worldsChampionsData.forEach((champion) => {
    teamTitles[champion.teamId] = (teamTitles[champion.teamId] || 0) + 1;
  });

  return Object.entries(teamTitles)
    .map(([teamId, count]) => ({
      team: teamsData[teamId],
      titles: count,
    }))
    .filter((entry) => entry.team)
    .sort((a, b) => b.titles - a.titles);
}

export function getTotalViewership() {
  return worldsChampionsData
    .filter((champion) => champion.viewership)
    .reduce((total, champion) => total + (champion.viewership || 0), 0);
}

export function getAverageViewership() {
  const championsWithViewership = worldsChampionsData.filter(
    (champion) => champion.viewership
  );
  const total = championsWithViewership.reduce(
    (sum, champion) => sum + (champion.viewership || 0),
    0
  );
  return Math.round(total / championsWithViewership.length);
}
