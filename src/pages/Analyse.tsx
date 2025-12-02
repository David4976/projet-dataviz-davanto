import { useParisData } from "../api/useParisData";
import { Link } from "react-router-dom";
import TournagesByQuartChart from "../components/TournagesByQuartChart";
import TournagesByArrChart from "../components/TournagesByArrChart";
import TournagesByTypeChart from "../components/TournagesByTypeChart";
import TopRealisateursChart from "../components/TopRealisateursChart";
import TypesByYearChart from "../components/TypesByYearChart";

function Analyse() {
  const { data, isLoading, error } = useParisData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">Chargement des données...</h1>
          <p className="text-sm sm:text-base text-gray-600">
            ⏳ Récupération des tournages en cours...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-red-600">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">❌ Erreur</h1>
          <p className="mb-4 text-sm sm:text-base">{error.message}</p>
          <Link to="/" className="text-blue-600 hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
      <nav className="mb-6 sm:mb-8">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm sm:text-base"
        >
          ← Retour à l'accueil
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
        📊 Analyse des Tournages à Paris
      </h1>

      <div className="bg-blue-100 p-3 sm:p-4 rounded-lg mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-gray-800">
          <strong>Données récupérées :</strong> {data?.length} tournages
        </p>
      </div>

      {/* Grille de graphiques : responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Graphique 1 : Évolution par année */}
        <div className="bg-blue-100 rounded-xl shadow-lg p-4 sm:p-6">
          <TournagesByQuartChart data={data || []} />
        </div>

        {/* Graphique 2 : Tournages par arrondissement */}
        <div className="bg-blue-100 rounded-xl shadow-lg p-4 sm:p-6">
          <TournagesByArrChart data={data || []} />
        </div>

        {/* Graphique 3 : Tournages par type */}
        <div className="bg-blue-100 rounded-xl shadow-lg p-4 sm:p-6">
          <TournagesByTypeChart data={data || []} />
        </div>

        {/* Graphique 4 : Top réalisateurs */}
        <div className="bg-blue-100 rounded-xl shadow-lg p-4 sm:p-6">
          <TopRealisateursChart data={data || []} />
        </div>

        {/* Graphique 5 : Types par année (aires empilées) */}
        <div className="bg-blue-100 rounded-xl shadow-lg p-4 sm:p-6 xl:col-span-2">
          <TypesByYearChart data={data || []} />
        </div>
      </div>
    </div>
  );
}

export default Analyse;