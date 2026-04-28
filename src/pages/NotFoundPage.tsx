import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-[140px] md:text-[220px] font-bold leading-none text-white/10">
        404
      </h1>

      <h2 className="text-3xl md:text-5xl font-semibold -mt-10">
        Page Not Found
      </h2>

      <p className="mt-4 text-gray-400 text-center max-w-xl text-lg">
        The page you are trying to access does not exist or may have been removed.
      </p>

      <Link
        to="/"
        className="mt-8 border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;