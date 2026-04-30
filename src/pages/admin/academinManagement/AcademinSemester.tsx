import React, { useState } from "react";
import {
  useGetAllSemesterQuery,
} from "../../../redux/fetures/academicSemester/academinSemesterApi";

const AcademinSemester = () => {
  const { data, isLoading, error } = useGetAllSemesterQuery("");

  const [selectedSemester, setSelectedSemester] = useState("");

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    const errMsg = error?.data?.message || "Something went wrong";

    return (
      <div className="text-center mt-10 text-red-500">
        <h2 className="text-xl font-semibold">Error: {errMsg}</h2>
      </div>
    );
  }

  const semesters = data?.data || [];

  // Filter Handle
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedSemester(value);

    

  };

  // Filtered Data
  const filteredSemesters = selectedSemester === "" ? semesters: semesters.filter((item) => item.name === selectedSemester);

  // Delete
  const handleDelete = (id:string) => {
    console.log("Delete ID:", id);
  };

  // Edit
  const handleEdit = (id:string) => {
    console.log("Edit ID:", id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Academic Semester List
        </h1>

        {/* Dropdown Filter */}
        <select
          value={selectedSemester}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">All Semester</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Autumn">Autumn</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Start Month</th>
              <th className="px-4 py-3">End Month</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSemesters.map((item, index) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.code}</td>
                <td className="px-4 py-3">{item.year}</td>
                <td className="px-4 py-3">{item.startMonth}</td>
                <td className="px-4 py-3">{item.endMonth}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-black"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredSemesters.length === 0 && (
              <tr>
                <td className="text-center py-6 text-gray-500">
                  No Semester Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademinSemester;