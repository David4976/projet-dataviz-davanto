// src/api/useParisData.ts

import { useState, useEffect } from 'react';
import type { Tournage, ApiResponse } from '../types/types';

const limit : number = 100

const API_URL = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=${limit}`;

/**
 * Hook personnalisé pour récupérer les données de tournages
 */
export const useParisData = () => {
  const [data, setData] = useState<Tournage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTournages = async () => {
      try {
        console.log('🔄 Récupération des données...');
        setIsLoading(true);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        
        const apiData: ApiResponse = await response.json();
        
        console.log('✅ Données récupérées:', apiData.results.length, 'tournages');
        console.log('📊 Premier tournage:', apiData.results[0]);
        
        setData(apiData.results);
        setError(null);
      } catch (err) {
        console.error('❌ Erreur:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournages();
  }, []); // Tableau vide = appel une seule fois au montage

  return { data, isLoading, error };
};