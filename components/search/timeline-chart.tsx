"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamsData } from "@/lib/data/teams";
import { worldsChampionsData } from "@/lib/data/worlds-champions";
import { TrendingUp } from "lucide-react";
import { ChartWrapper } from "../charts/chart-wrapper";

export function TimelineChart() {
  // Préparer les données par année et région
  const yearlyData = worldsChampionsData.reduce((acc, champion) => {
    const team = teamsData[champion.teamId];
    const region = team.region;

    if (!acc[champion.year]) {
      acc[champion.year] = {};
    }
    acc[champion.year][region] = (acc[champion.year][region] || 0) + 1;

    return acc;
  }, {} as Record<number, Record<string, number>>);

  const years = Object.keys(yearlyData).map(Number).sort();
  const regions = ["LCK", "LPL", "LEC", "LCS", "LMS"];

  const regionColors = {
    LCK: "rgba(239, 68, 68, 0.8)",
    LPL: "rgba(245, 158, 11, 0.8)",
    LEC: "rgba(59, 130, 246, 0.8)",
    LCS: "rgba(34, 197, 94, 0.8)",
    LMS: "rgba(168, 85, 247, 0.8)",
  };

  const data = {
    labels: years,
    datasets: regions.map((region) => ({
      label: region,
      data: years.map((year) => yearlyData[year]?.[region] || 0),
      backgroundColor: regionColors[region as keyof typeof regionColors],
      borderColor: regionColors[region as keyof typeof regionColors]?.replace(
        "0.8",
        "1"
      ),
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    })),
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Évolution des victoires par région au fil du temps",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Année",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Nombre de titres",
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Évolution temporelle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper
          type="line"
          data={data}
          options={options}
          className="h-80"
        />
      </CardContent>
    </Card>
  );
}
