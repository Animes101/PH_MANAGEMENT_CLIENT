import React from "react";
import { useGetAllStudentQuery } from "../../../redux/fetures/student/studentApi";

const Students = () => {
  const { data, isLoading, isError } = useGetAllStudentQuery("");

  const students = data?.data?.data || [];

  const handleDelete = async (id) => {
    console.log(id);
  };

  const handleUpdate = (student) => {
    console.log("Update Student:", student);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Failed to load students
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Students List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total Students: {students.length}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-6 py-4 text-left">SL</th>
                <th className="px-6 py-4 text-left">Student ID</th>
                <th className="px-6 py-4 text-left">Full Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Contact No</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-700">{index + 1}</td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {student.id}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {student.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {student.email || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {student.phoneNumber || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {student.gender || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleUpdate(student)}
                        className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-black transition"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No students found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;