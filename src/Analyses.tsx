import React, { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";

interface Tournage {
  nom_tournage: string;
  adresse_lieu: string;
  arrondissement?: string;
  annee_tournage?: string;
}

// 👉 Composant graphique (pas export default)
export const LineChartExample = ({
  data,
  isAnimationActive = true,
}: {
  data: { name: string; tournage: number }[];
  isAnimationActive?: boolean;
}) => (
  <LineChart
    width={600}
    height={350}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="tournage"
      stroke="#8884d8"
      strokeWidth={4}
      isAnimationActive={isAnimationActive}
    />
  </LineChart>
);

// 👉 Composant principal (le seul export default)
const Analyse: React.FC = () => {
  const [data, setData] = useState<Tournage[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records"
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);

        const counts: Record<string, number> = {};

        json.results.forEach((item: Tournage) => {
          const year = item.annee_tournage;
          if (year) {
            counts[year] = (counts[year] || 0) + 1;
          }
        });

        const formatted = Object.entries(counts)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([year, count]) => ({
            name: year,
            tournage: count,
          }));

        setChartData(formatted);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Nombre de tournages par année
        </h2>

        <LineChartExample data={chartData} />
      </div>
    </div>
  );
};

export default Analyse;
