import { createBrowserRouter } from "react-router-dom"; // Importe la fonction qui crée un routeur basé sur l'historique du navigateu
import Accueil from "../pages/Accueil"; // Importe le composant React représentant la page d'accueil
import Analyse from "../pages/Analyse"; // Importe le composant React représentant la page d'analyse

export const router = createBrowserRouter([
  // Crée et exporte un routeur avec la configuration des routes
  {
    path: "/", // Définit le chemin racine (URL "/")
    element: <Accueil />, // Associe ce chemin au composant Accueil
  },
  {
    path: "/analyse", // Définit le chemin "/analyse"
    element: <Analyse />, // Associe ce chemin au composant Analyse
  },
]); // Termine la définition du routeur
