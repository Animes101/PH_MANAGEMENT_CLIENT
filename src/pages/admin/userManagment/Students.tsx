
// import React from "react";
// import { useGetAllStudentQuery } from "../../../redux/fetures/student/studentApi";

// const Students = () => {
//   const [page, setPage] = React.useState(1);





//   const { data, isLoading, isError } = useGetAllStudentQuery([{ name: "page", value: page }]);

//   const students = data?.data?.data || [];
//   const meta = data?.data?.meta;

//   console.log(meta)

//   const handleDelete = async (id) => {
//     console.log("Delete:", id);
//   };

//   const handleUpdate = (student) => {
//     console.log("Update:", student);
//   };

//   // Loading
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   // Error
//   if (isError) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
//         Failed to load students
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 min-h-screen bg-gray-50">
//       <div className="bg-white rounded-2xl shadow border">

//         {/* Header */}
//         <div className="px-6 py-5 border-b">
//           <h1 className="text-2xl font-bold">Students List</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Total Students: {meta?.total || students.length}
//           </p>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-100 text-left text-sm">
//                 <th className="p-4">SL</th>
//                 <th className="p-4">Student ID</th>
//                 <th className="p-4">Name</th>
//                 <th className="p-4">Email</th>
//                 <th className="p-4">Phone</th>
//                 <th className="p-4">Gender</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((student, index) => (
//                 <tr
//                   key={student._id}
//                   className="border-t hover:bg-gray-50"
//                 >
//                   <td className="p-4">
//                     {(meta?.page - 1) * meta?.limit + index + 1}
//                   </td>

//                   <td className="p-4">{student.id}</td>

//                   <td className="p-4">{student.name}</td>

//                   <td className="p-4">{student.email || "N/A"}</td>

//                   <td className="p-4">{student.phoneNumber || "N/A"}</td>

//                   <td className="p-4">{student.gender || "N/A"}</td>

//                   <td className="p-4">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handleUpdate(student)}
//                         className="px-3 py-1 bg-gray-800 text-white rounded"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(student._id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {students.length === 0 && (
//             <div className="text-center py-10 text-gray-500">
//               No students found
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-3 py-6">

//           {/* Prev */}
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((prev) => prev - 1)}
//             className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
//           >
//             Prev
//           </button>

//           {/* Page Info */}
//           <div className="font-medium text-gray-700">
//             Page {meta?.page} of {meta?.totalPage}
//           </div>

//           {/* Next */}
//           <button
//             disabled={page === meta?.totalPage}
//             onClick={() => setPage((prev) => prev + 1)}
//             className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>

//         {/* Page Numbers */}
//         <div className="flex justify-center gap-2 pb-6">
//           {Array.from({ length: meta?.totalPage || 0 }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 rounded ${
//                 page === i + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Students;






import React, { useState } from "react";
import { useGetAllStudentQuery, useDeleteStudentMutation } from "../../../redux/fetures/student/studentApi";

const Students = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteStudent] = useDeleteStudentMutation();

  // Query args
  const queryArgs = [{ name: "page", value: String(page) }, ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
  ];

  const { data, isLoading, isError } = useGetAllStudentQuery(queryArgs);

  const students = data?.data?.data || [];
  const meta = data?.data?.meta;

  // Search
  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchText);
  };

  // Clear
  const handleClear = () => {
    setSearchText("");
    setSearchTerm("");
    setPage(1);
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("এই student কে delete করবেন?")) return;
    try {
      await deleteStudent(id).unwrap();
      alert("Deleted successfully!");
    } catch {
      alert("Delete failed!");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen text-lg font-semibold">
      Loading...
    </div>
  );

  if (isError) return (
    <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
      Failed to load students
    </div>
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow border">

        {/* Header */}
        <div className="px-6 py-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Students List</h1>
            <p className="text-sm text-gray-500 mt-1">
              Total: {meta?.total || students.length}
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Name, Email বা ID দিয়ে search..."
              className="border rounded-lg px-3 py-2 text-sm w-64 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
            {searchTerm && (
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Applied search indicator */}
        {searchTerm && (
          <div className="px-6 py-2 bg-blue-50 text-sm text-blue-700 flex items-center gap-2">
            <span>🔍 Search: <strong>"{searchTerm}"</strong></span>
            <button onClick={handleClear} className="ml-2 text-blue-500 hover:underline">
              ✕ Clear
            </button>
          </div>
        )}

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
              {students.map((student: any, index: number) => (
                <tr key={student._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    {(meta?.page - 1) * meta?.limit + index + 1}
                  </td>
                  <td className="p-4 font-mono text-sm">{student.id}</td>
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 text-gray-600">{student.email || "N/A"}</td>
                  <td className="p-4">{student.phoneNumber || "N/A"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.gender === "male"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}>
                      {student.gender || "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => console.log("Update:", student)}
                        className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
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
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">কোনো student পাওয়া যায়নি</p>
              {searchTerm && (
                <p className="text-sm mt-1">"{searchTerm}" এর জন্য কোনো result নেই</p>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {meta?.totalPage > 1 && (
          <>
            <div className="flex justify-center items-center gap-3 py-4 border-t">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
              >
                Prev
              </button>
              <span className="font-medium text-gray-700">
                Page {meta?.page} of {meta?.totalPage}
              </span>
              <button
                disabled={page === meta?.totalPage}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>

            <div className="flex justify-center gap-2 pb-6">
              {Array.from({ length: meta?.totalPage || 0 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Students;