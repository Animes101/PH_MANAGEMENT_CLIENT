import React, { useState } from "react";
import { toast } from "sonner";
import { useGetAllSemesterQuery } from "../../../redux/fetures/academicSemester/academinSemesterApi";
import { useAgetAllDepartmentQuery } from "../../../redux/fetures/academindepartment/academinDepartMentApi";
import { useCreateStudentMutation } from "../../../redux/fetures/student/studentApi";

const initialState = {
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
};

const CreateStudnet = () => {
  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllSemesterQuery("");

  const { data: departmentData, isLoading: departmentLoading } =
    useAgetAllDepartmentQuery("");

  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const semesters = semesterData?.data || [];
  const departments = departmentData?.data?.data || [];

  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // input handle
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("guardian.")) {
      const field = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,
        guardian: {
          ...prev.guardian,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // image handle
  const handleFileChange = (e) => {
    const image = e.target.files[0];

    if (!image) return;

    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  // reset
  const resetForm = () => {
    setFormData(initialState);
    setFile(null);
    setPreview("");
  };

  // validation
  const validateForm = () => {
    if (!formData.name) return toast.error("Student name required");
    if (!formData.age) return toast.error("Age required");
    if (!formData.gender) return toast.error("Gender required");
    if (!formData.dateOfBirth) return toast.error("Date of birth required");
    if (!formData.bloodGroup) return toast.error("Blood group required");
    if (!formData.address) return toast.error("Address required");
    if (!formData.grade) return toast.error("Grade required");
    if (!formData.email) return toast.error("Email required");
    if (!formData.phoneNumber) return toast.error("Phone number required");
    if (!formData.guardian.fatherName)
      return toast.error("Father name required");
    if (!formData.guardian.motherName)
      return toast.error("Mother name required");
    if (!formData.guardian.phone)
      return toast.error("Guardian phone required");
    if (!formData.department) return toast.error("Department required");
    if (!formData.admisonSemester)
      return toast.error("Admission semester required");

    return true;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid !== true) return;

    const studentData = {
      ...formData,
      age: Number(formData.age),
      isDelete: false,
    };

    const payload = new FormData();

    if (file) {
      payload.append("file", file);
    }

    // IMPORTANT FIX
    payload.append(
      "data",
      JSON.stringify({
        studentData,
      })
    );

    try {
      const res = await createStudent(payload).unwrap();

      toast.success(res?.message || "Student Created Successfully");
      resetForm();
    } catch (error:any) {
      console.log(error);
      toast.error(error?.data?.message || "Create Failed");
    }
  };

  if (semesterLoading || departmentLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Create Student
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* image */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Profile Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-3 rounded-lg w-full"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 rounded-full object-cover mt-3 border"
              />
            )}
          </div>

          {/* basic */}
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
            <option value="">Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Grade</option>
            {["A", "B", "C", "D", "F"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          {/* dropdown */}
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
            className="border p-3 rounded-lg md:col-span-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* guardian */}
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
            className="border p-3 rounded-lg md:col-span-2"
          />

          {/* button */}
          <div className="md:col-span-2">
            <button
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {isLoading ? "Creating..." : "Create Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudnet;