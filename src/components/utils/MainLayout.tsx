import { Outlet } from "react-router-dom";
import Footer from "./Footer";





const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar / Header */}
      <div>
        <h1>Navbar</h1>
      </div>

      {/* Page Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer (always bottom) */}
      <Footer />
    </div>
  );
};

export default MainLayout;