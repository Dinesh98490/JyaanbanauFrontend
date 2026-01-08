import React from "react";
import { NavLink } from "react-router-dom";
import { IMAGE_PATHS } from "../../common/ImageConstant";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  Clock,
  CreditCard,
  Settings,
  LogOut,
  Utensils,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, route: "/admin/dashboard" },
  { label: "Members", icon: Users, route: "/admin/members" },
  { label: "Trainers", icon: Dumbbell, route: "/admin/trainers" },
  { label: "Classes", icon: Calendar, route: "/admin/classes" },
  { label: "Attendance", icon: Clock, route: "/admin/attendance" },
  { label: "Diets", icon: Utensils, route: "/admin/diets" },
  { label: "Subscriptions", icon: CreditCard, route: "/admin/subscriptions" },
  { label: "Settings", icon: Settings, route: "/admin/settings" },
];

export default function AdminSidebar({ isOpen }) {
  return (
    <aside
      className={`${
        isOpen ? "w-72" : "w-24"
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-4">
        <img
          src={IMAGE_PATHS.logo}
          alt="JyaanBanau"
          className="h-30 object-contain"
        />
        {isOpen && (
          <span className="text-xl font-bold text-gray-800 tracking-wide">
            JyaanBanau
          </span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-orange-100 text-orange-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={22} />
            {isOpen && (
              <span className="text-base font-medium">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={22} />
          {isOpen && <span className="text-base font-medium">Logout</span>}
        </NavLink>
      </div>
    </aside>
  );
}
