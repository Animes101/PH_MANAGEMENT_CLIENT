import React from "react";
import { useGetMyofferCorseQuery } from "../../redux/fetures/myOfferCorse/myOfferCorseApi";

const Corse = () => {
  const { data, isLoading, error } = useGetMyofferCorseQuery("");

  const courses = data?.data?.data || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading courses...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Something went wrong
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Courses
      </h2>

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No courses found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((item: any) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100"
            >
              
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {item.corseDetails?.title}
              </h3>

              {/* Badge */}
              <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mb-3">
                {item.corseDetails?.prefix} - {item.corseDetails?.code}
              </span>

              {/* Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Credit:</span>{" "}
                  {item.corseDetails?.credits}
                </p>

                <p>
                  <span className="font-medium">Day:</span>{" "}
                  {item.days}
                </p>

                <p>
                  <span className="font-medium">Time:</span>{" "}
                  {item.startTime} - {item.endTime}
                </p>
              </div>

              {/* Status */}
              <div className="mt-4 flex justify-between items-center">
                
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.isAlredyEnrolled
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {item.isAlredyEnrolled
                    ? "Enrolled"
                    : "Not Enrolled"}
                </span>

                <span className="text-xs text-gray-500">
                  Capacity: {item.minCapacity}-{item.maxCapacity}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Corse;