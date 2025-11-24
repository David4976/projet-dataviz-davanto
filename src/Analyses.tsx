import React, { useEffect, useState } from "react";

interface Tournage {
  nom_tournage: string;
  adresse_lieu: string;
  arrondissement?: string;
  annee_tournage?: string;
}

const Analyse: React.FC = () => {
  const [data, setData] = useState<Tournage[]>([]);

  useEffect(() => {
    fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records")
      .then(res => res.json())
      .then(json => setData(json.results));
  }, []);

  return (
    <div>
      <h1>Analyse des lieux de tournage 🎥</h1>
      <ul>
        {data.slice(0, 15).map((item, index) => (
          <li key={index}>
            <strong>{item.nom_tournage}</strong> – {item.adresse_lieu} ({item.arrondissement})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analyse;