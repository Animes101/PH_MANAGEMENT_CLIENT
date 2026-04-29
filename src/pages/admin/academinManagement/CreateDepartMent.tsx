import React, { useState } from "react";
import { useAgetAllFacalityQuery } from "../../../redux/fetures/academinFacality/academinFacalityApi";
import { useAddDepartmentMutation } from "../../../redux/fetures/academindepartment/academinDepartMentApi";
import { toast } from "sonner";

const CreateDepartMent = () => {
  const { data, isLoading, error } = useAgetAllFacalityQuery("");
  const [createDepartMent]=useAddDepartmentMutation()

  const [facultyId, setFacultyId] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  // Dynamic Faculty Data
  const faculties = data?.data?.data || [];

  // Department Dropdown Data
  const departments = [
    "Programming",
    "Operating Systems",
    "Theory of Computation",
    "Circuit Theory",
    "Thermodynamics",
  ];

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      name: departmentName,
      academinFacality: facultyId,
    };

    console.log(finalData);

    try{
       await createDepartMent(
               finalData
             ).unwrap();
       
             toast.success("Semester Created Successfully");

    }catch(err:any){

      toast.error( err?.data?.message || "somthing webt worng");
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Something went wrong
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Department
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Faculty Dropdown */}
          <div>
            <label className="block mb-2 font-medium">
              Select Faculty
            </label>

            <select
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg"
              required
            >
              <option value="">Choose Faculty</option>

              {faculties.map((item: any) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="block mb-2 font-medium">
              Select Department
            </label>

            <select
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg"
              required
            >
              <option value="">Choose Department</option>

              {departments.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Create Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartMent;