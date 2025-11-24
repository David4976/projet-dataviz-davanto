import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Accueil from "./Accueil";
import Analyse from "./Analyses";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link> |{" "}
        <Link to="/analyses">Analyses</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/analyses" element={<Analyse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;