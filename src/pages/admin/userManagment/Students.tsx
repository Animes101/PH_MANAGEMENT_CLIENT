import React from "react";
import { useGetAllStudentQuery } from "../../../redux/fetures/student/studentApi";

const Students = () => {
  const [page, setPage] = React.useState(1);

  console.log(page);

  const { data, isLoading, isError } = useGetAllStudentQuery(['5']);

  const students = data?.data?.data || [];
  const meta = data?.data?.meta;

  console.log(meta)

  const handleDelete = async (id) => {
    console.log("Delete:", id);
  };

  const handleUpdate = (student) => {
    console.log("Update:", student);
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Failed to load students
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow border">

        {/* Header */}
        <div className="px-6 py-5 border-b">
          <h1 className="text-2xl font-bold">Students List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total Students: {meta?.total || students.length}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-4">SL</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Gender</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    {(meta?.page - 1) * meta?.limit + index + 1}
                  </td>

                  <td className="p-4">{student.id}</td>

                  <td className="p-4">{student.name}</td>

                  <td className="p-4">{student.email || "N/A"}</td>

                  <td className="p-4">{student.phoneNumber || "N/A"}</td>

                  <td className="p-4">{student.gender || "N/A"}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleUpdate(student)}
                        className="px-3 py-1 bg-gray-800 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 py-6">

          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
          >
            Prev
          </button>

          {/* Page Info */}
          <div className="font-medium text-gray-700">
            Page {meta?.page} of {meta?.totalPage}
          </div>

          {/* Next */}
          <button
            disabled={page === meta?.totalPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {/* Page Numbers */}
        <div className="flex justify-center gap-2 pb-6">
          {Array.from({ length: meta?.totalPage || 0 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Students;