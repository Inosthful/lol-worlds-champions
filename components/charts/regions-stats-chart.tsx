"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";
import { Globe } from "lucide-react";
import { ChartWrapper } from "./chart-wrapper";

export function RegionStatsChart() {
  // Calculer les statistiques par région
  const regionStats = worldsChampionsData.reduce((acc, champion) => {
    const team = teamsData[champion.teamId];
    const region = team.region;
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedRegions = Object.entries(regionStats).sort(
    ([, a], [, b]) => b - a
  );

  const data = {
    labels: sortedRegions.map(([region]) => region),
    datasets: [
      {
        label: "Titres Worlds",
        data: sortedRegions.map(([, count]) => count),
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)", // Rouge pour LCK
          "rgba(245, 158, 11, 0.8)", // Orange pour LPL
          "rgba(59, 130, 246, 0.8)", // Bleu pour LEC
          "rgba(34, 197, 94, 0.8)", // Vert pour LCS
          "rgba(168, 85, 247, 0.8)", // Violet pour LMS
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(168, 85, 247, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Répartition des titres par région",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  } as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Domination par région
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper
          type="bar"
          data={data}
          options={options}
          className="h-80"
        />
      </CardContent>
    </Card>
  );
}
