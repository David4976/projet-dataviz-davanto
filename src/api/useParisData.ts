import { useState, useEffect } from 'react';                  // Importe les hooks React pour gérer l'état et les effets de bord
import type { Tournage, ApiResponse } from '../types/types';  // Importe les types TypeScript définissant la structure des données

const limit : number = 100;                                   // Définit le nombre maximum de résultats à récupérer (ici 100)

const API_URL = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=${limit}`;
// URL de l'API OpenData Paris avec le paramètre limit

/**
 * Hook personnalisé pour récupérer les données de tournages
 */
export const useParisData = () => {                           // Déclare et exporte le hook personnalisé useParisData
  const [data, setData] = useState<Tournage[]>([]);           // État pour stocker les données de tournages (tableau vide au départ)
  const [isLoading, setIsLoading] = useState(true);           // État pour indiquer si les données sont en cours de chargement
  const [error, setError] = useState<Error | null>(null);     // État pour stocker une éventuelle erreur

  useEffect(() => {                                           // Effet déclenché au montage du composant
    const fetchTournages = async () => {                      // Fonction asynchrone pour récupérer les données
      try {
        console.log('🔄 Récupération des données...');         // Log de début de récupération
        setIsLoading(true);                                   // Active l'état de chargement

        const response = await fetch(API_URL);                // Effectue la requête HTTP vers l'API

        if (!response.ok) {                                   // Vérifie si la réponse est correcte
          throw new Error('Erreur lors de la récupération des données'); // Lance une erreur si problème
        }

        const apiData: ApiResponse = await response.json();   // Convertit la réponse en JSON typé ApiResponse

        console.log('✅ Données récupérées:', apiData.results.length, 'tournages'); // Log du nombre de résultats
        console.log('📊 Premier tournage:', apiData.results[0]);                    // Log du premier tournage

        setData(apiData.results);                             // Met à jour l'état avec les données récupérées
        setError(null);                                       // Réinitialise l'erreur
      } catch (err) {
        console.error('❌ Erreur:', err);                      // Log en cas d'erreur
        setError(err as Error);                               // Stocke l'erreur dans l'état
      } finally {
        setIsLoading(false);                                  // Désactive l'état de chargement (succès ou erreur)
      }
    };

    fetchTournages();                                         // Appelle la fonction de récupération
  }, []);                                                     // Tableau vide = effet exécuté une seule fois au montage

  return { data, isLoading, error };                          // Retourne les données, l'état de chargement et l'erreur
};