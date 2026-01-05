// import {
//   LayoutDashboard,
//   Users,
//   Dumbbell,
//   Calendar,
//   Clock,
//   CreditCard,
//   BarChart3,
//   Settings,
//   LogOut,
// } from "lucide-react"

// const menuItems = [
//   { label: "Dashboard", icon: LayoutDashboard, route: "/amdin/dashboard" },
//   { label: "Members", icon: Users, href: "#" },
//   { label: "Trainers", icon: Dumbbell, href: "#" },
//   { label: "Classes", icon: Calendar, href: "#" },
//   { label: "Attendance", icon: Clock, href: "#" },
//   { label: "Subscriptions", icon: CreditCard, href: "#" },
//   { label: "Reports", icon: BarChart3, href: "#" },
// ]

// export default function AdminSidebar({ isOpen }) {
//   return (
//     <aside
//       className={`${
//         isOpen ? "w-64" : "w-20"
//       } bg-gym-sidebar border-r border-gym-border transition-all duration-300 flex flex-col`}
//     >
//       {/* Logo */}
//       <div className="p-6 border-b border-gym-border flex items-center gap-3">
//         <div className="w-10 h-10 bg-gym-primary rounded-lg flex items-center justify-center text-white">
//           💪
//         </div>
//         {isOpen && (
//           <span className="text-lg font-bold text-gym-text">
//             GymFlow
//           </span>
//         )}
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 p-4 space-y-2">
//         {menuItems.map((item) => (
//           <Link
//             key={item.label}
//             href={item.href}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg text-gym-text hover:bg-gym-hover transition"
//           >
//             <item.icon size={20} />
//             {isOpen && <span className="text-sm font-medium">{item.label}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Bottom */}
//       <div className="p-4 border-t border-gym-border space-y-2">
//         <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gym-hover w-full">
//           <Settings size={20} />
//           {isOpen && <span>Settings</span>}
//         </button>

//         <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gym-hover w-full text-red-600">
//           <LogOut size={20} />
//           {isOpen && <span>Logout</span>}
//         </button>
//       </div>
//     </aside>
//   )
// }


import { Link } from "react-router-dom" // or "next/link" if using Next.js
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  Clock,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, route: "/admin/dashboard" },
  { label: "Members", icon: Users, route: "/admin/members" },
  { label: "Trainers", icon: Dumbbell, route: "/admin/trainers" },
  { label: "Classes", icon: Calendar, route: "/admin/classes" },
  { label: "Attendance", icon: Clock, route: "/admin/attendance" },
  { label: "Subscriptions", icon: CreditCard, route: "/admin/subscriptions" },
  { label: "Reports", icon: BarChart3, route: "/admin/reports" },
  { label: "Settings", icon: Settings, route: "/admin/settings" },
]

export default function AdminSidebar({ isOpen }) {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gym-sidebar border-r border-gym-border transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gym-border flex items-center gap-3">
        <div className="w-10 h-10 bg-gym-primary rounded-lg flex items-center justify-center text-white">
          💪
        </div>
        {isOpen && (
          <span className="text-lg font-bold text-gym-text">GymFlow</span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.route} // navigate to route
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gym-text hover:bg-gym-hover transition"
          >
            <item.icon size={20} />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Logout */}
      <div className="p-4 border-t border-gym-border space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gym-hover w-full text-red-600">
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
