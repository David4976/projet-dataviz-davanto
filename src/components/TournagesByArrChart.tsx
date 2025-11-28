import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import type { Tournage } from '../types/types';

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
    if (t.ardt_lieu && t.ardt_lieu.trim() !== '') {
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

export default function TournagesByArrChart({ data }: Props) {
  const chartData = getTournagesParArrondissement(data);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📍 Tournages par arrondissement
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={chartData} 
            layout="vertical"
            margin={{ top: 20, right: 50, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              type="number"
              label={{ value: 'Nombre de tournages', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="category"
              dataKey="arrondissement"
              label={{ value: 'Arrondissements', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px'
              }}
              formatter={(value: number) => [`${value} tournage${value > 1 ? 's' : ''}`, 'Nombre']}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="count"
              name="Tournages"
              fill="#10b981"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-sm italic mt-4">
        Découvrez quels arrondissements parisiens accueillent le plus de tournages.
        Les barres horizontales permettent une lecture facile des arrondissements.
      </p>
    </div>
  );
}