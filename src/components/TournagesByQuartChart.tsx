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
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📈 Évolution du nombre de tournages par année
      </h2>

      <div className="bg-blue-200 rounded-lg shadow-md p-6 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="annee"
              label={{ value: "Année", position: "insideBottom", offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Nombre de tournages",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="count"
              name="Tournages"
              stroke="#2563eb"
              strokeWidth={3}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-600 text-sm italic mt-4">
        Ce graphique montre l'évolution du nombre de tournages autorisés à Paris
        depuis 2016. Identifiez les années de forte activité cinématographique.
      </p>
    </div>
  );
}
