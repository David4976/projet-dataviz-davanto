import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-20 w-full bg-white/10 backdrop-blur-lg border-t border-white/20 text-white mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {/* SECTION 1 – À propos */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">À propos du projet</h3>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Projet de datavisualisation autour des lieux de tournages à Paris.
            Analyse, visualisation et exploration des données publiques.
          </p>
        </div>

        {/* SECTION 2 – Liens utiles */}
        <div className="sm:text-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Liens utiles</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:text-purple-300 transition">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/analyse" className="hover:text-purple-300 transition">
                Analyse
              </Link>
            </li>
            <li className="flex justify-start sm:justify-center items-center gap-2">
              <a
                href="https://github.com/ton-projet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition"
              >
                GitHub Projet
              </a>
            </li>
            <li className="flex justify-start sm:justify-center items-center gap-2">
              <a
                href="https://github.com/ton-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition"
              >
                GitHub Portfolio
              </a>
            </li>
          </ul>
        </div>

        {/* SECTION 3 – Infos légales */}
        <div className="lg:text-right">
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Infos légales & Crédits</h3>
          <p className="text-white/80 text-sm sm:text-base">© Davanto – Dataviz Cinéma</p>
          <p className="text-white/80 text-sm sm:text-base">Réalisé par David & Antoine M</p>
          <p className="text-white/80 mt-2 text-sm sm:text-base">
            Source API :{" "}
            <a
              href="https://opendata.paris.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple-300"
            >
              OpenData Paris
            </a>
          </p>
          <p className="text-white/80 mt-2 text-sm sm:text-base hover:text-purple-300 transition cursor-pointer">
            Mentions légales
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;