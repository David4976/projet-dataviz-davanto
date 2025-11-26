import React from "react";
import { Link } from "react-router-dom";

const Accueil: React.FC = () => {
  return (
    <div
      className="
        min-h-screen 
        bg-cover 
        bg-center 
        bg-no-repeat 
        flex 
        items-center 
        justify-center 
        px-6
      "
      style={{ backgroundImage: 'url("/film-production.webp")' }}
    >
      {/* Overlay dégradé pour lisibilité */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 
          p-10 rounded-3xl shadow-2xl max-w-lg text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Bienvenue 🎬
        </h1>

        <p className="text-white/90 mt-4 text-lg">
          Découvrez une visualisation moderne des lieux de tournage à Paris.
        </p>

        <Link
          to="/analyse"
          className="
            inline-block
            mt-6 
            px-6 
            py-3 
            bg-purple-600 
            hover:bg-purple-700 
            text-white 
            font-semibold 
            rounded-xl 
            shadow-lg 
            transition 
            duration-300 
            hover:scale-105
          "
        >
          👉 Voir la page Analyse
        </Link>
      </div>
    </div>
  );
};

export default Accueil;
