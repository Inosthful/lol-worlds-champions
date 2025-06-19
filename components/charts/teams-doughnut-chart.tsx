"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";
import { Trophy } from "lucide-react";
import { ChartWrapper } from "./chart-wrapper";

export function TeamsDoughnutChart() {
  // Calculer les titres par équipe
  const teamStats = worldsChampionsData.reduce((acc, champion) => {
    const team = teamsData[champion.teamId];
    acc[team.name] = (acc[team.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedTeams = Object.entries(teamStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8); // Top 8 équipes

  const colors = [
    "rgba(239, 68, 68, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(59, 130, 246, 0.8)",
    "rgba(34, 197, 94, 0.8)",
    "rgba(168, 85, 247, 0.8)",
    "rgba(236, 72, 153, 0.8)",
    "rgba(14, 165, 233, 0.8)",
    "rgba(132, 204, 22, 0.8)",
  ];

  const data = {
    labels: sortedTeams.map(([team]) => team),
    datasets: [
      {
        data: sortedTeams.map(([, count]) => count),
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace("0.8", "1")),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Répartition des titres par équipe",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Équipes les plus titrées
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper
          type="doughnut"
          data={data}
          options={options}
          className="h-80"
        />
      </CardContent>
    </Card>
  );
}
