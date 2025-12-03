import { useState, useMemo } from "react";                                      // Import des hooks React
import {                                                                       
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";                                                              // Import des composants Recharts
import type { Tournage } from "../types/types";                                 // Type des données Tournage
import { CHART_COLORS, GRID_COLOR } from "../types/chartColors";                // Couleurs du graphique

interface Props {                                                               // Interface des props
  data: Tournage[];                                                             // Tableau de tournages
}

const getTopRealisateurs = (tournages: Tournage[], limit: number = 10) => {     // Fonction pour calculer le top réalisateurs
  const realMap = new Map<                                                      // Map pour stocker les infos par réalisateur
    string,
    { count: number; annees: Set<string>; types: Set<string>; titres: Set<string>; }
  >();

  tournages.forEach((t) => {                                                    // Parcours de chaque tournage
    const real = t.nom_realisateur?.trim();                                     // Nom du réalisateur nettoyé
    if (!real) return;                                                          // Si pas de nom, on ignore

    if (!realMap.has(real)) {                                                   // Si réalisateur pas encore dans la Map
      realMap.set(real, {                                                       // On initialise ses données
        count: 0, 
        annees: new Set(), 
        types: new Set(), 
        titres: new Set(),
      });
    }

    const entry = realMap.get(real)!;                                           // Récupération de l’entrée
    entry.count += 1;                                                           // Incrément du nombre de tournages
    if (t.annee_tournage) entry.annees.add(t.annee_tournage);                   // Ajout de l’année
    if (t.type_tournage) entry.types.add(t.type_tournage);                      // Ajout du type
    if (t.nom_tournage) entry.titres.add(t.nom_tournage);                       // Ajout du titre
  });

  return Array.from(realMap.entries())                                          // Transformation en tableau
    .map(([realisateur, { count, annees, types, titres }]) => ({                // Formatage des données
      realisateur,
      count,
      annees: Array.from(annees).sort(),                                        // Tri des années
      types: Array.from(types),                                                 // Conversion en tableau
      titres: Array.from(titres).sort(),                                        // Tri des titres
    }))
    .sort((a, b) => b.count - a.count)                                          // Tri par nombre décroissant
    .slice(0, limit);                                                           // Limite au Top N
};

export default function TopRealisateursChart({ data }: Props) {                 // Composant principal
  const [selectedYear, setSelectedYear] = useState<string>("all");              // État de l’année sélectionnée

  const availableYears = useMemo(() => {                                        // Années disponibles
    const years = new Set(data.map(t => t.annee_tournage).filter(Boolean));     // Extraction des années uniques
    return Array.from(years).sort();                                            // Tri des années
  }, [data]);

  const filteredData = useMemo(() => {                                          // Données filtrées
    if (selectedYear === "all") return data;                                    // Si "all", toutes les données
    return data.filter(t => t.annee_tournage === selectedYear);                 // Sinon filtrage par année
  }, [data, selectedYear]);

  const chartData = getTopRealisateurs(filteredData);                           // Calcul du top réalisateurs

  return (
    <div className="mb-8 sm:mb-12">                                             {/* Conteneur principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">             {/* Titre */}
          🎥 Top 10 des réalisateurs
        </h2>
        
        <div className="flex items-center gap-2">                               {/* Filtre d’année */}
          <label htmlFor="year-filter" className="text-sm font-medium text-gray-700">
            Année :
          </label>
          <select
            id="year-filter"
            value={selectedYear}                                                 // Valeur actuelle
            onChange={(e) => setSelectedYear(e.target.value)}                   // Mise à jour de l’état
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="all">Toutes les années</option>                      {/* Option par défaut */}
            {availableYears.map((year) => (                                     // Options dynamiques
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedYear !== "all" && (                                              // Indicateur de filtre actif
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-purple-100 text-purple-800 rounded-full text-sm">
          <span>📅 Année : {selectedYear}</span>
          <button
            onClick={() => setSelectedYear("all")}                              // Réinitialisation du filtre
            className="hover:bg-purple-200 rounded-full px-1.5 transition-colors"
            title="Réinitialiser le filtre"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-blue-200 rounded-lg shadow-md p-3 sm:p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>                         {/* Conteneur responsive */}
          <BarChart
            data={chartData}                                                    // Données du graphique
            layout="vertical"                                                   // Graphique horizontal
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}                // Marges
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />         {/* Grille */}
            <XAxis
              type="number"                                                     // Axe X numérique
              label={{
                value: "Nombre de tournages",                                   // Libellé
                position: "insideBottom",
                offset: -10,
                style: { fontSize: "0.75rem" },
              }}
              tick={{ fontSize: 10 }}                                           // Taille des ticks
            />
            <YAxis
              type="category"                                                   // Axe Y catégoriel
              dataKey="realisateur"                                             // Nom du réalisateur
              tick={{ fontSize: 9 }}
              width={110}                                                       // Largeur réservée
            />
            <Tooltip
              content={({ active, payload, label }) => {                        // Tooltip personnalisé
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-gray-300 rounded text-sm max-w-xs">
                      <p className="font-bold">{label}</p>
                      <p>
                        {data.count} tournage{data.count > 1 ? "s" : ""}
                      </p>
                      <p>
                        <strong>Années :</strong> {data.annees.join(", ")}
                      </p>
                      <p>
                        <strong>Types :</strong> {data.types.join(", ")}
                      </p>
                      <p>
                        <strong>Titres :</strong> {data.titres.join(", ")}
                      </p>
                    </div>
                  );
                }
                return null;                                                    // Si pas de données
              }}
            />
            <Legend
              verticalAlign="top"                                               // Légende en haut
              height={36}
              wrapperStyle={{ fontSize: "0.875rem" }}
            />
            <Bar
              dataKey="count"                                                   // Hauteur des barres
              name="Tournages"                                                  // Nom affiché
              fill={CHART_COLORS.red}                                           // Couleur
              radius={[0, 8, 8, 0]}                                             // Coins arrondis
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm italic mt-3 sm:mt-4">       {/* Texte explicatif */}
        Découvrez les réalisateurs et réalisatrices qui ont le plus tourné à 
        Paris{selectedYear !== "all" ? ` en ${selectedYear}` : ""}. 
        {selectedYear !== "all" && ` ${chartData.length} réalisateur${chartData.length > 1 ? "s" : ""} au classement cette année-là.`}
      </p>
    </div>
  );
}
