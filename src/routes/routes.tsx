import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/utils/MainLayout";
import ProtectedRoute from "../components/utils/protectedRoute";
import AcademinSemester from "../pages/admin/academinManagement/AcademinSemester";
import CreateSemesterForm from "../pages/admin/academinManagement/CreateSemester";



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
      }
      // {
      //   path: "admin/courses/create",
      //   element: <CreateCourse />,
      // },
      // {
      //   path: "admin/reports",
      //   element: <AdminReports />,
      // },
      // {
      //   path: "admin/settings",
      //   element: <AdminSettings />,
      // },

      // // 🔥 FACULTY ROUTES
      // {
      //   path: "faculty/dashboard",
      //   element: <FacultyDashboard />,
      // },
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
      // {
      //   path: "student/dashboard",
      //   element: <StudentDashboard />,
      // },
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
  }
]);