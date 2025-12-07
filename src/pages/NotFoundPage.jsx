import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
 

  // this is the not found page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-500 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>

            <Link
              to="/search"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link to="/contact" className="text-orange-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}