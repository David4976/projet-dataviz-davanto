/**
 * Configuration centralisée des couleurs pour les graphiques
 * Utilisé par tous les composants Chart pour maintenir une cohérence visuelle
 */
export const CHART_COLORS = {
  // Couleurs principales par type de graphique
  red: "#C1121F", // Réalisateurs
  blue: "#006466", // Arrondissements
  purple: "#8b5cf6", // Types de tournage
  orange: "#f59e0b", // Types secondaires
  green: "#10b981", // Types secondaires
  deepblue: "#2563eb", // Évolution temporelle
  lightred: "#ef4444", // Types secondaires
  gray: "#6b7280", // Catégorie "Autres"
};

/**
 * Palette pour les graphiques multi-séries (aires empilées, etc.)
 */
export const CHART_PALETTE = [
  CHART_COLORS.purple,
  CHART_COLORS.orange,
  CHART_COLORS.green,
  CHART_COLORS.deepblue,
  CHART_COLORS.lightred,
  CHART_COLORS.gray,
];

/**
 * Styles réutilisables pour les tooltips
 */
export const TOOLTIP_STYLE = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "10px",
};

/**
 * Couleurs pour les grilles
 */
export const GRID_COLOR = "e0e0";
