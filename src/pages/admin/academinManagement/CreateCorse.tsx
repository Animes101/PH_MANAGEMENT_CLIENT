import React, { useState } from "react";

const CreateCorse = () => {
  const [formData, setFormData] = useState({
    title: "",
    prefix: "",
    code: "",
    credits: "",
  });

  const [preRequisiteCorse, setPreRequisiteCorse] = useState([
    {
      corse: "",
    },
  ]);

  // Main Input Handle
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Pre Requisite Handle
  const handlePreRequisiteChange = (index, value) => {
    const updatedData = [...preRequisiteCorse];

    updatedData[index].corse = value;

    setPreRequisiteCorse(updatedData);
  };

  // Add More Pre Requisite
  const handleAddPreRequisite = () => {
    setPreRequisiteCorse([
      ...preRequisiteCorse,
      {
        corse: "",
      },
    ]);
  };

  // Remove Pre Requisite
  const handleRemovePreRequisite = (index) => {
    const updatedData = preRequisiteCorse.filter(
      (_, i) => i !== index
    );

    setPreRequisiteCorse(updatedData);
  };

  // Submit Handle
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      code: Number(formData.code),
      credits: Number(formData.credits),
      preRequisiteCorse,
    };

    console.log(finalData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Corse
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
            placeholder="Enter course title"
            className="w-full border p-3 rounded-lg"
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
            placeholder="Enter prefix"
            className="w-full border p-3 rounded-lg"
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
            placeholder="Enter course code"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Credits */}
        <div>
          <label className="block mb-1 font-medium">
            Credits
          </label>

          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            placeholder="Enter credits"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Pre Requisite Courses */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Pre Requisite Corse
          </h2>

          {preRequisiteCorse.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg space-y-3"
            >
              <input
                type="text"
                placeholder="Corse ObjectId"
                value={item.corse}
                onChange={(e) =>
                  handlePreRequisiteChange(
                    index,
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              <button
                type="button"
                onClick={() =>
                  handleRemovePreRequisite(index)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddPreRequisite}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Pre Requisite
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Create Corse
        </button>
      </form>
    </div>
  );
};

export default CreateCorse;