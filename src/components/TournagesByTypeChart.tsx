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
import { CHART_COLORS, TOOLTIP_STYLE, GRID_COLOR } from "../types/chartColors";

interface Props {
  data: Tournage[];
}

const getTournagesParType = (tournages: Tournage[]) => {
  const countMap = new Map<string, number>();

  tournages.forEach((t) => {
    if (t.type_tournage) {
      const count = countMap.get(t.type_tournage) || 0;
      countMap.set(t.type_tournage, count + 1);
    }
  });

  return Array.from(countMap.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
};

export default function TournagesByTypeChart({ data }: Props) {
  const chartData = getTournagesParType(data);

  return (
    <div className="mb-8 sm:mb-12">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
        🎭 Répartition par type de tournage
      </h2>

      <div className="bg-blue-200 rounded-lg shadow-md p-3 sm:p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
            <XAxis
              dataKey="type"
              angle={-45}
              textAnchor="end"
              height={45}
              tick={{ fontSize: 9 }}
              interval={0}
            />
            <YAxis
              label={{
                value: "Nombre de tournages",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: '0.75rem' }
              }}
              tick={{ fontSize: 10 }}
              width={60}
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
            <Bar
              dataKey="count"
              name="Tournages"
              fill={CHART_COLORS.purple}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm italic mt-3 sm:mt-4">
        Découvrez quels types de productions sont les plus tournés à Paris :
        long métrage, série TV, téléfilm, etc.
      </p>
    </div>
  );
}