import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/utils/MainLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element:<AdminDashboard />
       
      },
    ],
  },
]);