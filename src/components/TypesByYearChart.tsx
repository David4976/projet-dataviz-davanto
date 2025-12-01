import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import type { Tournage } from '../types/types';

interface Props {
  data: Tournage[];
}

/**
 * Agrège les tournages par année et par type
 * Retourne un graphique en aires empilées montrant l'évolution des 5 types principaux
 */
const getTypesByYear = (tournages: Tournage[]) => {
  // Map pour stocker les données : année -> { type1: count, type2: count, ... }
  const dataMap = new Map<string, Record<string, number>>();

  // 1. Compter tous les types
  const typeCountMap = new Map<string, number>();
  tournages.forEach((t) => {
    if (t.type_tournage) {
      const count = typeCountMap.get(t.type_tournage) || 0;
      typeCountMap.set(t.type_tournage, count + 1);
    }
  });

  // 2. Identifier les 5 types les plus fréquents
  const topTypes = Array.from(typeCountMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([type]) => type);

  // 3. Agréger par année et type
  tournages.forEach((t) => {
    if (t.annee_tournage && t.type_tournage) {
      const year = t.annee_tournage;
      const type = topTypes.includes(t.type_tournage) ? t.type_tournage : 'Autres';

      if (!dataMap.has(year)) {
        dataMap.set(year, {});
      }

      const yearData = dataMap.get(year)!;
      yearData[type] = (yearData[type] || 0) + 1;
    }
  });

  // 4. Convertir en tableau et trier par année
  return Array.from(dataMap.entries())
    .map(([annee, types]) => ({
      annee,
      ...types
    }))
    .sort((a, b) => a.annee.localeCompare(b.annee));
};

// Palette de couleurs pour les différents types
const COLORS = [
  '#8b5cf6', // violet
  '#f59e0b', // orange
  '#10b981', // vert
  '#2563eb', // bleu
  '#ef4444', // rouge
  '#6b7280'  // gris pour "Autres"
];

export default function TypesByYearChart({ data }: Props) {
  const chartData = getTypesByYear(data);
  
  // Extraire tous les types uniques présents dans les données
  const allTypes = new Set<string>();
  chartData.forEach((yearData) => {
    Object.keys(yearData).forEach((key) => {
      if (key !== 'annee') {
        allTypes.add(key);
      }
    });
  });

  const typesList = Array.from(allTypes).sort((a, b) => {
    // "Autres" en dernier
    if (a === 'Autres') return 1;
    if (b === 'Autres') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📊 Évolution des types par année
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="annee"
              label={{ value: 'Année', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ value: 'Nombre de tournages', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px'
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingBottom: '10px' }}
            />
            {typesList.map((type, index) => (
              <Area
                key={type}
                type="monotone"
                dataKey={type}
                stackId="1"
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.7}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-sm italic mt-4">
        Ce graphique en aires empilées montre l'évolution des 5 types de productions 
        les plus fréquents à Paris depuis 2016.
      </p>
    </div>
  );
}