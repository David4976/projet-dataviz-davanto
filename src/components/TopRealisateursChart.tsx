import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Tournage } from "../types/types";
import { CHART_COLORS, GRID_COLOR } from "../types/chartColors";

interface Props {
  data: Tournage[];
}

/**
 * Agrège les tournages par réalisateur et retourne le Top 10
 * Enrichit chaque entrée avec les années, types et titres
 */
const getTopRealisateurs = (tournages: Tournage[], limit: number = 10) => {
  const realMap = new Map<
    string,
    {
      count: number;
      annees: Set<string>;
      types: Set<string>;
      titres: Set<string>;
    }
  >();

  tournages.forEach((t) => {
    const real = t.nom_realisateur?.trim();
    if (!real) return;

    if (!realMap.has(real)) {
      realMap.set(real, {
        count: 0,
        annees: new Set(),
        types: new Set(),
        titres: new Set(),
      });
    }

    const entry = realMap.get(real)!;
    entry.count += 1;
    if (t.annee_tournage) entry.annees.add(t.annee_tournage);
    if (t.type_tournage) entry.types.add(t.type_tournage);
    if (t.nom_tournage) entry.titres.add(t.nom_tournage);
  });

  return Array.from(realMap.entries())
    .map(([realisateur, { count, annees, types, titres }]) => ({
      realisateur,
      count,
      annees: Array.from(annees).sort(),
      types: Array.from(types),
      titres: Array.from(titres).sort(),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export default function TopRealisateursChart({ data }: Props) {
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Extraire les années disponibles
  const availableYears = useMemo(() => {
    const years = new Set(data.map(t => t.annee_tournage).filter(Boolean));
    return Array.from(years).sort();
  }, [data]);

  // Filtrer les données selon l'année sélectionnée
  const filteredData = useMemo(() => {
    if (selectedYear === "all") return data;
    return data.filter(t => t.annee_tournage === selectedYear);
  }, [data, selectedYear]);

  const chartData = getTopRealisateurs(filteredData);

  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          🎥 Top 10 des réalisateurs
        </h2>
        
        {/* Filtre d'année */}
        <div className="flex items-center gap-2">
          <label htmlFor="year-filter" className="text-sm font-medium text-gray-700">
            Année :
          </label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="all">Toutes les années</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Indicateur de filtre actif */}
      {selectedYear !== "all" && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-purple-100 text-purple-800 rounded-full text-sm">
          <span>📅 Année : {selectedYear}</span>
          <button
            onClick={() => setSelectedYear("all")}
            className="hover:bg-purple-200 rounded-full px-1.5 transition-colors"
            title="Réinitialiser le filtre"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-blue-200 rounded-lg shadow-md p-3 sm:p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
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
              dataKey="realisateur"
              tick={{ fontSize: 9 }}
              width={110}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-gray-300 rounded text-sm max-w-xs">
                      <p className="font-bold">{label}</p>
                      <p>{data.count} tournage{data.count > 1 ? "s" : ""}</p>
                      <p><strong>Années :</strong> {data.annees.join(", ")}</p>
                      <p><strong>Types :</strong> {data.types.join(", ")}</p>
                      <p><strong>Titres :</strong> {data.titres.join(", ")}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: "0.875rem" }}
            />
            <Bar
              dataKey="count"
              name="Tournages"
              fill={CHART_COLORS.red}
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm italic mt-3 sm:mt-4">
        Découvrez les réalisateurs et réalisatrices qui ont le plus tourné à 
        Paris{selectedYear !== "all" ? ` en ${selectedYear}` : ""}. 
        {selectedYear !== "all" && ` ${chartData.length} réalisateur${chartData.length > 1 ? "s" : ""} au classement cette année-là.`}
      </p>
    </div>
  );
}