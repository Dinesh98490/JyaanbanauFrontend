import { Link } from "react-router-dom";
import { IMAGE_PATHS } from "../../common/ImageConstant";

export default function Navbar() {
  return (
    <header className="sticky top-1 z-50 bg-white border-b border-border shadow-sm font-Annapurna">
      <div className="w-full py-3 flex items-center justify-between">
        {/* Logo - Same Design & Spacing You Wanted */}
        <div className="flex items-center ml-8">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={IMAGE_PATHS.logo}
              alt="jyaanbanau"
              className="h-20 object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 mr-6">
          <a
            href="#"
            className="text-sm text-foreground hover:text-primary transition"
          >
            Features
          </a>
          <a
            href="#"
            className="text-sm text-foreground hover:text-primary transition"
          >
            How it Works
          </a>
          <a
            href="#"
            className="text-sm text-foreground hover:text-primary transition"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-sm text-foreground hover:text-primary transition"
          >
            Testimonials
          </a>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4 mr-8">
          {/* Login Button */}
          <button className="w-20 h-10 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium shadow-sm">
            Login
          </button>

          {/* Sign Up Button */}
          <button className="w-20 h-10 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all duration-200 font-medium shadow-md active:bg-blue-800">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
