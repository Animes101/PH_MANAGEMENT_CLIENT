import React from "react";
import { toast } from "sonner";
import {
  useGetAllRegisterQuery,
  useUpdateRegisterSemesterMutation,
} from "../../../redux/fetures/register semester/RegisterSemesterApi";

const AllRegister = () => {
  const { data, isLoading, refetch } = useGetAllRegisterQuery("");

  const [updateRegisterSemester] =
    useUpdateRegisterSemesterMutation();

  const registers = data?.data || [];

  // ✅ UPDATE FUNCTION
  const handleStatusChange = async (id, status) => {
    console.log("SEMESTER ID:", id);
    console.log("NEW STATUS:", status);

    const toastId = toast.loading("Updating status...");

    try {
      await updateRegisterSemester({
        id,
        data: { status },
      }).unwrap();

      toast.success("Status updated successfully", {
        id: toastId,
      });

      refetch();
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

  if (isLoading)
    return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        All Registration Semester
      </h1>

      <table className="w-full border shadow-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 border">Semester</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Update Status</th>
          </tr>
        </thead>

        <tbody>
          {registers.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="p-3 border">
                {item?.academinSemister?.name || "N/A"}
              </td>

              <td className="p-3 border">
                <span className="bg-yellow-500 px-2 py-1 rounded text-white text-xs">
                  {item.status}
                </span>
              </td>

              <td className="p-3 border">
                <select
                  defaultValue={item.status}
                  onChange={(e) =>
                    handleStatusChange(item._id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="ONGOING">ONGOING</option>
                  <option value="ENDED">ENDED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRegister;