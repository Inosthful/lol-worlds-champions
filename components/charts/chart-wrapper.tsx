"use client";

import type { ChartData, ChartOptions } from "chart.js";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

type ChartType = "bar" | "doughnut" | "line";

interface ChartWrapperProps {
  type: ChartType;
  data: ChartData<ChartType>;
  options?: ChartOptions<ChartType>;
  className?: string;
}

export function ChartWrapper({
  type,
  data,
  options,
  className,
}: ChartWrapperProps) {
  const defaultOptions: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <Bar
            data={data as ChartData<"bar">}
            options={mergedOptions as ChartOptions<"bar">}
          />
        );
      case "doughnut":
        return (
          <Doughnut
            data={data as ChartData<"doughnut">}
            options={mergedOptions as ChartOptions<"doughnut">}
          />
        );
      case "line":
        return (
          <Line
            data={data as ChartData<"line">}
            options={mergedOptions as ChartOptions<"line">}
          />
        );
      default:
        return (
          <Bar
            data={data as ChartData<"bar">}
            options={mergedOptions as ChartOptions<"bar">}
          />
        );
    }
  };

  return <div className={`w-full h-64 ${className}`}>{renderChart()}</div>;
}
