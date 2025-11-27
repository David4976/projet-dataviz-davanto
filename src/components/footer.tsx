import { Link } from "react-router-dom";
// import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
        w-full 
        bg-white/10 backdrop-blur-lg border-t border-white/20
        text-white 
        mt-16
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* SECTION 1 — À propos */}
        <div>
          <h3 className="text-xl font-semibold mb-3">À propos du projet</h3>
          <p className="text-white/80 leading-relaxed">
            Projet de datavisualisation autour des lieux de tournages à Paris.
            Analyse, visualisation et exploration des données publiques.
          </p>
        </div>

        {/* SECTION 2 — Liens utiles */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3">Liens utiles</h3>

          <ul className="space-y-2">
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
            <li className="flex justify-center items-center gap-2">
              {/* <FaGithub className="text-xl" /> */}
              <a
                href="https://github.com/ton-projet"
                target="_blank"
                className="hover:text-purple-300 transition"
              >
                GitHub Projet
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              {/* <FaGithub className="text-xl" /> */}
              <a
                href="https://github.com/ton-portfolio"
                target="_blank"
                className="hover:text-purple-300 transition"
              >
                GitHub Portfolio
              </a>
            </li>
          </ul>
        </div>

        {/* SECTION 3 — Infos légales */}
        <div className="md:text-right">
          <h3 className="text-xl font-semibold mb-3">
            Infos légales & Crédits
          </h3>

          <p className="text-white/80">© Davanto — Dataviz Cinéma</p>
          <p className="text-white/80">Réalisé par David & Antoine M</p>
          <p className="text-white/80 mt-2">
            Source API :{" "}
            <a
              href="https://opendata.paris.fr"
              target="_blank"
              className="underline hover:text-purple-300"
            >
              OpenData Paris
            </a>
          </p>
          <p className="text-white/80 mt-2 hover:text-purple-300 transition cursor-pointer">
            Mentions légales
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
