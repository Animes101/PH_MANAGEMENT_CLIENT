import React from "react";
import { useGetAllSemesterQuery } from "../../../redux/fetures/academicSemester/academinSemesterApi";

const AcademinSemester = () => {
  const { data, isLoading, error } = useGetAllSemesterQuery("");

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const semesters = data?.data || [];

  if (error) {
  const errMsg =
    (error as any)?.data?.message || "Something went wrong";

  return (
    <div className="text-center mt-10 text-red-500">
      <h2 className="text-xl font-semibold">Error: {errMsg}</h2>
    </div>
  );
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Academic Semester List</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Start Month</th>
              <th className="border px-4 py-2">End Month</th>
            </tr>
          </thead>

          <tbody>
            {semesters.map((item: any, index: number) => (
              <tr key={item._id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.code}</td>
                <td className="border px-4 py-2">{item.year}</td>
                <td className="border px-4 py-2">{item.startMonth}</td>
                <td className="border px-4 py-2">{item.endMonth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademinSemester;