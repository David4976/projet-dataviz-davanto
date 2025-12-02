import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

interface LayoutProps {
  backgroundImage?: string;
}

const Layout: React.FC<LayoutProps> = ({ backgroundImage }) => {
  // Créer l'objet style seulement si backgroundImage existe
  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` } 
    : undefined;

  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      {...(backgroundStyle && { style: backgroundStyle })}
    >
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <main className="flex-1 flex justify-center items-start pt-20 px-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;