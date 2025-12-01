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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Chargement des données...</h1>
          <p className="text-gray-600">
            ⏳ Récupération des tournages en cours...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-2">❌ Erreur</h1>
          <p className="mb-4">{error.message}</p>
          <Link to="/" className="text-blue-600 hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-full mx-auto">
      <nav className="mb-8">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          ← Retour à l'accueil
        </Link>
      </nav>

      <h1 className="text-4xl font-bold mb-6">
        📊 Analyse des Tournages à Paris
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <p className="text-gray-800">
          <strong>Données récupérées :</strong> {data?.length} tournages
        </p>
      </div>

      {/* Grille de graphiques : 2 colonnes × 3 lignes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique 1 : Évolution par année */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TournagesByQuartChart data={data || []} />
        </div>

        {/* Graphique 2 : Tournages par arrondissement */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TournagesByArrChart data={data || []} />
        </div>

        {/* Graphique 3 : Tournages par type */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TournagesByTypeChart data={data || []} />
        </div>

        {/* Graphique 4 : Top réalisateurs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TopRealisateursChart data={data || []} />
        </div>

        {/* Graphique 5 : Types par année (aires empilées) */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <TypesByYearChart data={data || []} />
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Données fournies par OpenData Paris</p>
      </footer>
    </div>
  );
}

export default Analyse;
