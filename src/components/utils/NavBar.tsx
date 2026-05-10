import { NavLink } from "react-router-dom";
import { useState } from "react";

type Role = "admin" | "faculty" | "student";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // 🔥 test role (later Redux/API)
  const role: Role = "admin";

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menu = {
    admin: [
  { name: "Dashboard", path: "/admin/dashboard" },

  {
    name: "User Management",
    children: [
      {name:'Create Studnet', path:'/admin/create-student'},
      { name: "All Students", path: "/admin/all-Student" },
    ],
  },

  {
    name: "Academic Management",
    children: [
      { name: "All Semester", path: "/admin/all-semester" },
      { name: "create Semester", path: "/admin/create-semester" },
      { name: "create Facality", path: "/admin/create-FAcality" },
      { name: "create Department", path: "/admin/create-department" },
      { name: "create  Create Corse", path: "/admin/create-corse" },
      { name: "create Create Offer Corse", path: "/admin/create-offer-corse" },
    ],
  },

  { name: "Reports", path: "/admin/reports" },
  { name: "Settings", path: "/admin/settings" },
],


faculty: [
  { name: "Dashboard", path: "/faculty/dashboard" },

  {
    name: "Course Management",
    children: [
      { name: "My Courses", path: "/faculty/courses" },
      { name: "Create Assignment", path: "/faculty/assignments/create" },
    ],
  },

  { name: "Students", path: "/faculty/students" },
],

student: [
  { name: "Dashboard", path: "/student/dashboard" },

  {
    name: "My Learning",
    children: [
      { name: "Courses", path: "/student/courses" },
      { name: "Tasks", path: "/student/tasks" },
    ],
  },

  { name: "Profile", path: "/student/profile" },
],


  }

  const links = menu[role];

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-300 p-5">
      
      {/* Logo */}
      <h2 className="text-2xl font-bold text-white mb-2">
        PH Management
      </h2>

      {/* Role Label */}
      <p className="text-xs text-gray-400 mb-6 uppercase">
        {role} panel
      </p>

      {/* Menu */}
      <ul className="space-y-2">
        {links.map((item, index) => (
          <li key={index}>
            
            {/* Normal Link */}
            {!("children" in item) && (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            )}

            {/* Dropdown */}
            {"children" in item && (
              <div>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="w-full flex justify-between items-center px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                >
                  {item.name}
                  <span>{openMenu === item.name ? "▲" : "▼"}</span>
                </button>

                {openMenu === item.name && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item?.children?.map((sub) => (
                      <li key={sub.path}>
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            `block px-3 py-1 rounded text-sm ${
                              isActive
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-700"
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;


