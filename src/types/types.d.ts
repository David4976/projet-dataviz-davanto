export interface Tournage {
  nom_tournage: string;
  nom_realisateur: string;
  type_tournage: string;
  annee_tournage: string;
  ardt_lieu: string;
  geo_point_2d?: {
    lat: number;
    lon: number;
  };
}

export interface ApiResponse {
  total_count: number;
  results: Tournage[];
}