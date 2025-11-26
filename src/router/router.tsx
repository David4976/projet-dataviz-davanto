import { createBrowserRouter } from 'react-router-dom';
import Accueil from '../pages/Accueil';
import Analyse from '../pages/Analyse';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Accueil />,
  },
  {
    path: '/analyse',
    element: <Analyse />,
  },
]);