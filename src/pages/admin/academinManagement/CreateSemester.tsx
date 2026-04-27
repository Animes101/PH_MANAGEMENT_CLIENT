import React, { useState } from "react";

const semesterOptions = [
  {
    name: "Summer",
    code: "02",
  },
  {
    name: "Autumn",
    code: "01",
  },
  {
    name: "Fall",
    code: "03",
  },
];

const CreateSemesterForm = () => {
  const [selectedName, setSelectedName] = useState("");
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const selectedSemester = semesterOptions.find(
    (item) => item.name === selectedName
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const semesterData = {
      name: selectedName,
      code: selectedSemester?.code || "",
      year,
      startDate,
      endDate,
    };

    console.log(semesterData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-blue-50 border border-blue-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Create Semester
      </h2>

      {/* Name Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Semester Name
        </label>
        <select
          value={selectedName}
          onChange={handleChange}
          className="w-full border border-blue-200 px-3 py-2 rounded-lg bg-white"
        >
          <option value="">Select Semester</option>
          {semesterOptions.map((item) => (
            <option key={item.code} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Code */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Code</label>
        <input
          type="text"
          value={selectedSemester?.code || ""}
          readOnly
          className="w-full border border-blue-200 px-3 py-2 rounded-lg bg-blue-100"
        />
      </div>

      {/* Year */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Year</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Year"
          className="w-full border border-blue-200 px-3 py-2 rounded-lg bg-white"
        />
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-blue-200 px-3 py-2 rounded-lg bg-white"
        />
      </div>

      {/* End Date */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border border-blue-200 px-3 py-2 rounded-lg bg-white"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateSemesterForm;