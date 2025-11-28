import { createBrowserRouter } from "react-router-dom"; // Importe la fonction qui crée un routeur basé sur l'historique du navigateu
import Layout from "../components/Layout";
import Accueil from "../pages/Accueil"; // Importe le composant React représentant la page d'accueil
import Analyse from "../pages/Analyse"; // Importe le composant React représentant la page d'analyse

export const router = createBrowserRouter([
  // Crée et exporte un routeur avec la configuration des routes
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Accueil /> },
      { path: "analyse", element: <Analyse /> },
    ],
  },
]); // Termine la définition du routeur
