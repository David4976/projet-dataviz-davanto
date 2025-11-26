export interface Tournage {                         // Déclare une interface TypeScript pour représenter un tournage
  nom_tournage: string;                             // Nom du tournage (texte)
  nom_realisateur: string;                          // Nom du réalisateur (texte)
  type_tournage: string;                            // Type de tournage (film, série, etc.)
  annee_tournage: string;                           // Année du tournage (stockée comme texte)
  ardt_lieu: string;                                // Arrondissement du lieu de tournage (texte)
  geo_point_2d?: {                                  // Coordonnées géographiques (optionnelles, grâce au "?")
    lat: number;                                    // Latitude (nombre)
    lon: number;                                    // Longitude (nombre)
  };
}

export interface ApiResponse {                      // Déclare une interface pour représenter la réponse de l'API
  total_count: number;                              // Nombre total de résultats disponibles
  results: Tournage[];                              // Tableau de tournages (utilise l'interface Tournage définie plus haut)
}