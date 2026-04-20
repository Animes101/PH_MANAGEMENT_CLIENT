import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./NavBar";


const MainLayout = () => {
    

  return (
    <div className="flex min-h-screen">

      {/* Sidebar LEFT */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">

        {/* Header TOP */}
        <Header />

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>

        {/* Footer BOTTOM */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;


