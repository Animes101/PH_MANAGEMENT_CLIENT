import React, { useState } from "react";
import { toast } from "sonner";
import { useAgetAllDepartmentQuery } from "../../../redux/fetures/academindepartment/academinDepartMentApi";
import { useCreateTeacherMutation } from "../../../redux/fetures/teacherApi";

// Department API

// Teacher API


const CrateTeacher = () => {
  // ================= API =================
  const { data: departmentData } =
    useAgetAllDepartmentQuery("");

  const [createTeacher] =
    useCreateTeacherMutation();

  // ================= STATE =================
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "MALE",
    dateOfBirth: "",
    bloodGroup: "A+",
    email: "",
    phoneNumber: "",
    address: "",
    designation: "",
    department: "",
    isActive: "active",
  });

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      age: Number(formData.age),
    };

    try {
      const res = await createTeacher(
        finalData
      ).unwrap();

      console.log(res);

      toast.success(
        "Teacher Created Successfully"
      );

      // Reset Form
      setFormData({
        name: "",
        age: "",
        gender: "MALE",
        dateOfBirth: "",
        bloodGroup: "A+",
        email: "",
        phoneNumber: "",
        address: "",
        designation: "",
        department: "",
        isActive: "active",
      });
    } catch (error) {

      toast.error("Something went wrong");
    }
  };

  // ================= DATA =================
  const departments =
    departmentData?.data?.data || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Teacher
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Teacher Name"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter Age"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="MALE">
              Male
            </option>

            <option value="FEMALE">
              Female
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>
        </div>

        {/* Date Of Birth */}
        <div>
          <label className="block mb-1 font-medium">
            Date Of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-medium">
            Blood Group
          </label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium">
            Phone Number
          </label>

          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">
            Address
          </label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block mb-1 font-medium">
            Designation
          </label>

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Enter Designation"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 font-medium">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Select Department
            </option>

            {departments?.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Active Status */}
        <div>
          <label className="block mb-1 font-medium">
            Status
          </label>

          <select
            name="isActive"
            value={formData.isActive}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Create Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrateTeacher;