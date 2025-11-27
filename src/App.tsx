import { RouterProvider } from "react-router-dom"; // Importe le composant RouterProvider qui permet d'utiliser le routeur dans l'application
import { router } from "./router/router"; // Importe la configuration du routeur définie dans router.tsx
import "./styles/index.css"; // Importe les styles globaux de l'application

function App() {
  // Déclare le composant principal App
  return <RouterProvider router={router} />; // Rend l'application en fournissant le routeur à React Router
}

export default App; // Exporte App comme composant principal de l'application
