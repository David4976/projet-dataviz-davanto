import { useState, useEffect } from 'react';
import type { Tournage } from '../types/types';

const EXPORT_URL = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/exports/json';

/**
 * Hook personnalisé pour récupérer TOUTES les données de tournages
 * Utilise l'endpoint /exports qui n'a AUCUNE limitation (récupère les ~14 760 tournages en UNE requête)
 */
export const useParisData = () => {
  const [data, setData] = useState<Tournage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTournages = async () => {
      try {
        console.log('🔄 Récupération de TOUTES les données via /exports...');
        setIsLoading(true);

        const response = await fetch(EXPORT_URL);

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }

        const allData: Tournage[] = await response.json();

        console.log('✅ Données récupérées:', allData.length, 'tournages');
        console.log('📊 Premier tournage:', allData[0]);
        console.log('📊 Dernier tournage:', allData[allData.length - 1]);

        setData(allData);
        setError(null);
      } catch (err) {
        console.error('❌ Erreur:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournages();
  }, []);

  return { data, isLoading, error };
};