import React from "react";
import { Link } from "react-router-dom";

const Accueil: React.FC = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-start pt-12 sm:pt-20 px-4 sm:px-6 relative">
      <div className="max-w-3xl w-full flex flex-col items-center text-center bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Projet Dataviz Cinéma 🎬
        </h1>

        <p className="text-white/90 mt-4 text-base sm:text-lg px-2">
          Découvrez une visualisation moderne des lieux de tournage à Paris.
        </p>

        <Link
          to="/analyse"
          className="inline-block mt-6 px-5 py-2.5 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg transition duration-300 hover:scale-105"
        >
          👉 Voir la page Analyse
        </Link>
      </div>
    </div>
  );
};

export default Accueil;