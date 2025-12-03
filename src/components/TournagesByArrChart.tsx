import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Tournage } from "../types/types";
import { CHART_COLORS, TOOLTIP_STYLE, GRID_COLOR } from "../types/chartColors";

interface Props {
  data: Tournage[];
}

/**
 * Agrège les tournages par arrondissement et retourne un tableau trié
 * Les données arrivent déjà formatées depuis useParisData
 */
const getTournagesParArrondissement = (tournages: Tournage[]) => {
  const countMap = new Map<string, number>();

  tournages.forEach((t) => {
    if (t.ardt_lieu && t.ardt_lieu.trim() !== "") {
      const arr = t.ardt_lieu.trim();
      const count = countMap.get(arr) || 0;
      countMap.set(arr, count + 1);
    }
  });

  // Convertit la Map en tableau et trie par nombre de tournages (décroissant)
  return Array.from(countMap.entries())
    .map(([arrondissement, count]) => ({ arrondissement, count }))
    .sort((a, b) => b.count - a.count);
};

// Couleurs alternées pour l'accessibilité
const ALTERNATING_COLORS = [CHART_COLORS.blue, CHART_COLORS.green];

export default function TournagesByArrChart({ data }: Props) {
  const anneesDisponibles = Array.from(
    new Set(data.map((d) => d.annee_tournage).filter(Boolean))
  ).sort();
  const [anneeFiltre, setAnneeFiltre] = useState<string>("");
  const dataFiltree =
    anneeFiltre === ""
      ? data
      : data.filter((t) => t.annee_tournage === anneeFiltre);
  const chartData = getTournagesParArrondissement(dataFiltree);

  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          📍 Tournages par arrondissement
        </h2>

        <div className="flex items-center gap-2">
          <label
            htmlFor="year-filter"
            className="text-xs font-medium text-gray-700"
          >
            {" "}
            Année :
          </label>
          <select
            aria-label="Filtrer par année"
            value={anneeFiltre}
            onChange={(e) => setAnneeFiltre(e.target.value)}
            className="px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="">Toutes les années</option>
            {anneesDisponibles.map((annee) => (
              <option key={annee} value={annee}>
                {annee}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-blue-200 rounded-lg shadow-md p-3 sm:p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 5, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis
              type="number"
              label={{
                value: "Nombre de tournages",
                position: "insideBottom",
                offset: -10,
                style: { fontSize: "0.75rem" },
              }}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              type="category"
              dataKey="arrondissement"
              label={{
                value: "Arrondissements",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: "0.75rem" },
              }}
              tick={{ fontSize: 10 }}
              width={60}
              interval={0}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              wrapperClassName="border border-gray-300"
              formatter={(value: number) => [
                `${value} tournage${value > 1 ? "s" : ""}`,
                "Nombre",
              ]}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: "0.875rem" }}
            />
            <Bar dataKey="count" name="Tournages" radius={[0, 8, 8, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={ALTERNATING_COLORS[index % 2]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm italic mt-3 sm:mt-4">
        Découvrez quels arrondissements parisiens accueillent le plus de
        tournages. Les barres horizontales sont triées du plus grand au plus
        petit nombre de tournages, avec une coloration alternée pour faciliter
        la lecture.
      </p>
    </div>
  );
}
