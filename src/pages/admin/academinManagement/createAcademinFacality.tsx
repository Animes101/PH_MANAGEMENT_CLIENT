import React, { useState } from "react";
import { useCreateAcdeminFacalityMutation } from "../../../redux/fetures/academinFacality/academinFacalityApi";
import { toast } from "sonner";

export type IAcademicFaculty = {
  name: string;
};

const facultyOptions: IAcademicFaculty[] = [
  { name: "Computer Science & Engineering (CSE)" },
  { name: "Electrical & Electronic Engineering (EEE)" },
  { name: "Civil Engineering" },
  { name: "Mechanical Engineering" },
];

const CreateAcademinFacality = () => {

  const [createAcademinFacality]=useCreateAcdeminFacalityMutation();
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: IAcademicFaculty = {
      name: selectedFaculty,
    };

    try{
       await createAcademinFacality(
               data
             ).unwrap();
       
             toast.success("Semester Created Successfully");

    }catch(err:any){

      toast.error( err?.data?.message || "somthing webt worng");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Academic Faculty
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Select Faculty</label>

        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
          required
        >
          <option value="">Choose Faculty</option>

          {facultyOptions.map((faculty, index) => (
            <option key={index} value={faculty.name}>
              {faculty.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAcademinFacality;