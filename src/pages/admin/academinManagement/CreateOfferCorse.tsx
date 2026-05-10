import React, { useState } from "react";

const CreateOfferCorse = () => {
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

  // Input Handle
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Handle
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      maxCapacity: Number(formData.maxCapacity),
      minCapacity: Number(formData.minCapacity),
    };

    console.log(finalData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Offer Corse
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Registration Semester */}
        <div>
          <label className="block mb-1 font-medium">
            Registration Semester
          </label>

          <input
            type="text"
            name="registationSementer"
            value={formData.registationSementer}
            onChange={handleChange}
            placeholder="Enter Registration Semester Id"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Academic Semester */}
        <div>
          <label className="block mb-1 font-medium">
            Academic Semester
          </label>

          <input
            type="text"
            name="academinSemester"
            value={formData.academinSemester}
            onChange={handleChange}
            placeholder="Enter Academic Semester Id"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Academic Faculty */}
        <div>
          <label className="block mb-1 font-medium">
            Academic Faculty
          </label>

          <input
            type="text"
            name="academinFacaulty"
            value={formData.academinFacaulty}
            onChange={handleChange}
            placeholder="Enter Academic Faculty Id"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Course */}
        <div>
          <label className="block mb-1 font-medium">
            Corse
          </label>

          <input
            type="text"
            name="corse"
            value={formData.corse}
            onChange={handleChange}
            placeholder="Enter Corse Id"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Teacher */}
        <div>
          <label className="block mb-1 font-medium">
            Teacher
          </label>

          <input
            type="text"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            placeholder="Enter Teacher Id"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Max Capacity */}
        <div>
          <label className="block mb-1 font-medium">
            Max Capacity
          </label>

          <input
            type="number"
            name="maxCapacity"
            value={formData.maxCapacity}
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
            value={formData.minCapacity}
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
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
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
            value={formData.startTime}
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

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Create Offer Corse
        </button>
      </form>
    </div>
  );
};

export default CreateOfferCorse;