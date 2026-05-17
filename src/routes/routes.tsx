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
import CreateRegisterCorse from "../pages/admin/academinManagement/CreateRegisterCorse";
import AllRegister from "../pages/admin/academinManagement/AllRegister";
import CrateTeacher from "../pages/admin/academinManagement/CrateTeacher";
import Corse from "../pages/student/Corse";
import Profile from "../pages/student/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [
      // ================= ADMIN =================
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/all-semester",
        element: (
          <ProtectedRoute role="admin">
            <AcademinSemester />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-semester",
        element: (
          <ProtectedRoute role="admin">
            <CreateSemesterForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-department",
        element: (
          <ProtectedRoute role="admin">
            <CreateDepartMent />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-student",
        element: (
          <ProtectedRoute role="admin">
            <CreateStudnet />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/all-Student",
        element: (
          <ProtectedRoute role="admin">
            <Students />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-corse",
        element: (
          <ProtectedRoute role="admin">
            <CreateCorse />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-offer-corse",
        element: (
          <ProtectedRoute role="admin">
            <CreateOfferCorse />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-register-corse",
        element: (
          <ProtectedRoute role="admin">
            <CreateRegisterCorse />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/all-registers",
        element: (
          <ProtectedRoute role="admin">
            <AllRegister />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-teacher",
        element: (
          <ProtectedRoute role="admin">
            <CrateTeacher />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-FAcality",
        element: (
          <ProtectedRoute role="admin">
            <CreateAcademinFacality />
          </ProtectedRoute>
        ),
      },

      // ================= FACULTY =================
      {
        path: "faculity/dashboard",
        element: (
          <ProtectedRoute role="faculty">
            <FacalitiDeshboard />
          </ProtectedRoute>
        ),
      },

      // ================= STUDENT =================
      {
        path: "student/dashboard",
        element: (
          <ProtectedRoute role="student">
            <StudentDeshboard />
          </ProtectedRoute>
        ),
      },
      {
        path:'/student/profile',
        element:(
          <ProtectedRoute role="student">
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path:'/student/courses',
        element:(
          <ProtectedRoute role="student">
            <Corse />
          </ProtectedRoute>
        ),
      }
    ],
  },

  // ================= AUTH =================
  {
    path: "/login",
    element: <LoginPage />,
  },

  // ================= NOT FOUND =================
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);