import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenu central */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer commun */}
      <Footer />
    </div>
  );
}
