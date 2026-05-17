import React from "react";
import { useGetMyofferCorseQuery } from "../../redux/fetures/myOfferCorse/myOfferCorseApi";

const Corse = () => {
  const { data, isLoading, error } = useGetMyofferCorseQuery("");

  // ✅ correct extraction
  const courses = data?.data?.data || [];

  console.log("courses:", courses);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Courses</h2>

      {courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        <div className="space-y-3">
          {courses.map((item: any) => (
            <div
              key={item._id}
              className="p-3 border rounded bg-gray-100"
            >
              <h3 className="font-bold">
                {item.corseDetails?.title}
              </h3>

              <p>Code: {item.corseDetails?.code}</p>
              <p>Credit: {item.corseDetails?.credits}</p>
              <p>Day: {item.days}</p>
              <p>
                Time: {item.startTime} - {item.endTime}
              </p>

              <p>
                Enrolled:{" "}
                {item.isAlredyEnrolled ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Corse;