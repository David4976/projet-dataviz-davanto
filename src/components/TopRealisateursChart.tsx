import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import type { Tournage } from '../types/types';

interface Props {
  data: Tournage[];
}

/**
 * Agrège les tournages par réalisateur et retourne le Top 10
 * Filtre les valeurs vides et trie par nombre de tournages décroissant
 */
const getTopRealisateurs = (tournages: Tournage[], limit: number = 10) => {
  const countMap = new Map<string, number>();

  tournages.forEach((t) => {
    if (t.nom_realisateur && t.nom_realisateur.trim() !== '') {
      const real = t.nom_realisateur.trim();
      const count = countMap.get(real) || 0;
      countMap.set(real, count + 1);
    }
  });

  // Convertit la Map en tableau et trie par nombre de tournages (décroissant)
  return Array.from(countMap.entries())
    .map(([realisateur, count]) => ({ realisateur, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit); // Garde uniquement le Top 10
};

export default function TopRealisateursChart({ data }: Props) {
  const chartData = getTopRealisateurs(data);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🎥 Top 10 des réalisateurs
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={chartData} 
            layout="vertical"
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              type="number"
              label={{ value: 'Nombre de tournages', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="category"
              dataKey="realisateur"
              tick={{ fontSize: 11 }}
              width={140}
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
              fill="#f59e0b"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-sm italic mt-4">
        Découvrez les réalisateurs et réalisatrices qui ont le plus tourné à Paris.
        Ce top 10 révèle les cinéastes les plus actifs dans la capitale française.
      </p>
    </div>
  );
}