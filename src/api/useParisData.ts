import { useState, useEffect } from 'react';
import type { Tournage } from '../types/types';

const DATA_URL = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/exports/json';

/**
 * Hook personnalisé pour récupérer TOUTES les données de tournages
 * Transforme uniquement les noms de réalisateurs en majuscules
 */
export const useParisData = () => {
  const [data, setData] = useState<Tournage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState({ loaded: 0, total: 0, percentage: 0 });

  useEffect(() => {
    const fetchTournages = async () => {
      try {
        console.log('📄 Récupération de TOUTES les données via /exports...');
        setIsLoading(true);

        const response = await fetch(DATA_URL);

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }

        // Récupération de la taille totale du fichier
        const contentLength = response.headers.get('Content-Length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        // Lecture progressive du flux de données
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Impossible de lire le flux de données');
        }

        let receivedLength = 0;
        const chunks: Uint8Array[] = [];

        // Lecture par paquets
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          chunks.push(value);
          receivedLength += value.length;

          // Mise à jour de la progression
          const percentage = total > 0 ? Math.round((receivedLength / total) * 100) : 0;
          setProgress({
            loaded: receivedLength,
            total,
            percentage
          });

          console.log(`📥 Téléchargement : ${(receivedLength / 1024 / 1024).toFixed(2)} Mo / ${(total / 1024 / 1024).toFixed(2)} Mo (${percentage}%)`);
        }

        // Reconstitution des données
        const chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (const chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }

        // Conversion en texte puis en JSON
        const text = new TextDecoder('utf-8').decode(chunksAll);
        const rawData: Tournage[] = JSON.parse(text);

        // 🔄 TRANSFORMATION : uniquement les noms de réalisateurs en MAJUSCULES
        const transformedData = rawData.map(tournage => ({
          ...tournage,
          nom_realisateur: tournage.nom_realisateur 
            ? tournage.nom_realisateur.toUpperCase() 
            : tournage.nom_realisateur
        }));

        console.log('✅ Données récupérées et transformées:', transformedData.length, 'tournages');
        console.log('📊 Premier tournage:', transformedData[0]);
        console.log('📊 Dernier tournage:', transformedData[transformedData.length - 1]);

        setData(transformedData);
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

  return { data, isLoading, error, progress };
};