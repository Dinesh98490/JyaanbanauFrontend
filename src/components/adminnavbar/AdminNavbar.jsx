import { Search, Bell, Menu } from "lucide-react"

export default function AdminNavbar({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-gym-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-8 py-4">
        
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gym-hover transition"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-2xl font-bold text-gym-text">
            Admin Dashboard
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gym-bg px-4 py-2 rounded-lg">
            <Search size={18} className="text-gym-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2 rounded-lg hover:bg-gym-hover transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-gym-primary rounded-full" />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gym-primary text-white font-bold flex items-center justify-center">
            A
          </div>
        </div>
      </div>
    </header>
  )
}
