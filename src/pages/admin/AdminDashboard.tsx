import React from "react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">

      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back! Manage your system from here.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Users */}
        <div className="bg-white shadow rounded-xl p-5 border-l-4 border-blue-500">
          <h2 className="text-sm text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">1,250</p>
        </div>

        {/* Courses */}
        <div className="bg-white shadow rounded-xl p-5 border-l-4 border-green-500">
          <h2 className="text-sm text-gray-500">Total Courses</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">48</p>
        </div>

        {/* Tasks */}
        <div className="bg-white shadow rounded-xl p-5 border-l-4 border-purple-500">
          <h2 className="text-sm text-gray-500">Active Tasks</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">320</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Recent Activities
        </h2>

        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">User</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">Animes</td>
              <td>Created Course</td>
              <td className="text-green-500">Success</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">John</td>
              <td>Updated Profile</td>
              <td className="text-blue-500">Done</td>
            </tr>

            <tr>
              <td className="py-2">Sara</td>
              <td>Deleted Task</td>
              <td className="text-red-500">Removed</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;