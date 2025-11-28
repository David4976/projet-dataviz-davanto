import React from "react";
import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

const Accueil: React.FC = () => {
  return (
    <div
      className="
        min-h-screen 
        bg-cover 
        bg-center 
        bg-no-repeat 
        flex  
        justify-center
        items-start
        pt-20 
        px-6
        relative
      "
      // style={{ backgroundImage: 'url("/fond-ecran-accueil.webp")' }}
    >
      <div className="max-w-3xl w-full flex flex-col items-center text-center bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10">
        {/* Overlay dégradé pour lisibilité
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div
        className="relative z-10 
            bg-white/10 backdrop-blur-lg border border-white/20
            p-8 rounded-3xl shadow-2xl 
            max-w-3xl w-full flex flex-col items-center text-center"
      > */}
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Projet Dataviz Cinéma 🎬
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
      {/* <Footer /> */}
    </div>
  );
};

export default Accueil;
