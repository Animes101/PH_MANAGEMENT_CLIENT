import React, { useState } from "react";
import {
  useCreateCorseMutation,
  useGetAllCorseQuery,
} from "../../../redux/fetures/corse/corseApi";
import { toast } from "sonner";

const CreateCorse = () => {
  // Form State (NO credits)
  const [formData, setFormData] = useState({
    title: "",
    prefix: "",
    code: "",
  });

  // Get all courses
  const { data, isLoading, error } =
    useGetAllCorseQuery("");

  const courses = data?.data?.data || [];

  // Create mutation
  const [createCorse, { isLoading: createLoading }] =
    useCreateCorseMutation();

  // Pre requisite state
  const [preRequisiteCorse, setPreRequisiteCorse] =
    useState([
      {
        corse: "",
        isDelete: false,
      },
    ]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Pre requisite change
  const handlePreRequisiteChange = (index, value) => {
    const updated = [...preRequisiteCorse];

    updated[index] = {
      corse: value,
      isDelete: false,
    };

    setPreRequisiteCorse(updated);
  };

  // Add more
  const handleAddPreRequisite = () => {
    setPreRequisiteCorse((prev) => [
      ...prev,
      {
        corse: "",
        isDelete: false,
      },
    ]);
  };

  // Remove
  const handleRemovePreRequisite = (index) => {
    const updated = preRequisiteCorse.filter(
      (_, i) => i !== index
    );

    setPreRequisiteCorse(updated);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      return toast.error("Title is required");
    }

    if (!formData.prefix.trim()) {
      return toast.error("Prefix is required");
    }

    if (!formData.code) {
      return toast.error("Code is required");
    }

    // Final payload (NO credits)
    const finalData = {
      title: formData.title.trim(),
      prefix: formData.prefix.trim(),
      code: Number(formData.code),

      preRequisiteCorse: preRequisiteCorse.filter(
        (item) => item.corse !== ""
      ),
    };

    console.log(finalData);

    try {
      const res = await createCorse(
        finalData
      ).unwrap();

      console.log(res);

      toast.success("Course Created Successfully");

      // Reset
      setFormData({
        title: "",
        prefix: "",
        code: "",
      });

      setPreRequisiteCorse([
        {
          corse: "",
          isDelete: false,
        },
      ]);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">
          Create Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Enter title"
            />
          </div>

          {/* Prefix */}
          <div>
            <label className="block mb-1 font-medium">
              Prefix
            </label>

            <input
              type="text"
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Enter prefix"
            />
          </div>

          {/* Code */}
          <div>
            <label className="block mb-1 font-medium">
              Code
            </label>

            <input
              type="number"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Enter code"
            />
          </div>

          {/* Pre Requisite */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">
                Pre Requisite Courses
              </h2>

              <button
                type="button"
                onClick={handleAddPreRequisite}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {preRequisiteCorse.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <select
                      value={item.corse}
                      onChange={(e) =>
                        handlePreRequisiteChange(
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 border p-3 rounded-lg"
                    >
                      <option value="">
                        Select Course
                      </option>

                      {courses.map((course) => (
                        <option
                          key={course._id}
                          value={course._id}
                        >
                          {course.title}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemovePreRequisite(
                          index
                        )
                      }
                      className="bg-red-500 text-white px-4 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={createLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            {createLoading
              ? "Creating..."
              : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCorse;