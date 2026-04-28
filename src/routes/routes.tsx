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



// ADMIN
// import AdminUsers from "../pages/admin/AdminUsers";
// import CreateCourse from "../pages/admin/CreateCourse";
// import AdminReports from "../pages/admin/AdminReports";
// import AdminSettings from "../pages/admin/AdminSettings";

// // FACULTY
// import FacultyDashboard from "../pages/faculty/FacultyDashboard";
// import FacultyCourses from "../pages/faculty/FacultyCourses";
// import CreateAssignment from "../pages/faculty/CreateAssignment";
// import FacultyStudents from "../pages/faculty/FacultyStudents";

// // STUDENT
// import StudentDashboard from "../pages/student/StudentDashboard";
// import StudentCourses from "../pages/student/StudentCourses";
// import StudentTasks from "../pages/student/StudentTasks";
// import StudentProfile from "../pages/student/StudentProfile";

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