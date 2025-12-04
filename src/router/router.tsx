import { createBrowserRouter } from "react-router-dom"; // Importe la fonction qui crée un routeur basé sur l'historique du navigateur
import Layout from "../Layout";
import Accueil from "../pages/Accueil"; // Importe le composant React représentant la page d'accueil
import Analyse from "../pages/Analyse"; // Importe le composant React représentant la page d'analyse

export const router = createBrowserRouter([
  // Crée et exporte un routeur avec la configuration des routes
  {
    path: "/",
    element: <Layout backgroundImage="/fond-ecran-accueil.webp" />,
    children: [
      { index: true, element: <Accueil /> },
      { path: "analyse", element: <Analyse /> },
    ],
  },
], {
  basename: "/", // Force le chemin de base pour Vercel
}); // Termine la définition du routeur