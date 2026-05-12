import React, { useState } from "react";
import { toast } from "sonner";
import { useGetAllSemesterQuery } from "../../../redux/fetures/academicSemester/academinSemesterApi";
import { useCreateRegisterSemesterMutation } from "../../../redux/fetures/register semester/RegisterSemesterApi";

const CreateRegisterCorse = () => {
  // Get Semester
  const { data } = useGetAllSemesterQuery("");

  // Create Mutation
  const [createRegisterSemester, { isLoading }] =
    useCreateRegisterSemesterMutation();

  const semesters = data?.data || [];

  const [formData, setFormData] = useState({
    academinSemister: "",
    status: "UPCOMING",
    startDate: "",
    endDate: "",
    minCredit: "",
    maxCredit: "",
  });

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Registration Creating...");

    try {
      const payload = {
        ...formData,
        minCredit: Number(formData.minCredit),
        maxCredit: Number(formData.maxCredit),
      };

      const res = await createRegisterSemester(payload).unwrap();

      if (res.success) {
        toast.success("Registration Created Successfully", {
          id: toastId,
        });

        // Reset Form
        setFormData({
          academinSemister: "",
          status: "UPCOMING",
          startDate: "",
          endDate: "",
          minCredit: "",
          maxCredit: "",
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message || "Something went wrong",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create Registration Semester
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Academic Semester */}
          <div>
            <label className="block mb-2 font-medium">
              Academic Semester
            </label>

            <select
              name="academinSemister"
              value={formData.academinSemister}
              onChange={handleChange}
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Semester</option>

              {semesters?.map((semester) => (
                <option key={semester._id} value={semester._id}>
                  {semester.name} - {semester.year}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">
              Registration Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UPCOMING">UPCOMING</option>
              <option value="ONGOING">ONGOING</option>
              <option value="ENDED">ENDED</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-2 font-medium">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 font-medium">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Min Credit */}
          <div>
            <label className="block mb-2 font-medium">
              Min Credit
            </label>

            <input
              type="number"
              name="minCredit"
              value={formData.minCredit}
              onChange={handleChange}
              placeholder="Enter Min Credit"
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Max Credit */}
          <div>
            <label className="block mb-2 font-medium">
              Max Credit
            </label>

            <input
              type="number"
              name="maxCredit"
              value={formData.maxCredit}
              onChange={handleChange}
              placeholder="Enter Max Credit"
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            {isLoading ? "Creating..." : "Create Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRegisterCorse;