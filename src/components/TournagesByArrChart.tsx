import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import type { Tournage } from '../types/types';

interface Props {
  data: Tournage[];
}

/**
 * Formate un arrondissement pour l'affichage
 * Ex: "75001" -> "1ᵉʳ arrondissement", "75002" -> "2ᵉ arrondissement", "75020" -> "20ᵉ arrondissement"
 */
const formatArrondissementDisplay = (ardt: string): string => {
  if (!ardt) return ardt;
  
  let num = ardt.trim();
  
  // Si c'est au format 75XXX, on extrait les 2 derniers chiffres
  if (num.startsWith('75') && num.length === 5) {
    num = num.slice(3);
  }
  
  const arrNum = parseInt(num, 10);
  
  if (isNaN(arrNum) || arrNum < 1 || arrNum > 20) {
    return ardt;
  }
  
  // Format spécial pour le 1er arrondissement
  if (arrNum === 1) {
    return '1ᵉʳ arrondissement';
  }
  
  return `${arrNum}ᵉ arrondissement`;
};

/**
 * Agrège les tournages par arrondissement et retourne un tableau trié
 * Filtre uniquement les arrondissements de Paris (codes postaux 75xxx)
 */
const getTournagesParArrondissement = (tournages: Tournage[]) => {
  const countMap = new Map<string, number>();

  tournages.forEach((t) => {
    if (t.ardt_lieu) {
      const arr = t.ardt_lieu.trim();
      
      // Filtre : ne garde que les arrondissements de Paris (75xxx)
      // Accepte les formats : "75001", "75020", ou juste "01", "20"
      if (arr.startsWith('75') || (arr.length <= 2 && /^\d+$/.test(arr))) {
        const count = countMap.get(arr) || 0;
        countMap.set(arr, count + 1);
      }
    }
  });

  // Convertit la Map en tableau et trie par nombre de tournages (décroissant)
  return Array.from(countMap.entries())
    .map(([arrondissement, count]) => ({ 
      arrondissement,
      arrondissementDisplay: formatArrondissementDisplay(arrondissement), // Format pour affichage
      count 
    }))
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
            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              type="number"
              label={{ value: 'Nombre de tournages', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="category"
              dataKey="arrondissementDisplay"
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