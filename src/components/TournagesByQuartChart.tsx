import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Tournage } from "../types/types";
import { CHART_COLORS, TOOLTIP_STYLE, GRID_COLOR } from "../types/chartColors";

interface Props {
  data: Tournage[];
}

const getTournagesParAnnee = (tournages: Tournage[]) => {
  const countMap = new Map<string, number>();

  tournages.forEach((t) => {
    if (t.annee_tournage) {
      const count = countMap.get(t.annee_tournage) || 0;
      countMap.set(t.annee_tournage, count + 1);
    }
  });

  return Array.from(countMap.entries())
    .map(([annee, count]) => ({ annee, count }))
    .sort((a, b) => a.annee.localeCompare(b.annee));
};

export default function TournagesByYearChart({ data }: Props) {
  const chartData = getTournagesParAnnee(data);

  return (
    <div className="mb-8 sm:mb-12">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
        📈 Évolution du nombre de tournages par année
      </h2>

      <div className="bg-blue-200 rounded-lg shadow-md p-3 sm:p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis
              dataKey="annee"
              label={{ 
                value: "Année", 
                position: "insideBottom", 
                offset: -10,
                style: { fontSize: '0.75rem' }
              }}
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              label={{
                value: "Nombre de tournages",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: '0.75rem' }
              }}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              wrapperClassName="border border-gray-300"
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ fontSize: '0.875rem' }}
            />
            <Line
              type="monotone"
              dataKey="count"
              name="Tournages"
              stroke={CHART_COLORS.deepblue}
              strokeWidth={3}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm italic mt-3 sm:mt-4">
        Ce graphique montre l'évolution du nombre de tournages autorisés à Paris
        depuis 2016. Identifiez les années de forte activité cinématographique.
      </p>
    </div>
  );
}