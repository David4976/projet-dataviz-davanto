import React from "react";
import { Link } from "react-router-dom";

const Accueil: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue 🎬</h1>
      <p>Application de dataviz sur les lieux de tournage à Paris.</p>
      <Link to="/analyse">👉 Voir la page Analyse</Link>
    </div>
  );
};

export default Accueil;