import React from "react";
import { useGetMeQuery } from "../../redux/fetures/getme/getMeApi";

const Profile = () => {
  const { data, isLoading, error } = useGetMeQuery("");

  const user = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>

        <div className="p-6 -mt-16">
          
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={user?.profileImage}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* Name */}
          <h2 className="text-center text-2xl font-bold mt-3">
            {user?.name}
          </h2>

          <p className="text-center text-gray-500">
            {user?.email}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
            
            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Student ID:</span>{" "}
              {user?.id}
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Phone:</span>{" "}
              {user?.phoneNumber}
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Gender:</span>{" "}
              {user?.gender}
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Blood Group:</span>{" "}
              {user?.bloodGroup}
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Age:</span>{" "}
              {user?.age}
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user?.isActive === "active"
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {user?.isActive}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <span className="font-semibold">Address:</span>
            <p className="text-gray-600">{user?.address}</p>
          </div>

          {/* Guardian */}
          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <h3 className="font-semibold mb-1">Guardian</h3>
            <p>Father: {user?.guardian?.fatherName}</p>
            <p>Mother: {user?.guardian?.motherName}</p>
            <p>Phone: {user?.guardian?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;