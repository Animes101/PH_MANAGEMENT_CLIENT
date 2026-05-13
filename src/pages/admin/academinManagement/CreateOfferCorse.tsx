import React, { useState } from "react";
import { toast } from "sonner";

// ================= APIs =================
import { useGetAllSemesterQuery } from "../../../redux/fetures/academicSemester/academinSemesterApi";

import { useAgetAllFacalityQuery } from "../../../redux/fetures/academinFacality/academinFacalityApi";

import { useGetAllCorseQuery } from "../../../redux/fetures/corse/corseApi";

import { useGetAllRegisterQuery } from "../../../redux/fetures/register semester/RegisterSemesterApi";

import { useGetAllTeacherQuery } from "../../../redux/fetures/teacherApi";

import { useCreateOfferCorseMutation } from "../../../redux/fetures/offercorse/offercorseApi";

const CreateOfferCorse = () => {
  // ================= GET APIs =================
  const {
    data: semesterData,
    isLoading: semesterLoading,
  } = useGetAllSemesterQuery("");

  const {
    data: facultyData,
    isLoading: facultyLoading,
  } = useAgetAllFacalityQuery("");

  console.log(facultyData)

  const {
    data: corseData,
    isLoading: corseLoading,
  } = useGetAllCorseQuery("");

  const {
    data: teacherData,
    isLoading: teacherLoading,
  } = useGetAllTeacherQuery("");

  
  console.log(teacherData)
  const {
    data: registerSemesterData,
    isLoading: registerLoading,
  } = useGetAllRegisterQuery("");

  // ================= CREATE API =================
  const [
    createOfferCorse,
    { isLoading },
  ] = useCreateOfferCorseMutation();

  // ================= STATE =================
  const [formData, setFormData] = useState({
    registationSementer: "",
    academinSemester: "",
    academinFacaulty: "",
    corse: "",
    teacher: "",
    maxCapacity: "",
    minCapacity: "",
    days: "sunday",
    startTime: "",
    endTime: "",
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

    // ================= VALIDATION =================
    if (
      !formData.registationSementer ||
      !formData.academinSemester ||
      !formData.academinFacaulty ||
      !formData.corse ||
      !formData.teacher ||
      !formData.maxCapacity ||
      !formData.minCapacity ||
      !formData.startTime ||
      !formData.endTime
    ) {
      return toast.error(
        "All fields are required"
      );
    }

    if (
      Number(formData.minCapacity) >
      Number(formData.maxCapacity)
    ) {
      return toast.error(
        "Min Capacity cannot be greater than Max Capacity"
      );
    }

    // ================= FINAL DATA =================
    const finalData = {
      registationSementer:
        formData.registationSementer,

      academinSemester:
        formData.academinSemester,

      academinFacaulty:
        formData.academinFacaulty,

      corse: formData.corse,

      teacher: formData.teacher,

      maxCapacity: Number(
        formData.maxCapacity
      ),

      minCapacity: Number(
        formData.minCapacity
      ),

      days: formData.days,

      startTime: formData.startTime,

      endTime: formData.endTime,
    };

    try {
      const res =
        await createOfferCorse(
          finalData
        ).unwrap();

      console.log(res);

      toast.success(
        "Offer Course Created Successfully"
      );

      // ================= RESET =================
      setFormData({
        registationSementer: "",
        academinSemester: "",
        academinFacaulty: "",
        corse: "",
        teacher: "",
        maxCapacity: "",
        minCapacity: "",
        days: "sunday",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ================= DATA =================
  const semesters =
    semesterData?.data || [];

  const faculties = facultyData?.data?.data || [];

  const corses =
    corseData?.data?.data || [];

  const teachers =
    teacherData?.data?.data || [];

  const registerSemesters =
    registerSemesterData?.data || [];

  // ================= LOADING =================
  if (
    semesterLoading ||
    facultyLoading ||
    corseLoading ||
    teacherLoading ||
    registerLoading
  ) {
    return (
      <div className="text-center py-10 text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Offer Course
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Registration Semester */}
        <div>
          <label className="block mb-1 font-medium">
            Registration Semester
          </label>

          <select
            name="registationSementer"
            value={
              formData.registationSementer
            }
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Select Registration Semester
            </option>

            {registerSemesters.map(
              (item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item?.status}
                </option>
              )
            )}
          </select>
        </div>

        {/* Academic Semester */}
        <div>
          <label className="block mb-1 font-medium">
            Academic Semester
          </label>

          <select
            name="academinSemester"
            value={
              formData.academinSemester
            }
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Select Academic Semester
            </option>

            {semesters.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item?.name} -{" "}
                {item?.year}
              </option>
            ))}
          </select>
        </div>

        {/* Academic Faculty */}
        <div>
          <label className="block mb-1 font-medium">
            Academic Faculty
          </label>

          <select
            name="academinFacaulty"
            value={
              formData.academinFacaulty
            }
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Select Faculty
            </option>

            {faculties.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block mb-1 font-medium">
            Course
          </label>

          <select
            name="corse"
            value={formData.corse}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Select Course
            </option>

            {corses.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item?.title}
              </option>
            ))}
          </select>
        </div>

        {/* Teacher */}
        <div>
          <label className="block mb-1 font-medium">
            Teacher
          </label>

          <select
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Select Teacher
            </option>

            {teachers.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item?.name}
                
              </option>
            ))}
          </select>
        </div>

        {/* Max Capacity */}
        <div>
          <label className="block mb-1 font-medium">
            Max Capacity
          </label>

          <input
            type="number"
            name="maxCapacity"
            value={
              formData.maxCapacity
            }
            onChange={handleChange}
            placeholder="Enter Max Capacity"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Min Capacity */}
        <div>
          <label className="block mb-1 font-medium">
            Min Capacity
          </label>

          <input
            type="number"
            name="minCapacity"
            value={
              formData.minCapacity
            }
            onChange={handleChange}
            placeholder="Enter Min Capacity"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Days */}
        <div>
          <label className="block mb-1 font-medium">
            Days
          </label>

          <select
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="sunday">
              Sunday
            </option>

            <option value="monday">
              Monday
            </option>

            <option value="tuesday">
              Tuesday
            </option>

            <option value="wednesday">
              Wednesday
            </option>

            <option value="thursday">
              Thursday
            </option>
          </select>
        </div>

        {/* Start Time */}
        <div>
          <label className="block mb-1 font-medium">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={
              formData.startTime
            }
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block mb-1 font-medium">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {isLoading
              ? "Creating..."
              : "Create Offer Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOfferCorse;