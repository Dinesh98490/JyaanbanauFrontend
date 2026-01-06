import React from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, route: "/admin/dashboard" },
  { label: "Members", icon: Users, route: "/admin/members" },
  { label: "Trainers", icon: Dumbbell, route: "/admin/trainers" },
  { label: "Classes", icon: Calendar, route: "/admin/classes" },
  { label: "Attendance", icon: Clock, route: "/admin/attendance" },
  { label: "Subscriptions", icon: CreditCard, route: "/admin/subscriptions" },
  { label: "Settings", icon: Settings, route: "/admin/settings" },
];

export default function AdminSidebar({ isOpen }) {
  return (
    <aside
      className={`${isOpen ? "w-[400px]" : "w-20"
        } bg-white border-r border-gray-100 transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <img
          src={IMAGE_PATHS.logo}
          alt="JyaanBanau"
          className="h-20 object-contain"
        />
        {isOpen && <span className="text-lg font-bold text-gray-800">JyaanBanau</span>}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.route}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            <item.icon size={20} />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
