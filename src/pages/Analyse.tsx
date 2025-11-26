// src/pages/Analyse.tsx

import { useParisData } from '../api/useParisData';
import { Link } from 'react-router-dom';
import TournagesByQuartChart from '../components/TournagesByQuartChart';

function Analyse() {
  const { data, isLoading, error } = useParisData();

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Chargement des données...</h1>
        <p>⏳ Récupération des tournages en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h1>❌ Erreur</h1>
        <p>{error.message}</p>
        <Link to="/">← Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/">← Retour à l'accueil</Link>
      </nav>

      <h1>📊 Analyse des Tournages à Paris</h1>
      
      <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <p><strong>Données récupérées :</strong> {data?.length} tournages</p>
      </div>

      {/* Premier graphique : Évolution par année */}
      <TournagesByQuartChart data={data || []} />
    </div>
  );
}

export default Analyse;