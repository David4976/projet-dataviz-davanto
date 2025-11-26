// src/router.tsx (créer ce fichier à la racine de src/)

import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Accueil';
import Analyse from './pages/Analyse';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/analyse',
    element: <Analyse />,
  },
]);