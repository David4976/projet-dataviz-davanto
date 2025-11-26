// src/pages/Analyse.tsx

import { useParisData } from '../api/useParisData';
import { Link } from 'react-router-dom';
import TournagesByQuartChart from '../components/TournagesByQuartChart';
// import TournagesByArrChart from '../components/TournagesByArrChart';
// import TournagesByTypeChart from '../components/TournagesByTypeChart';
// import TopRealisateursChart from '../components/TopRealisateursChart';
// import TypesByYearChart from '../components/TypesByYearChart';

function Analyse() {
  const { data, isLoading, error } = useParisData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Chargement des données...</h1>
          <p className="text-gray-600">⏳ Récupération des tournages en cours...</p>
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

      <h1 className="text-4xl font-bold mb-6">📊 Analyse des Tournages à Paris</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <p className="text-gray-800">
          <strong>Données récupérées :</strong> {data?.length} tournages
        </p>
      </div>

      {/* Grille de graphiques : 2 colonnes × 3 lignes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Graphique 1 : Évolution par année (déjà implémenté) */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TournagesByQuartChart data={data || []} />
        </div>

        {/* Graphique 2 : Tournages par arrondissement (à implémenter) */}
        {/* <TournagesByArrChart data={data || []} /> */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6">
          <h2 className="text-xl font-bold mb-4">📍 Tournages par arrondissement</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique à implémenter</p>
          </div>
        </div>

        {/* Graphique 3 : Tournages par type (à implémenter) */}
        {/* <TournagesByTypeChart data={data || []} /> */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6">
          <h2 className="text-xl font-bold mb-4">🎬 Tournages par type</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique à implémenter</p>
          </div>
        </div>

        {/* Graphique 4 : Top réalisateurs (à implémenter) */}
        {/* <TopRealisateursChart data={data || []} /> */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6">
          <h2 className="text-xl font-bold mb-4">🎥 Top réalisateurs</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique à implémenter</p>
          </div>
        </div>

        {/* Graphique 5 : Types par année (à implémenter) */}
        {/* <TypesByYearChart data={data || []} /> */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6">
          <h2 className="text-xl font-bold mb-4">📊 Évolution des types par année</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique à implémenter</p>
          </div>
        </div>

      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Données fournies par OpenData Paris</p>
      </footer>
    </div>
  );
}

export default Analyse;