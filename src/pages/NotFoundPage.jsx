import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Dumbbell, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <div className="max-w-md text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-orange-500/10 border border-orange-500 animate-pulse">
            <Dumbbell className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-orange-500 drop-shadow-lg">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Workout Not Found 💪
        </h2>

        <p className="text-gray-400 mt-3">
          Looks like this page skipped leg day.  
          The link may be broken or the page has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            <Home size={18} />
            Back to Gym Dashboard
          </Link>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

            <Link
              to="/search"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
            >
              <Search size={16} />
              Search
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          Need assistance?{" "}
          <Link to="/contact" className="text-orange-400 hover:underline">
            Contact Gym Support
          </Link>
        </p>
      </div>
    </div>
  );
}
