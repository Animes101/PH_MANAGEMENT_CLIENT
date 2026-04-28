import React, { useState } from "react";
import { toast } from "sonner";
import { useCreateSemesterMutation } from "../../../redux/fetures/academicSemester/academinSemesterApi";

/* ================= TYPES ================= */

type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type TSemesterName = "Autumn" | "Summer" | "Fall";
type TSemesterCode = "01" | "02" | "03";

interface IAcademicSemister {
  name: TSemesterName;
  code: TSemesterCode;
  year: number;
  startMonth: TMonth;
  endMonth: TMonth;
}

/* ================= DATA ================= */

const semesterOptions: {
  name: TSemesterName;
  code: TSemesterCode;
}[] = [
  { name: "Summer", code: "02" },
  { name: "Autumn", code: "01" },
  { name: "Fall", code: "03" },
];

const monthOptions: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* ================= COMPONENT ================= */

const CreateSemesterForm = () => {
  const [addAcademinSemester, { isLoading }] =
    useCreateSemesterMutation();

  const [selectedName, setSelectedName] =
    useState<TSemesterName | "">("");

  const [year, setYear] = useState("");
  const [startMonth, setStartMonth] =
    useState<TMonth | "">("");

  const [endMonth, setEndMonth] =
    useState<TMonth | "">("");

  const selectedSemester = semesterOptions.find(
    (item) => item.name === selectedName
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const semesterData = {
      data: {
        name: selectedName as TSemesterName,
        code: selectedSemester?.code as TSemesterCode,
        year: Number(year),
        startMonth: startMonth as TMonth,
        endMonth: endMonth as TMonth,
      },
    };

    try {
      await addAcademinSemester(
        semesterData
      ).unwrap();

      toast.success("Semester Created Successfully");

      setSelectedName("");
      setYear("");
      setStartMonth("");
      setEndMonth("");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Create Semester
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Fill all information carefully
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Semester Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Semester Name
            </label>

            <select
              value={selectedName}
              onChange={(e) =>
                setSelectedName(
                  e.target.value as TSemesterName
                )
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select Semester
              </option>

              {semesterOptions.map((item) => (
                <option
                  key={item.code}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Code */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Semester Code
            </label>

            <input
              type="text"
              readOnly
              value={selectedSemester?.code || ""}
              placeholder="Auto"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Year
            </label>

            <input
              type="number"
              placeholder="2026"
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Start Month */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Start Month
            </label>

            <select
              value={startMonth}
              onChange={(e) =>
                setStartMonth(
                  e.target.value as TMonth
                )
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select Month
              </option>

              {monthOptions.map((month) => (
                <option
                  key={month}
                  value={month}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* End Month */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              End Month
            </label>

            <select
              value={endMonth}
              onChange={(e) =>
                setEndMonth(
                  e.target.value as TMonth
                )
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select Month
              </option>

              {monthOptions.map((month) => (
                <option
                  key={month}
                  value={month}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md disabled:bg-gray-400"
        >
          {isLoading
            ? "Submitting..."
            : "Create Semester"}
        </button>
      </form>
    </div>
  );
};

export default CreateSemesterForm;