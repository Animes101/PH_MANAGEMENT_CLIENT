import React, { useState } from "react";
import { useGetAllSemesterQuery } from "../../../redux/fetures/academicSemester/academinSemesterApi";
import { useAgetAllDepartmentQuery } from "../../../redux/fetures/academindepartment/academinDepartMentApi";

const CreateStudnet = () => {
  const { data: semesterData } = useGetAllSemesterQuery("");
  const { data: departmentData } = useAgetAllDepartmentQuery("");

  const semesters = semesterData?.data || [];
  const departments = departmentData?.data?.data || [];

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",
    grade: "",
    email: "",
    phoneNumber: "",
    guardian: {
      fatherName: "",
      motherName: "",
      phone: "",
    },
    department: "",
    isActive: "active",
    admisonSemester: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("guardian.")) {
      const field = name.split(".")[1];

      setFormData({
        ...formData,
        guardian: {
          ...formData.guardian,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      studentData: {
        ...formData,
        age: Number(formData.age),
        isDelete: false,
      },
    };

    console.log(finalData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Create Student
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Grade</option>
            {["A", "B", "C", "D", "F"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {/* Department Dropdown */}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>

          {/* Semester Dropdown */}
          <select
            name="admisonSemester"
            value={formData.admisonSemester}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {semester.name} {semester.year}
              </option>
            ))}
          </select>

          <select
            name="isActive"
            value={formData.isActive}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Guardian */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Guardian Information
            </h3>
          </div>

          <input
            type="text"
            name="guardian.fatherName"
            placeholder="Father Name"
            value={formData.guardian.fatherName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="guardian.motherName"
            placeholder="Mother Name"
            value={formData.guardian.motherName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="guardian.phone"
            placeholder="Guardian Phone"
            value={formData.guardian.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
              Create Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudnet;