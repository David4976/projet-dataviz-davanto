import { Outlet } from "react-router-dom";
import Footer from "./Footer";

interface LayoutProps {
  backgroundImage?: string; // optionnel, pour passer le fond
}

const Layout: React.FC<LayoutProps> = ({ backgroundImage }) => {
  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
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
