import { Link } from "react-router-dom";
import { IMAGE_PATHS } from "../../common/ImageConstant";
import { useEffect, useState } from "react";

export default function CustomerNavbar() {
  const [username, setUsername] = useState("Customer");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm font-Annapurna">
      <div className="relative w-full h-20 flex items-center px-8">

        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link to="/customer/membership">
            <img
              src={IMAGE_PATHS.logo}
              alt="jyaanbanau"
              className="h-16 object-contain"
            />
          </Link>
        </div>

        {/* CENTER: Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
          <Link to="/customer/membership" className="nav-link">
            Memberships
          </Link>
          <Link to="/customer/classes" className="nav-link">
            Classes
          </Link>
          <Link to="/customer/progress" className="nav-link">
            Progress
          </Link>
          <Link to="/customer/diets" className="nav-link">
            Diets & Plans
          </Link>
          <Link to="/customer/payment" className="nav-link">
            Payments
          </Link>
        </nav>

        {/* RIGHT: Customer Info */}
        <Link to="/customer/profile" className="ml-auto flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
          <span className="text-sm font-medium text-gray-700 capitalize">
            Hi, {username}
          </span>
          <img
            src={IMAGE_PATHS.avatar || "https://i.pravatar.cc/40"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
        </Link>
      </div>
    </header>
  );
}
