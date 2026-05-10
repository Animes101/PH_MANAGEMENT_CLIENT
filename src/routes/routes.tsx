import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/utils/MainLayout";
import ProtectedRoute from "../components/utils/protectedRoute";
import AcademinSemester from "../pages/admin/academinManagement/AcademinSemester";
import CreateSemesterForm from "../pages/admin/academinManagement/CreateSemester";
import FacalitiDeshboard from "../pages/facaliti/FacalitiDeshboard";
import StudentDeshboard from "../pages/student/StudentDeshboard";
import CreateAcademinFacality from "../pages/admin/academinManagement/createAcademinFacality";
import NotFoundPage from "../pages/NotFoundPage";
import CreateDepartMent from "../pages/admin/academinManagement/CreateDepartMent";
import CreateStudnet from "../pages/admin/userManagment/CreateStudnet";
import Students from "../pages/admin/userManagment/Students";
import CreateCorse from "../pages/admin/academinManagement/CreateCorse";
import CreateOfferCorse from "../pages/admin/academinManagement/CreateOfferCorse";



export const router = createBrowserRouter([
  {
    path: "/",
    element:<ProtectedRoute><MainLayout /></ProtectedRoute>,

    children: [
      // 🔥 ADMIN ROUTES
      {
        
        path: "admin/dashboard",
        element:<AdminDashboard />
        
      },
      {
        path: "/admin/all-semester",
        element: <AcademinSemester />
      },
      {
        path:'/admin/create-semester',
        element:<CreateSemesterForm />
      },
      {
        path:'/admin/create-department',
        element:<CreateDepartMent />
      },
      {
        path:'/admin/create-student',
        element:<CreateStudnet />
      },
      {
        path:"/admin/all-Student",
        element:<Students />
      },
      {
        path:"/admin/create-corse",
        element:<CreateCorse />
      },
      {
        path:"/admin/create-offer-corse",
        element:<CreateOfferCorse />
      },
  

      // // 🔥 FACULTY ROUTES
      {
        path: "/faculity/dashboard",
        element: <FacalitiDeshboard />,
      },
      {
        path:'/admin/create-FAcality',
        element:<CreateAcademinFacality />

      },
      // {
      //   path: "faculty/courses",
      //   element: <FacultyCourses />,
      // },
      // {
      //   path: "faculty/assignments/create",
      //   element: <CreateAssignment />,
      // },
      // {
      //   path: "faculty/students",
      //   element: <FacultyStudents />,
      // },

      // // 🔥 STUDENT ROUTES
      {
        path: "student/dashboard",
        element: <StudentDeshboard />,
      },
      // {
      //   path: "student/courses",
      //   element: <StudentCourses />,
      // },
      // {
      //   path: "student/tasks",
      //   element: <StudentTasks />,
      // },
      // {
      //   path: "student/profile",
      //   element: <StudentProfile />,
      // },
    ],
    
  },
  {
    path:'/login',
    element:<LoginPage />
  },
  {
    path:'*',
    element:<NotFoundPage />
  }
]);