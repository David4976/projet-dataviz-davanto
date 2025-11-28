import { useState, useEffect } from 'react';
import type { Tournage } from '../types/types';

const DATA_URL = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/exports/json';

/**
 * Convertit un nombre en chiffres romains
 */
const toRoman = (num: number): string => {
  const romanNumerals: [number, string][] = [
    [20, 'XX'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  
  let result = '';
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

/**
 * Formate un arrondissement pour l'affichage en chiffres romains
 * Ex: "75001" -> "I", "75002" -> "II", "75020" -> "XX"
 * Retourne null si ce n'est pas un arrondissement de Paris valide
 */
const formatArrondissement = (ardt: string): string | null => {
  if (!ardt) return null;
  
  let num = ardt.trim();
  
  // FILTRE : Ne garde QUE les codes postaux commençant par 75
  if (!num.startsWith('75') || num.length !== 5) {
    return null; // Ignore les arrondissements hors Paris
  }
  
  // Extrait les 2 derniers chiffres
  num = num.slice(3);
  
  const arrNum = parseInt(num, 10);
  
  // Vérifie que c'est un arrondissement valide (1-20)
  if (isNaN(arrNum) || arrNum < 1 || arrNum > 20) {
    return null;
  }
  
  return toRoman(arrNum);
};

/**
 * Hook personnalisé pour récupérer TOUTES les données de tournages
 * Transforme les noms de réalisateurs en majuscules et formate les arrondissements
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

        // 🔄 TRANSFORMATION CENTRALISÉE DES DONNÉES
        const transformedData = rawData
          .filter(tournage => {
            // FILTRE : Ne garde que les tournages dans Paris (code postal 75xxx)
            if (!tournage.ardt_lieu) return false;
            const ardt = tournage.ardt_lieu.trim();
            return ardt.startsWith('75') && ardt.length === 5;
          })
          .map(tournage => ({
            ...tournage,
            // 1. Met le nom du réalisateur en MAJUSCULES
            nom_realisateur: tournage.nom_realisateur 
              ? tournage.nom_realisateur.toUpperCase() 
              : tournage.nom_realisateur,
            // 2. Formate l'arrondissement en chiffres romains (I, II, XX, etc.)
            ardt_lieu: formatArrondissement(tournage.ardt_lieu) || tournage.ardt_lieu
          }));

        console.log('✅ Données récupérées et transformées:', transformedData.length, 'tournages');
        console.log('📊 Exemple de transformation:');
        console.log('  - Réalisateur:', rawData[0]?.nom_realisateur, '->', transformedData[0]?.nom_realisateur);
        console.log('  - Arrondissement:', rawData[0]?.ardt_lieu, '->', transformedData[0]?.ardt_lieu);

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